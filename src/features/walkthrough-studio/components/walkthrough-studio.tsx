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
  ChevronRight,
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
import { FilmPlayer } from "@/features/tour/components/share-view";
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
  const [experienceMode, setExperienceMode] = useState<"explore" | "tour" | "film">("tour");
  const filmJob = useJob();

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

  const runFilm = useCallback(async () => {
    if (!project) return;
    const job = await filmJob.run(() => api.film(project.project_id, { profile: "preview" }));
    if (job?.status === "SUCCEEDED") {
      setTour(await getTour(project.project_id));
      setExperienceMode("film");
      await refreshDetail(project.project_id);
    }
  }, [project, filmJob, refreshDetail]);

  const rendering = buildJob.running || previewJob.running;
  const shareUrl = project && typeof window !== "undefined" ? `${window.location.origin}/w/${project.project_id}` : "";

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-8 py-4">
      
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DEC8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#79553D]">
              SEE IT BEFORE YOU COMMIT
            </span>
            {project && (
              <span className="rounded-full bg-[#EFE6DA] px-2.5 py-0.5 text-xs font-semibold text-[#5C4433]">
                {project.name} · {project.stage.toLowerCase().replace(/_/g, " ")}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-1">
            Walkthrough Studio
          </h1>
          <p className="text-sm text-[#5A4F46] mt-1 font-normal">
            From an idea to a space you can walk through — moodboard first, 3D when you&apos;re sure.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/cinematic"
            className="flex items-center gap-2 rounded-full border border-[#E5DCD0] bg-white px-4 py-2 text-xs font-semibold text-[#2C241E] shadow-xs transition-all hover:bg-[#F6EFE6] hover:border-[#D5C7B5]"
          >
            <Film className="h-4 w-4 text-[#79553D]" />
            <span>Cinematic Film Studio</span>
          </Link>

          <Link
            href={sceneId ? `/3d?scene=${sceneId}` : "/3d"}
            className="flex items-center gap-2 rounded-full border border-[#E5DCD0] bg-white px-4 py-2 text-xs font-semibold text-[#2C241E] shadow-xs transition-all hover:bg-[#F6EFE6] hover:border-[#D5C7B5]"
          >
            <Box className="h-4 w-4 text-[#79553D]" />
            <span>Open 3D Viewer</span>
          </Link>

          {project && (
            <button
              type="button"
              onClick={() => {
                try {
                  window.sessionStorage.removeItem(STORAGE_KEY);
                } catch {
                  /* ignore */
                }
                window.location.reload();
              }}
              className="rounded-full border border-[#E5DCD0] bg-[#F6EFE6] px-4 py-2 text-xs font-semibold text-[#4A423B] transition-all hover:bg-[#EAE0D2]"
            >
              New Project
            </button>
          )}
        </div>
      </div>

      {/* Modern Stepper Rail Navigation */}
      <div className="rounded-3xl bg-[#F6EFE6] p-4 sm:p-5 border border-[#E8DEC8] shadow-sm">
        
        {/* Progress Bar & Counter Header */}
        <div className="flex items-center justify-between gap-4 mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#79553D] text-xs font-bold text-white shadow-xs">
              {stepIndex + 1}
            </span>
            <span className="text-sm font-bold text-[#1C1613]">
              Step {stepIndex + 1} of {STEPS.length}: <span className="text-[#79553D]">{step.title}</span>
            </span>
          </div>

          <span className="text-xs font-medium text-[#665A50] hidden sm:block">
            {Math.round(((stepIndex + 1) / STEPS.length) * 100)}% Completed
          </span>
        </div>

        {/* Progress Track Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5DCD0] mb-5">
          <div
            className="h-full bg-[#79553D] transition-all duration-500 rounded-full"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Horizontal Step Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STEPS.map((s, i) => {
            const isCurrent = i === stepIndex;
            const isDone = i <= maxReached;
            return (
              <button
                key={s.id}
                type="button"
                disabled={i > maxReached}
                onClick={() => setStepIndex(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? "bg-[#79553D] text-white shadow-md scale-102"
                    : isDone
                    ? "bg-white text-[#1C1613] border border-[#E8DEC8] hover:bg-[#FAF7F2]"
                    : "bg-[#EAE0D2]/50 text-[#8C7B6D] border border-transparent cursor-not-allowed"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                  isCurrent ? "bg-white text-[#79553D]" : isDone ? "bg-[#79553D] text-white" : "bg-[#D9CEBF] text-[#786A5E]"
                }`}>
                  {isDone && !isCurrent ? <Check className="h-3 w-3 stroke-[3]" /> : i + 1}
                </span>

                <span>{s.title}</span>

                {s.badge === "free" && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    isCurrent ? "bg-white/20 text-white" : "bg-[#EAE0D2] text-[#5C4433]"
                  }`}>
                    Free
                  </span>
                )}

                {s.badge === "paid" && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                    isCurrent ? "bg-[#E6C387] text-[#4A3816]" : "bg-[#79553D] text-white"
                  }`}>
                    Paid
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Container Card */}
      <div className="rounded-3xl bg-[#FAF7F2] p-6 sm:p-10 border border-[#E8DEC8] shadow-xl">
        {step.id === "project" ? (
          <StepShell
            title="Tell us about your space"
            subtitle="Basic details to name the project — everything else comes from your photos and vision."
          >
            <div className="flex max-w-xl flex-col gap-6 pt-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1C1613]">Project Name</span>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Sharma Residence, Kankarbagh"
                  className="w-full rounded-2xl border border-[#E5DCD0] bg-white px-4 py-3.5 text-sm text-[#1C1613] placeholder-[#A89A8C] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1C1613]">Space Type</span>
                <select
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="w-full rounded-2xl border border-[#E5DCD0] bg-white px-4 py-3.5 text-sm text-[#1C1613] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium cursor-pointer"
                >
                  {Object.keys(SPACE_PRESETS).map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </select>
              </label>

              {engineError && <EngineError message={engineError} />}
            </div>

            <NavRow
              onNext={() => void createProject()}
              nextDisabled={!projectName.trim() || creating}
              nextLabel={creating ? "Creating…" : project ? "Continue" : "Create Project"}
            />
          </StepShell>
        ) : null}

        {step.id === "describe" ? (
          <StepShell
            title="Upload photos and describe your vision"
            subtitle="Room photos, inspiration shots, anything that shows what you have and what you want. Room sizes are optional — the AI estimates what you leave blank."
          >
            <div className="grid gap-8 lg:grid-cols-2 pt-2">
              <div className="flex flex-col gap-4">
                <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[#D5C7B5] bg-white p-8 text-[#5A4F46] transition-all hover:bg-[#F6EFE6] hover:border-[#79553D]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#79553D] group-hover:scale-110 transition-transform">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold text-[#1C1613]">Click to add room or inspiration photos</span>
                    <p className="text-xs text-[#8C7B6D] mt-0.5">Supports JPG, PNG, WEBP files</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      addFiles(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>

                {uploadedCount > 0 && (
                  <p className="text-xs font-semibold text-[#79553D] bg-[#F6EFE6] px-3 py-1.5 rounded-full w-fit">
                    ✓ {uploadedCount} photo{uploadedCount > 1 ? "s" : ""} uploaded to project
                  </p>
                )}

                {photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-[#E8DEC8] shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.previewUrl} alt={photo.name} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute right-1.5 top-1.5 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label={`Remove ${photo.name}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-[#1C1613]">Your Vision & Brief</span>
                  <textarea
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    rows={6}
                    placeholder="Warm and calm 2BHK, seating for five, oak floors, keep the TV unit we already have, nothing that shows dust…"
                    className="w-full resize-none rounded-2xl border border-[#E5DCD0] bg-white p-4 text-sm text-[#1C1613] placeholder-[#A89A8C] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none"
                  />
                </label>

                <RoomRows rows={roomRows} onChange={setRoomRows} />
              </div>
            </div>

            {uploading && (
              <div className="flex flex-col gap-2 pt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E5DCD0]">
                  <div
                    className="h-full bg-[#79553D] transition-[width] rounded-full"
                    style={{ width: `${Math.round(uploadProgress * 100)}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-[#5A4F46]">
                  Uploading {photos.length} photo{photos.length === 1 ? "" : "s"}… {Math.round(uploadProgress * 100)}%
                </p>
              </div>
            )}

            {engineError && <EngineError message={engineError} />}

            <NavRow
              onBack={back}
              onNext={() => void uploadAndContinue()}
              nextDisabled={uploading || (photos.length === 0 && !vision.trim() && uploadedCount === 0)}
              nextLabel={uploading ? "Uploading…" : "Continue"}
            />
          </StepShell>
        ) : null}

        {step.id === "moodboard" ? (
          <StepShell
            title="Your moodboard"
            subtitle="Ishana reads your photos and vision and composes a direction — rooms, palette, materials and light. This step is free; regenerate as often as you like."
          >
            {analyzeJob.running || (!analysis && analyzeJob.job) ? (
              <JobProgress
                title="Reading your photos and composing a direction"
                job={analyzeJob.job}
                events={analyzeJob.events}
                error={analyzeJob.error}
                onRetry={() => void runAnalyze(true)}
              />
            ) : analysis ? (
              <>
                <AnalysisReview data={analysis} />
                <button
                  type="button"
                  onClick={() => void runAnalyze(true)}
                  className="flex w-fit items-center gap-2 rounded-full border border-[#E8DEC8] bg-white px-5 py-2.5 text-xs font-bold text-[#2C241E] hover:bg-[#F6EFE6] transition-all shadow-xs"
                >
                  <RefreshCw className="h-4 w-4 text-[#79553D]" /> Regenerate Direction
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6EFE6] text-[#79553D]">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1C1613]">Ready to generate moodboard</h3>
                <p className="text-sm text-[#5A4F46] max-w-sm">Analyze your photos and vision to generate material swatches, palette, and lighting.</p>
                <button
                  type="button"
                  onClick={() => void runAnalyze(false)}
                  className="flex items-center gap-2 rounded-full bg-[#79553D] px-7 py-3 text-sm font-semibold text-white hover:bg-[#64442F] shadow-md transition-all mt-2"
                >
                  <Sparkles className="h-4 w-4" /> Generate Moodboard
                </button>
              </div>
            )}

            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={!analysis || analyzeJob.running}
              nextLabel="Looks right — review it"
            />
          </StepShell>
        ) : null}

        {step.id === "refine" ? (
          <StepShell
            title="Review and refine"
            subtitle="Correct room sizes, add must-haves, then plan the space: the layout and furniture appear in 3D within seconds, and you can edit any of it before rendering."
          >
            {analysis ? <AnalysisReview data={analysis} onSave={saveAnalysis} saving={savingAnalysis} /> : null}

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void runPlan()}
                  disabled={!analysis || planJob.running || savingAnalysis}
                  className="flex items-center gap-2.5 rounded-full bg-[#79553D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#64442F] shadow-md transition-all disabled:opacity-40"
                >
                  {planJob.running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Box className="h-4 w-4" />}
                  <span>{sceneId ? (analysisEditedSincePlan ? "Re-plan the space" : "Plan again") : "Plan the space"}</span>
                </button>

                {sceneId && analysisEditedSincePlan && (
                  <span className="text-xs font-semibold text-[#8C7461] bg-[#F6EFE6] px-3 py-1.5 rounded-full">
                    Your corrections haven&apos;t been applied to the 3D plan yet.
                  </span>
                )}
              </div>

              {(planJob.job || planJob.error) && (
                <JobProgress
                  title="Planning rooms, furniture and materials"
                  job={planJob.job}
                  events={planJob.events}
                  error={planJob.error}
                  onRetry={() => void runPlan()}
                  compact={Boolean(sceneId) && !planJob.running}
                />
              )}

              {sceneId && !planJob.running && <Walkthrough3DView key={sceneId} sceneId={sceneId} />}
            </div>

            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={!sceneId || planJob.running}
              nextLabel="Happy with the plan — render it"
            />
          </StepShell>
        ) : null}

        {step.id === "generate3d" ? (
          <StepShell
            title="Generate your 3D space"
            subtitle="This is the paid step: the plan is built in Blender, lit, validated and rendered as a 360° tour you can share."
          >
            <div className="flex max-w-2xl flex-col gap-6 pt-2">
              <div className="flex items-center justify-between rounded-2xl border border-[#E8DEC8] bg-[#F6EFE6] p-5 shadow-xs">
                <div className="flex flex-col gap-1">
                  <p className="font-display text-lg font-bold text-[#1C1613]">
                    {project?.name ?? "My Ishana Space"}
                  </p>
                  <p className="text-xs text-[#5A4F46]">
                    {analysis ? `${analysis.analysis.rooms.length} rooms · ${analysis.style?.name.replace(/_/g, " ")}` : spaceType}
                    {detail?.checkpoints.scene_blend ? " · built before" : ""}
                  </p>
                </div>
                <span className="rounded-full bg-[#79553D] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                  Paid
                </span>
              </div>

              {(buildJob.job || buildJob.error) && (
                <JobProgress
                  title="Building the scene in Blender"
                  job={buildJob.job}
                  events={buildJob.events}
                  error={buildJob.error}
                  onRetry={() => void runRender()}
                />
              )}

              {buildPreviewUrl && !buildJob.running && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={api.fileUrl(buildPreviewUrl)} alt="Build preview" className="w-full rounded-2xl border border-[#E8DEC8] shadow-md" />
              )}

              {(previewJob.job || previewJob.error) && (
                <JobProgress
                  title="Rendering the 360° tour"
                  job={previewJob.job}
                  events={previewJob.events}
                  error={previewJob.error}
                  onRetry={() => void runRender()}
                />
              )}

              {engineError && <EngineError message={engineError} />}

              <button
                type="button"
                onClick={() => void runRender()}
                disabled={rendering || !sceneId}
                className="flex items-center justify-center gap-2.5 rounded-full bg-[#79553D] px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-[#64442F] transition-all disabled:opacity-40"
              >
                {rendering ? <Loader2 className="h-5 w-5 animate-spin" /> : <Box className="h-5 w-5" />}
                <span>{rendering ? "Rendering your space…" : tour ? "Render again" : "Generate 3D Space"}</span>
              </button>
            </div>

            <NavRow onBack={back} onNext={tour ? next : undefined} nextLabel="View the experience" />
          </StepShell>
        ) : null}

        {step.id === "experience" ? (
          <StepShell
            title="Walk through your space"
            subtitle="Explore it live in 3D, or take the rendered 360° tour room by room."
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex gap-1.5 rounded-full border border-[#E8DEC8] bg-[#F6EFE6] p-1.5">
                {(["tour", "explore", "film"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setExperienceMode(m)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                      experienceMode === m
                        ? "bg-[#79553D] text-white shadow-sm"
                        : "text-[#5A4F46] hover:text-[#1C1613]"
                    }`}
                  >
                    {m === "tour" ? "360° Tour" : m === "explore" ? "Explore in 3D" : "Film"}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {tour && (
                  <span className="text-xs font-semibold text-[#79553D] bg-[#F6EFE6] px-3 py-1.5 rounded-full">
                    {tour.quality === "final" ? "Final quality" : "Preview quality"}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => void runFilm()}
                  disabled={filmJob.running || !tour}
                  className="flex items-center gap-2 rounded-full border border-[#E5DCD0] bg-white px-4 py-2 text-xs font-bold text-[#2C241E] hover:bg-[#F6EFE6] transition-all shadow-xs disabled:opacity-40"
                >
                  {filmJob.running ? <Loader2 className="h-4 w-4 animate-spin text-[#79553D]" /> : <Film className="h-4 w-4 text-[#79553D]" />}
                  <span>{filmJob.running ? "Filming…" : tour?.film ? "Re-render Film" : "Render a Film"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => void runFinal()}
                  disabled={finalJob.running || !tour}
                  className="flex items-center gap-2 rounded-full bg-[#79553D] px-5 py-2 text-xs font-bold text-white hover:bg-[#64442F] transition-all shadow-sm disabled:opacity-40"
                >
                  {finalJob.running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  <span>{finalJob.running ? "Rendering Final…" : "Render Final 4K"}</span>
                </button>
              </div>
            </div>

            {(finalJob.job || finalJob.error) && (
              <JobProgress
                title="Final 4K panoramas and hero stills"
                job={finalJob.job}
                events={finalJob.events}
                error={finalJob.error}
                onRetry={() => void runFinal()}
                compact={!finalJob.running}
              />
            )}

            {(filmJob.job || filmJob.error) && (
              <JobProgress
                title="Filming the guided tour"
                job={filmJob.job}
                events={filmJob.events}
                error={filmJob.error}
                onRetry={() => void runFilm()}
                compact={!filmJob.running}
              />
            )}

            {experienceMode === "tour" ? (
              tour ? (
                <PanoramaTour pkg={tour} autoplay className="h-[560px] w-full rounded-2xl border border-[#E8DEC8] shadow-xl overflow-hidden" />
              ) : (
                <p className="text-sm font-semibold text-[#665A50] py-8 text-center">No tour rendered yet.</p>
              )
            ) : experienceMode === "film" ? (
              tour ? (
                <div className="flex justify-center rounded-2xl bg-black shadow-xl overflow-hidden">
                  <FilmPlayer pkg={tour} className="max-h-[560px] w-full rounded-2xl" />
                </div>
              ) : null
            ) : (
              <Walkthrough3DView key={sceneId ?? "seed"} sceneId={sceneId ?? undefined} />
            )}

            <NavRow onBack={back} onNext={next} nextLabel="Save & share" />
          </StepShell>
        ) : null}

        {step.id === "share" ? (
          <StepShell
            title="Saved to your projects"
            subtitle="Share the walkthrough with family before you commit to anything. The link opens the 360° tour on any phone."
          >
            <div className="flex max-w-xl flex-col gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-2xl border border-[#E8DEC8] bg-[#F6EFE6] p-4">
                <Check className="h-5 w-5 text-[#79553D]" />
                <p className="text-sm font-bold text-[#1C1613]">
                  “{project?.name ?? "My Ishana Space"}” is saved to My Projects.
                </p>
              </div>

              <ShareLinkRow url={shareUrl} />

              {detail?.outputs.length ? (
                <ul className="flex flex-col gap-2 rounded-2xl border border-[#E8DEC8] bg-white p-4 text-xs font-semibold text-[#5A4F46]">
                  {detail.outputs.slice(-6).map((o) => (
                    <li key={o.output_id} className="flex items-center justify-between gap-4">
                      <span className="font-bold text-[#1C1613]">{o.kind.replace(/_/g, " ")}</span>
                      <a
                        href={api.fileUrl(o.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate text-[#79553D] hover:underline"
                      >
                        {o.path}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <NavRow onBack={back} onNext={next} nextLabel="Connect with a designer" />
          </StepShell>
        ) : null}

        {step.id === "designer" ? (
          <StepShell
            title="Bring a designer into it"
            subtitle="A curated match based on your moodboard direction and city — connecting is free."
          >
            <div className="grid gap-6 md:grid-cols-3 pt-2">
              {DESIGNERS.filter((d) => d.vetting === "verified").slice(0, 3).map((designer) => (
                <div key={designer.id} className="flex flex-col justify-between gap-4 rounded-3xl border border-[#E8DEC8] bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Image src={designer.avatar} alt={designer.name} width={44} height={44} className="rounded-full border border-[#E8DEC8]" />
                      <div>
                        <p className="text-base font-bold text-[#1C1613]">{designer.name}</p>
                        <p className="text-xs text-[#665A50]">{designer.studio} · {designer.city}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#5A4F46] leading-relaxed">{designer.style}</p>
                  </div>

                  {connectedDesigner === designer.id ? (
                    <p className="flex items-center justify-center gap-2 text-xs font-bold text-[#79553D] bg-[#F6EFE6] py-2.5 rounded-full">
                      <Check className="h-4 w-4" /> Request Sent
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConnectedDesigner(designer.id)}
                      className="flex items-center justify-center gap-2 rounded-full border border-[#E5DCD0] bg-white py-2.5 text-xs font-bold text-[#2C241E] hover:bg-[#F6EFE6] transition-all shadow-xs"
                    >
                      <Users className="h-4 w-4 text-[#79553D]" /> Connect
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 pb-2 border-b border-[#E8DEC8]">
        <h2 className="font-display text-2xl font-bold text-[#1C1613]">{title}</h2>
        <p className="text-sm text-[#5A4F46] leading-relaxed">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#E8DEC8] pt-6 mt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border border-[#E5DCD0] bg-white px-5 py-2.5 text-xs font-bold text-[#2C241E] hover:bg-[#F6EFE6] transition-all shadow-xs"
        >
          <ArrowLeft className="h-4 w-4 text-[#79553D]" /> Back
        </button>
      ) : (
        <span />
      )}
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-2 rounded-full bg-[#79553D] px-7 py-3 text-xs font-bold text-white hover:bg-[#64442F] shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{nextLabel}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function EngineError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-[#E6B800] bg-[#FFFBE6] p-4 text-xs">
      <p className="font-bold text-[#856404]">{message}</p>
      <p className="mt-1 text-[#665200]">
        If the engine is down, start it with <code className="rounded bg-[#FFF3B8] px-1 py-0.5 font-mono text-[#524100]">uvicorn app.main:app --port 8000</code> inside <code className="rounded bg-[#FFF3B8] px-1 py-0.5 font-mono text-[#524100]">aether-backend/</code>.
      </p>
    </div>
  );
}

const ROOM_TYPE_OPTIONS = ["living_room", "master_bedroom", "bedroom", "kids_bedroom", "kitchen", "dining_room", "study", "bathroom", "balcony", "entry"];

function RoomRows({ rows, onChange }: { rows: RoomRow[]; onChange: (rows: RoomRow[]) => void }) {
  const update = (key: string, patch: Partial<RoomRow>) => onChange(rows.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#1C1613]">
          Room Sizes <span className="font-normal text-[#665A50]">(optional)</span>
        </span>
        <button
          type="button"
          onClick={() => onChange([...rows, { key: Date.now().toString(36), name: "", type: "bedroom", width: "", length: "" }])}
          className="text-xs font-bold text-[#79553D] hover:underline"
        >
          + Add Room
        </button>
      </div>

      {rows.length ? (
        <div className="flex flex-col gap-2">
          {rows.map((r) => (
            <div key={r.key} className="grid grid-cols-[1fr_1fr_5rem_5rem_2rem] items-center gap-2">
              <input
                value={r.name}
                placeholder="Name"
                onChange={(e) => update(r.key, { name: e.target.value })}
                className="rounded-xl border border-[#E5DCD0] bg-white px-3 py-2 text-xs text-[#1C1613] shadow-xs focus:border-[#79553D] focus:outline-none"
              />
              <select
                value={r.type}
                onChange={(e) => update(r.key, { type: e.target.value })}
                className="rounded-xl border border-[#E5DCD0] bg-white px-3 py-2 text-xs text-[#1C1613] shadow-xs focus:border-[#79553D] focus:outline-none cursor-pointer"
              >
                {ROOM_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <input
                value={r.width}
                inputMode="decimal"
                placeholder="W (m)"
                onChange={(e) => update(r.key, { width: e.target.value })}
                className="rounded-xl border border-[#E5DCD0] bg-white px-3 py-2 text-xs font-mono text-[#1C1613] shadow-xs focus:border-[#79553D] focus:outline-none"
              />
              <input
                value={r.length}
                inputMode="decimal"
                placeholder="L (m)"
                onChange={(e) => update(r.key, { length: e.target.value })}
                className="rounded-xl border border-[#E5DCD0] bg-white px-3 py-2 text-xs font-mono text-[#1C1613] shadow-xs focus:border-[#79553D] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onChange(rows.filter((x) => x.key !== r.key))}
                aria-label="Remove row"
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#8C7B6D] hover:bg-[#F6EFE6] hover:text-[#A64B3C]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#665A50]">
          Leave empty and the AI will list the rooms from your brief with estimated sizes.
        </p>
      )}
    </div>
  );
}

function ShareLinkRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E8DEC8] bg-white p-4 shadow-xs">
      <Link2 className="h-5 w-5 shrink-0 text-[#79553D]" />
      <a
        href={url || "#"}
        target="_blank"
        rel="noreferrer"
        className="text-xs font-mono truncate text-[#4A423B] underline-offset-2 hover:underline"
      >
        {url || "Render the space to get a share link"}
      </a>
      <button
        type="button"
        disabled={!url}
        onClick={() => {
          void navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="ml-auto shrink-0 rounded-full border border-[#E5DCD0] bg-[#F6EFE6] px-4 py-1.5 text-xs font-bold text-[#1C1613] hover:bg-[#EAE0D2] disabled:opacity-40 transition-all"
      >
        {copied ? "Copied ✓" : "Copy Link"}
      </button>
    </div>
  );
}
