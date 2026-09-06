"use client";

/**
 * Walkthrough Studio — the homeowner journey, now wired to the local pipeline:
 *
 *   Create Project → Upload & Describe → Generate Moodboard (FREE, analyze job)
 *   → Review & Refine (corrections + scene-plan job → instant 3D preview)
 *   → Generate 3D Space (PAID: build + preview jobs on the render lane)
 *   → View 3D Experience (Explore in 3D · 360° Tour)
 *   → Save / Share (public /w/{projectId} link) → Connect with Designer (mock)
 *
 * Every long step is a backend job polled by useJob; the project id is kept
 * in sessionStorage so a reload resumes at the furthest completed stage.
 */

import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  Film,
  ImagePlus,
  Link2,
  Loader2,
  RefreshCw,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { DESIGNERS } from "@/lib/mock/designers";

import * as api from "@/features/studio/api/projects-api";
import { AnalysisReview } from "@/features/studio/components/analysis-review";
import { JobProgress } from "@/features/studio/components/job-progress";
import { useJob } from "@/features/studio/hooks/use-job";
import type { AnalysisDto, AnalysisPatch, ProjectDetail, ProjectRecord, RoomHint } from "@/features/studio/types";
import { getTour } from "@/features/tour/api/tour-api";
import { PanoramaTour } from "@/features/tour/components/panorama-tour";
import type { TourPackage } from "@/features/tour/types";
import { Walkthrough3DView } from "@/features/walkthrough3d/components/walkthrough3d-view";

/* ── Steps ─────────────────────────────────────────────────────────────── */

type StepId = "project" | "describe" | "moodboard" | "refine" | "generate3d" | "experience" | "share" | "designer";

interface StepDef {
  id: StepId;
  title: string;
  badge: "free" | "paid" | null;
}

const STEPS: StepDef[] = [
  { id: "project", title: "Create Project", badge: null },
  { id: "describe", title: "Upload & Describe", badge: null },
  { id: "moodboard", title: "Generate Moodboard", badge: "free" },
  { id: "refine", title: "Review & Refine", badge: null },
  { id: "generate3d", title: "Generate 3D Space", badge: "paid" },
  { id: "experience", title: "View 3D Experience", badge: null },
  { id: "share", title: "Save / Share", badge: null },
  { id: "designer", title: "Connect with Designer", badge: "free" },
];

const STEP_INDEX: Record<StepId, number> = Object.fromEntries(STEPS.map((s, i) => [s.id, i])) as Record<StepId, number>;
const STORAGE_KEY = "allure.studio.project";

interface StagedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
}

interface RoomRow {
  key: string;
  name: string;
  type: string;
  width: string;
  length: string;
}

const SPACE_PRESETS: Record<string, { hint: string; rooms: RoomRow[] }> = {
  "Full 2BHK": { hint: "2BHK apartment", rooms: [] },
  "Full 3BHK": { hint: "3BHK apartment", rooms: [] },
  "Living room + bedroom": {
    hint: "living room and one bedroom",
    rooms: [
      { key: "l", name: "Living Room", type: "living_room", width: "", length: "" },
      { key: "b", name: "Bedroom", type: "bedroom", width: "", length: "" },
    ],
  },
  "Living room": { hint: "living room only", rooms: [{ key: "l", name: "Living Room", type: "living_room", width: "", length: "" }] },
  "Bedroom": { hint: "one bedroom", rooms: [{ key: "b", name: "Bedroom", type: "bedroom", width: "", length: "" }] },
};

/** Furthest wizard step a project's backend stage justifies. */
function stepForStage(stage: ProjectRecord["stage"], hasTour: boolean): StepId {
  switch (stage) {
    case "CREATED":
      return "describe";
    case "INPUT_RECEIVED":
    case "ANALYZING":
      return "moodboard";
    case "DESIGN_SPEC_READY":
    case "ASSET_PLANNING":
      return "refine";
    case "ASSETS_READY":
    case "SCENE_BUILDING":
    case "SCENE_VALIDATING":
    case "CAMERA_PLANNING":
      return "generate3d";
    case "PREVIEW_RENDERING":
    case "FINAL_RENDERING":
    case "COMPLETED":
      return hasTour ? "experience" : "generate3d";
    default:
      return "refine";
  }
}

export function WalkthroughStudio() {
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  // Step 1 — project
  const [projectName, setProjectName] = useState("");
  const [spaceType, setSpaceType] = useState("Full 2BHK");
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [detail, setDetail] = useState<ProjectDetail | null>(null);
  const [creating, setCreating] = useState(false);
  const [engineError, setEngineError] = useState<string | null>(null);

  // Step 2 — upload & describe
  const [photos, setPhotos] = useState<StagedPhoto[]>([]);
  const [vision, setVision] = useState("");
  const [roomRows, setRoomRows] = useState<RoomRow[]>(SPACE_PRESETS["Full 2BHK"].rooms);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const photosRef = useRef<StagedPhoto[]>([]);
  photosRef.current = photos;

  // Step 3/4 — analysis + scene plan
  const analyzeJob = useJob();
  const [analysis, setAnalysis] = useState<AnalysisDto | null>(null);
  const [savingAnalysis, setSavingAnalysis] = useState(false);
  const [analysisEditedSincePlan, setAnalysisEditedSincePlan] = useState(false);
  const planJob = useJob();
  const [sceneId, setSceneId] = useState<string | null>(null);

  // Step 5/6 — render lane
  const buildJob = useJob();
  const previewJob = useJob();
  const finalJob = useJob();
  const [buildPreviewUrl, setBuildPreviewUrl] = useState<string | null>(null);
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [experienceMode, setExperienceMode] = useState<"explore" | "tour">("tour");

  // Step 8 — designer
  const [connectedDesigner, setConnectedDesigner] = useState<string | null>(null);

  useEffect(
    () => () => {
      for (const photo of photosRef.current) URL.revokeObjectURL(photo.previewUrl);
    },
    [],
  );

  const step = STEPS[stepIndex];

  const goTo = useCallback((index: number) => {
    setStepIndex(index);
    setMaxReached((m) => Math.max(m, index));
  }, []);
  const goToStep = useCallback((id: StepId) => goTo(STEP_INDEX[id]), [goTo]);
  const next = useCallback(() => goTo(Math.min(stepIndex + 1, STEPS.length - 1)), [goTo, stepIndex]);
  const back = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  /* ── Resume a project after a reload ──────────────────────────────── */

  const refreshDetail = useCallback(async (projectId: string) => {
    const d = await api.getProject(projectId);
    setDetail(d);
    setProject(d.project);
    return d;
  }, []);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (!stored) return;
    (async () => {
      try {
        const d = await refreshDetail(stored);
        setProjectName(d.project.name);
        setVision(d.project.description);
        setUploadedCount(d.inputs.filter((i) => i.kind === "reference").length);
        if (d.project.scene_ids.length) setSceneId(d.project.scene_ids[d.project.scene_ids.length - 1]);
        if (d.checkpoints.analysis) setAnalysis(await api.getAnalysis(stored).catch(() => null));
        if (d.checkpoints.scene_blend) {
          const b = await api.getBuild(stored).catch(() => null);
          if (b?.files.preview) setBuildPreviewUrl(b.files.preview);
        }
        let pkg: TourPackage | null = null;
        if (d.checkpoints.preview || d.checkpoints.outputs) pkg = await getTour(stored).catch(() => null);
        setTour(pkg);
        const target = stepForStage(d.project.stage, Boolean(pkg));
        goToStep(target);
      } catch {
        try {
          window.sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
    })();
  }, [refreshDetail, goToStep]);

  const remember = (p: ProjectRecord) => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, p.project_id);
    } catch {
      /* ignore */
    }
  };

  /* ── Step 1: create project ─────────────────────────────────────────── */

  const createProject = useCallback(async () => {
    setCreating(true);
    setEngineError(null);
    try {
      const preset = SPACE_PRESETS[spaceType];
      const p = await api.createProject({ name: projectName.trim(), description: preset?.hint ?? "" });
      setProject(p);
      remember(p);
      setRoomRows(preset?.rooms ?? []);
      next();
    } catch (err) {
      setEngineError(err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }, [projectName, spaceType, next]);

  /* ── Step 2: photos + vision ────────────────────────────────────────── */

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const staged: StagedPhoto[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      staged.push({ id: `${file.name}-${file.size}-${file.lastModified}`, file, previewUrl: URL.createObjectURL(file), name: file.name });
    }
    setPhotos((prev) => {
      const seen = new Set(prev.map((p) => p.id));
      return [...prev, ...staged.filter((p) => !seen.has(p.id))];
    });
  }, []);

  const removePhoto = useCallback((id: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const uploadAndContinue = useCallback(async () => {
    if (!project) return;
    setUploading(true);
    setEngineError(null);
    setUploadProgress(0);
    try {
      const preset = SPACE_PRESETS[spaceType];
      const description = [vision.trim(), preset?.hint ? `Space: ${preset.hint}.` : ""].filter(Boolean).join("\n");
      const dimensions: RoomHint[] = roomRows
        .filter((r) => r.name.trim())
        .map((r) => ({
          name: r.name.trim(),
          type: r.type,
          width_m: r.width ? Number(r.width) : null,
          length_m: r.length ? Number(r.length) : null,
          estimated: !(r.width && r.length),
        }));
      const res = await api.uploadInputs(project.project_id, { description, dimensions, files: photos.map((p) => p.file) }, setUploadProgress);
      setProject(res.project);
      setUploadedCount((n) => n + photos.length - res.rejected.length);
      if (res.rejected.length) setEngineError(`${res.rejected.length} file(s) were skipped: ${res.rejected.map((r) => `${r.filename} (${r.reason})`).join(", ")}`);
      for (const photo of photos) URL.revokeObjectURL(photo.previewUrl);
      setPhotos([]);
      setAnalysis(null);
      analyzeJob.reset();
      next();
    } catch (err) {
      setEngineError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }, [project, spaceType, vision, roomRows, photos, next, analyzeJob]);

  /* ── Step 3: analyze ────────────────────────────────────────────────── */

  const runAnalyze = useCallback(
    async (force = false) => {
      if (!project) return;
      const job = await analyzeJob.run(() => api.analyze(project.project_id, force));
      if (job?.status === "SUCCEEDED") {
        setAnalysis(await api.getAnalysis(project.project_id));
        setAnalysisEditedSincePlan(true);
        await refreshDetail(project.project_id);
      }
    },
    [project, analyzeJob, refreshDetail],
  );

  useEffect(() => {
    if (step.id === "moodboard" && project && !analysis && !analyzeJob.running && !analyzeJob.job) {
      void runAnalyze(false);
    }
  }, [step.id, project, analysis, analyzeJob.running, analyzeJob.job, runAnalyze]);

  const saveAnalysis = useCallback(
    async (patch: AnalysisPatch) => {
      if (!project) return;
      setSavingAnalysis(true);
      try {
        await api.patchAnalysis(project.project_id, patch);
        setAnalysis(await api.getAnalysis(project.project_id));
        setAnalysisEditedSincePlan(true);
      } finally {
        setSavingAnalysis(false);
      }
    },
    [project],
  );

  /* ── Step 4: scene plan ─────────────────────────────────────────────── */

  const runPlan = useCallback(async () => {
    if (!project) return;
    const force = analysisEditedSincePlan && Boolean(sceneId);
    const job = await planJob.run(() => api.scenePlan(project.project_id, force));
    if (job?.status === "SUCCEEDED") {
      const spec = await api.getSceneSpec(project.project_id);
      setSceneId(spec.scene.scene_id);
      setAnalysisEditedSincePlan(false);
      setBuildPreviewUrl(null);
      setTour(null);
      await refreshDetail(project.project_id);
    }
  }, [project, planJob, analysisEditedSincePlan, sceneId, refreshDetail]);

  /* ── Step 5: build + preview panoramas ──────────────────────────────── */

  const runRender = useCallback(async () => {
    if (!project) return;
    const built = await buildJob.run(() => api.build(project.project_id, { preview: true, force: true }));
    if (built?.status !== "SUCCEEDED") return;
    const b = await api.getBuild(project.project_id).catch(() => null);
    if (b?.files.preview) setBuildPreviewUrl(b.files.preview);
    const pv = await previewJob.run(() => api.preview(project.project_id, { force: true }));
    if (pv?.status === "SUCCEEDED") {
      setTour(await getTour(project.project_id));
      await refreshDetail(project.project_id);
      goToStep("experience");
    }
  }, [project, buildJob, previewJob, refreshDetail, goToStep]);

  const runFinal = useCallback(async () => {
    if (!project) return;
    const job = await finalJob.run(() => api.walkthrough(project.project_id, {}));
    if (job?.status === "SUCCEEDED") {
      setTour(await getTour(project.project_id));
      await refreshDetail(project.project_id);
    }
  }, [project, finalJob, refreshDetail]);

  const rendering = buildJob.running || previewJob.running;
  const shareUrl = project && typeof window !== "undefined" ? `${window.location.origin}/w/${project.project_id}` : "";

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="overline text-ink-muted">See it before you commit</p>
          <h1 className="display text-3xl text-ink">Walkthrough Studio</h1>
          <p className="body-sm text-ink-muted">
            From an idea to a space you can walk through — moodboard first, 3D when you&apos;re sure.
            {project ? <span className="ml-2 rounded-sm bg-muted px-1.5 py-0.5 caption text-ink-soft">{project.name} · {project.stage.toLowerCase().replace(/_/g, " ")}</span> : null}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cinematic" className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted transition-colors hover:bg-muted hover:text-ink-soft">
            <Film className="size-3.5" /> Cinematic film studio
          </Link>
          <Link href={sceneId ? `/3d?scene=${sceneId}` : "/3d"} className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted transition-colors hover:bg-muted hover:text-ink-soft">
            <Box className="size-3.5" /> Open 3D viewer
          </Link>
          {project ? (
            <button
              type="button"
              onClick={() => {
                try { window.sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
                window.location.reload();
              }}
              className="rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted"
            >
              New project
            </button>
          ) : null}
        </div>
      </div>

      {/* Stepper rail */}
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {STEPS.map((s, i) => {
          const state = i === stepIndex ? "current" : i <= maxReached ? "done" : "todo";
          return (
            <li key={s.id} className="flex items-center gap-1">
              <button
                type="button"
                disabled={i > maxReached}
                onClick={() => setStepIndex(i)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 caption transition-colors ${
                  state === "current" ? "bg-gold text-ink font-medium" : state === "done" ? "border text-ink-soft hover:bg-muted" : "border text-ink-muted/60"
                }`}
              >
                <span className="tabular">{i + 1}</span>
                {s.title}
                {s.badge === "free" ? <span className="rounded-sm border px-1 text-[10px] uppercase tracking-wide">Free</span> : null}
                {s.badge === "paid" ? (
                  <span className={`rounded-sm px-1 text-[10px] uppercase tracking-wide ${state === "current" ? "bg-ink/15" : "bg-gold text-ink"}`}>Paid</span>
                ) : null}
              </button>
              {i < STEPS.length - 1 ? <span className="text-ink-muted/40" aria-hidden>→</span> : null}
            </li>
          );
        })}
      </ol>

      {/* Step body */}
      <div className="rounded-lg border p-6">
        {step.id === "project" ? (
          <StepShell title="Tell us about your space" subtitle="Basic details to name the project — everything else comes from your photos and vision.">
            <div className="flex max-w-md flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="body-sm font-medium text-ink-soft">Project name</span>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Sharma Residence, Kankarbagh"
                  className="rounded-md border bg-transparent px-3 py-2 body-sm text-ink-soft placeholder:text-ink-muted/60 focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="body-sm font-medium text-ink-soft">Space</span>
                <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)} className="rounded-md border bg-transparent px-3 py-2 body-sm text-ink-soft focus:outline-none focus:ring-1 focus:ring-gold">
                  {Object.keys(SPACE_PRESETS).map((k) => <option key={k}>{k}</option>)}
                </select>
              </label>
              {engineError ? <EngineError message={engineError} /> : null}
            </div>
            <NavRow onNext={() => void createProject()} nextDisabled={!projectName.trim() || creating} nextLabel={creating ? "Creating…" : project ? "Continue" : "Create project"} />
          </StepShell>
        ) : null}

        {step.id === "describe" ? (
          <StepShell title="Upload photos and describe your vision" subtitle="Room photos, inspiration shots, anything that shows what you have and what you want. Room sizes are optional — the AI estimates what you leave blank.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-ink-muted transition-colors hover:bg-muted">
                  <ImagePlus className="size-6" />
                  <span className="body-sm">Click to add room or inspiration photos</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                </label>
                {uploadedCount > 0 ? <p className="caption text-ink-muted">{uploadedCount} photo{uploadedCount > 1 ? "s" : ""} already uploaded to this project.</p> : null}
                {photos.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.previewUrl} alt={photo.name} className="size-full object-cover" />
                        <button type="button" onClick={() => removePhoto(photo.id)} className="absolute right-1 top-1 rounded-full bg-ink/70 p-0.5 text-cream opacity-0 transition-opacity group-hover:opacity-100" aria-label={`Remove ${photo.name}`}>
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="body-sm font-medium text-ink-soft">Your vision</span>
                  <textarea
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    rows={6}
                    placeholder="Warm and calm 2BHK, seating for five, oak floors, keep the TV unit we already have, nothing that shows dust…"
                    className="resize-none rounded-md border bg-transparent px-3 py-2 body-sm text-ink-soft placeholder:text-ink-muted/60 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </label>
                <RoomRows rows={roomRows} onChange={setRoomRows} />
              </div>
            </div>
            {uploading ? (
              <div className="flex flex-col gap-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(uploadProgress * 100)}>
                  <div className="h-full bg-gold transition-[width]" style={{ width: `${Math.round(uploadProgress * 100)}%` }} />
                </div>
                <p className="caption text-ink-muted">Uploading {photos.length} photo{photos.length === 1 ? "" : "s"}… {Math.round(uploadProgress * 100)}%</p>
              </div>
            ) : null}
            {engineError ? <EngineError message={engineError} /> : null}
            <NavRow onBack={back} onNext={() => void uploadAndContinue()} nextDisabled={uploading || (photos.length === 0 && !vision.trim() && uploadedCount === 0)} nextLabel={uploading ? "Uploading…" : "Continue"} />
          </StepShell>
        ) : null}

        {step.id === "moodboard" ? (
          <StepShell title="Your moodboard" subtitle="Allure reads your photos and vision and composes a direction — rooms, palette, materials and light. This step is free; regenerate as often as you like.">
            {analyzeJob.running || (!analysis && analyzeJob.job) ? (
              <JobProgress title="Reading your photos and composing a direction" job={analyzeJob.job} events={analyzeJob.events} error={analyzeJob.error} onRetry={() => void runAnalyze(true)} />
            ) : analysis ? (
              <>
                <AnalysisReview data={analysis} />
                <button type="button" onClick={() => void runAnalyze(true)} className="flex w-fit items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted">
                  <RefreshCw className="size-3.5" /> Regenerate
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-10">
                <Sparkles className="size-6 text-gold" />
                <button type="button" onClick={() => void runAnalyze(false)} className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 body-sm font-medium text-ink hover:opacity-90">
                  <Sparkles className="size-4" /> Generate moodboard
                </button>
              </div>
            )}
            <NavRow onBack={back} onNext={next} nextDisabled={!analysis || analyzeJob.running} nextLabel="Looks right — review it" />
          </StepShell>
        ) : null}

        {step.id === "refine" ? (
          <StepShell title="Review and refine" subtitle="Correct room sizes, add must-haves, then plan the space: the layout and furniture appear in 3D within seconds, and you can edit any of it before rendering.">
            {analysis ? <AnalysisReview data={analysis} onSave={saveAnalysis} saving={savingAnalysis} /> : null}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void runPlan()}
                  disabled={!analysis || planJob.running || savingAnalysis}
                  className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 body-sm font-medium text-ink hover:opacity-90 disabled:opacity-40"
                >
                  {planJob.running ? <Loader2 className="size-4 animate-spin" /> : <Box className="size-4" />}
                  {sceneId ? (analysisEditedSincePlan ? "Re-plan the space" : "Plan again") : "Plan the space"}
                </button>
                {sceneId && analysisEditedSincePlan ? <span className="caption text-ink-muted">Your corrections haven&apos;t been applied to the 3D plan yet.</span> : null}
              </div>
              {planJob.job || planJob.error ? (
                <JobProgress title="Planning rooms, furniture and materials" job={planJob.job} events={planJob.events} error={planJob.error} onRetry={() => void runPlan()} compact={Boolean(sceneId) && !planJob.running} />
              ) : null}
              {sceneId && !planJob.running ? <Walkthrough3DView key={sceneId} sceneId={sceneId} /> : null}
            </div>
            <NavRow onBack={back} onNext={next} nextDisabled={!sceneId || planJob.running} nextLabel="Happy with the plan — render it" />
          </StepShell>
        ) : null}

        {step.id === "generate3d" ? (
          <StepShell title="Generate your 3D space" subtitle="This is the paid step: the plan is built in Blender, lit, validated and rendered as a 360° tour you can share. A few minutes on this machine.">
            <div className="flex max-w-2xl flex-col gap-4">
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex flex-col gap-0.5">
                  <p className="body-sm font-medium text-ink-soft">{project?.name ?? "My Allure space"}</p>
                  <p className="caption text-ink-muted">
                    {analysis ? `${analysis.analysis.rooms.length} rooms · ${analysis.style?.name.replace(/_/g, " ")}` : spaceType}
                    {detail?.checkpoints.scene_blend ? " · built before" : ""}
                  </p>
                </div>
                <span className="rounded-sm bg-gold px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink">Paid</span>
              </div>
              {buildJob.job || buildJob.error ? (
                <JobProgress title="Building the scene in Blender" job={buildJob.job} events={buildJob.events} error={buildJob.error} onRetry={() => void runRender()} />
              ) : null}
              {buildPreviewUrl && !buildJob.running ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={api.fileUrl(buildPreviewUrl)} alt="Build preview" className="w-full rounded-md border" />
              ) : null}
              {previewJob.job || previewJob.error ? (
                <JobProgress title="Rendering the 360° tour" job={previewJob.job} events={previewJob.events} error={previewJob.error} onRetry={() => void runRender()} />
              ) : null}
              {engineError ? <EngineError message={engineError} /> : null}
              <button
                type="button"
                onClick={() => void runRender()}
                disabled={rendering || !sceneId}
                className="flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-2.5 body-sm font-medium text-ink hover:opacity-90 disabled:opacity-40"
              >
                {rendering ? <Loader2 className="size-4 animate-spin" /> : <Box className="size-4" />}
                {rendering ? "Rendering your space…" : tour ? "Render again" : "Generate 3D space"}
              </button>
            </div>
            <NavRow onBack={back} onNext={tour ? next : undefined} nextLabel="View the experience" />
          </StepShell>
        ) : null}

        {step.id === "experience" ? (
          <StepShell title="Walk through your space" subtitle="Explore it live in 3D, or take the rendered 360° tour room by room.">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-1 rounded-full border p-1" role="tablist" aria-label="View mode">
                {(["tour", "explore"] as const).map((m) => (
                  <button key={m} role="tab" type="button" aria-selected={experienceMode === m} onClick={() => setExperienceMode(m)} className={`rounded-full px-4 py-1.5 caption font-medium transition ${experienceMode === m ? "bg-ink text-cream" : "text-ink-muted hover:text-ink-soft"}`}>
                    {m === "tour" ? "360° Tour" : "Explore in 3D"}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {tour ? <span className="caption text-ink-muted">{tour.quality === "final" ? "Final quality" : "Preview quality"}</span> : null}
                <button type="button" onClick={() => void runFinal()} disabled={finalJob.running || !tour} className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted disabled:opacity-40">
                  {finalJob.running ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                  {finalJob.running ? "Rendering final quality…" : "Render final quality"}
                </button>
              </div>
            </div>
            {finalJob.job || finalJob.error ? <JobProgress title="Final 4K panoramas and hero stills" job={finalJob.job} events={finalJob.events} error={finalJob.error} onRetry={() => void runFinal()} compact={!finalJob.running} /> : null}
            {experienceMode === "tour" ? (
              tour ? <PanoramaTour pkg={tour} autoplay className="h-[560px] w-full rounded-lg" /> : <p className="body-sm text-ink-muted">No tour rendered yet.</p>
            ) : (
              <Walkthrough3DView key={sceneId ?? "seed"} sceneId={sceneId ?? undefined} />
            )}
            <NavRow onBack={back} onNext={next} nextLabel="Save & share" />
          </StepShell>
        ) : null}

        {step.id === "share" ? (
          <StepShell title="Saved to your projects" subtitle="Share the walkthrough with family before you commit to anything. The link opens the 360° tour on any phone.">
            <div className="flex max-w-lg flex-col gap-3">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <Check className="size-4 text-gold" />
                <p className="body-sm text-ink-soft">“{project?.name ?? "My Allure space"}” is saved to My Projects.</p>
              </div>
              <ShareLinkRow url={shareUrl} />
              {detail?.outputs.length ? (
                <ul className="flex flex-col gap-1 rounded-md border p-3 caption text-ink-muted">
                  {detail.outputs.slice(-6).map((o) => (
                    <li key={o.output_id} className="flex items-center gap-2">
                      <span className="w-28 shrink-0 text-ink-soft">{o.kind.replace(/_/g, " ")}</span>
                      <a href={api.fileUrl(o.url)} target="_blank" rel="noreferrer" className="truncate underline-offset-2 hover:underline">{o.path}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <NavRow onBack={back} onNext={next} nextLabel="Connect with a designer" />
          </StepShell>
        ) : null}

        {step.id === "designer" ? (
          <StepShell title="Bring a designer into it" subtitle="A curated match based on your moodboard direction and city — connecting is free.">
            <div className="grid gap-3 md:grid-cols-3">
              {DESIGNERS.filter((d) => d.vetting === "verified").slice(0, 3).map((designer) => (
                <div key={designer.id} className="flex flex-col gap-3 rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Image src={designer.avatar} alt={designer.name} width={40} height={40} className="rounded-full" />
                    <div className="flex flex-col">
                      <p className="body-sm font-medium text-ink-soft">{designer.name}</p>
                      <p className="caption text-ink-muted">{designer.studio} · {designer.city}</p>
                    </div>
                  </div>
                  <p className="caption text-ink-muted">{designer.style}</p>
                  {connectedDesigner === designer.id ? (
                    <p className="flex items-center gap-1.5 body-sm text-ink-soft"><Check className="size-4 text-gold" /> Request sent</p>
                  ) : (
                    <button type="button" onClick={() => setConnectedDesigner(designer.id)} className="flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted">
                      <Users className="size-3.5" /> Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
            <NavRow onBack={back} />
          </StepShell>
        ) : null}
      </div>
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="body text-lg font-medium text-ink-soft">{title}</h2>
        <p className="body-sm text-ink-muted">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function NavRow({ onBack, onNext, nextDisabled, nextLabel = "Continue" }: { onBack?: () => void; onNext?: () => void; nextDisabled?: boolean; nextLabel?: string }) {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      {onBack ? (
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-md px-3 py-1.5 body-sm text-ink-muted hover:bg-muted">
          <ArrowLeft className="size-3.5" /> Back
        </button>
      ) : <span />}
      {onNext ? (
        <button type="button" onClick={onNext} disabled={nextDisabled} className="flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 body-sm font-medium text-ink hover:opacity-90 disabled:opacity-40">
          {nextLabel} <ArrowRight className="size-3.5" />
        </button>
      ) : <span />}
    </div>
  );
}

function EngineError({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-warning/35 bg-warning/8 p-3">
      <p className="body-sm text-ink-soft">{message}</p>
      <p className="caption mt-1 text-ink-muted">
        If the engine is down, start it with <code className="rounded bg-muted px-1 py-0.5">uvicorn app.main:app --port 8000</code> inside <code className="rounded bg-muted px-1 py-0.5">aether-backend/</code>.
      </p>
    </div>
  );
}

const ROOM_TYPE_OPTIONS = ["living_room", "master_bedroom", "bedroom", "kids_bedroom", "kitchen", "dining_room", "study", "bathroom", "balcony", "entry"];

function RoomRows({ rows, onChange }: { rows: RoomRow[]; onChange: (rows: RoomRow[]) => void }) {
  const update = (key: string, patch: Partial<RoomRow>) => onChange(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="body-sm font-medium text-ink-soft">Room sizes <span className="font-normal text-ink-muted">(optional)</span></span>
        <button type="button" onClick={() => onChange([...rows, { key: Date.now().toString(36), name: "", type: "bedroom", width: "", length: "" }])} className="caption text-ink-muted hover:text-ink-soft">
          + Add room
        </button>
      </div>
      {rows.length ? (
        <div className="flex flex-col gap-1.5">
          {rows.map((r) => (
            <div key={r.key} className="grid grid-cols-[1fr_1fr_5rem_5rem_1.5rem] items-center gap-1.5">
              <input value={r.name} placeholder="Name" onChange={(e) => update(r.key, { name: e.target.value })} className="rounded border bg-transparent px-2 py-1 caption text-ink-soft" />
              <select value={r.type} onChange={(e) => update(r.key, { type: e.target.value })} className="rounded border bg-transparent px-2 py-1 caption text-ink-soft">
                {ROOM_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
              </select>
              <input value={r.width} inputMode="decimal" placeholder="W m" onChange={(e) => update(r.key, { width: e.target.value })} className="rounded border bg-transparent px-2 py-1 caption tabular text-ink-soft" />
              <input value={r.length} inputMode="decimal" placeholder="L m" onChange={(e) => update(r.key, { length: e.target.value })} className="rounded border bg-transparent px-2 py-1 caption tabular text-ink-soft" />
              <button type="button" onClick={() => onChange(rows.filter((x) => x.key !== r.key))} aria-label="Remove row" className="text-ink-muted hover:text-danger"><X className="size-3.5" /></button>
            </div>
          ))}
        </div>
      ) : (
        <p className="caption text-ink-muted">Leave empty and the AI will list the rooms from your brief with estimated sizes.</p>
      )}
    </div>
  );
}

function ShareLinkRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-md border p-3">
      <Link2 className="size-4 shrink-0 text-ink-muted" />
      <a href={url || "#"} target="_blank" rel="noreferrer" className="body-sm truncate text-ink-muted underline-offset-2 hover:underline">{url || "Render the space to get a share link"}</a>
      <button
        type="button"
        disabled={!url}
        onClick={() => {
          void navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="ml-auto shrink-0 rounded-md border px-3 py-1 body-sm text-ink-muted hover:bg-muted disabled:opacity-40"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
