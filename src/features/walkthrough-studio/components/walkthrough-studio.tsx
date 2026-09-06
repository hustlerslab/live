"use client";

/**
 * Walkthrough Studio — the homeowner journey from the Allure user-flow map:
 *
 *   Create Project → Upload & Describe → Generate Moodboard (FREE)
 *   → Review & Refine → Generate 3D Space (PAID) → View 3D Experience
 *   → Save / Share → Connect with Designer (FREE)
 *
 * The moodboard steps are mock, like the rest of the portal. The 3D steps are
 * live: "Generate 3D Space" creates a real scene on the Aether engine and
 * "View 3D Experience" embeds the interactive walkthrough. If the engine is
 * down, only those steps say so — the journey up to that point always works.
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
import { IMAGES } from "@/lib/mock/images";
import { MOODBOARD_CONCEPTS } from "@/lib/mock/moodboards";

import * as aether from "@/features/walkthrough3d/api/aether-api";
import { Walkthrough3DView } from "@/features/walkthrough3d/components/walkthrough3d-view";

/* ── Steps ─────────────────────────────────────────────────────────────── */

type StepId =
  | "project"
  | "describe"
  | "moodboard"
  | "refine"
  | "generate3d"
  | "experience"
  | "share"
  | "designer";

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

interface StagedPhoto {
  id: string;
  previewUrl: string;
  name: string;
}

/** How long the mock "AI is generating" state runs. Long enough to read as
 * work, short enough not to bore a live demo. */
const GENERATION_DELAY_MS = 1800;

export function WalkthroughStudio() {
  const [stepIndex, setStepIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  // Step 1 — project
  const [projectName, setProjectName] = useState("");
  const [spaceType, setSpaceType] = useState("Living room + bedroom");

  // Step 2 — upload & describe
  const [photos, setPhotos] = useState<StagedPhoto[]>([]);
  const [vision, setVision] = useState("");
  const photosRef = useRef<StagedPhoto[]>([]);
  photosRef.current = photos;

  // Step 3/4 — moodboard
  const [conceptIndex, setConceptIndex] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);

  // Step 5/6 — 3D
  const [sceneId, setSceneId] = useState<string | null>(null);
  const [creatingScene, setCreatingScene] = useState(false);
  const [engineError, setEngineError] = useState<string | null>(null);

  // Step 8 — designer
  const [connectedDesigner, setConnectedDesigner] = useState<string | null>(null);

  // Object URLs must be revoked or every preview keeps a decoded bitmap alive.
  useEffect(
    () => () => {
      for (const photo of photosRef.current) URL.revokeObjectURL(photo.previewUrl);
    },
    [],
  );

  const step = STEPS[stepIndex];
  const concept =
    conceptIndex === null ? null : MOODBOARD_CONCEPTS[conceptIndex % MOODBOARD_CONCEPTS.length];

  const goTo = useCallback((index: number) => {
    setStepIndex(index);
    setMaxReached((m) => Math.max(m, index));
  }, []);

  const next = useCallback(() => goTo(Math.min(stepIndex + 1, STEPS.length - 1)), [goTo, stepIndex]);
  const back = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  /* ── Step actions ────────────────────────────────────────────────────── */

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const staged: StagedPhoto[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      staged.push({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
      });
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

  const generateMoodboard = useCallback(() => {
    setGenerating(true);
    window.setTimeout(() => {
      setConceptIndex((i) => (i === null ? 0 : i + 1));
      setGenerating(false);
    }, GENERATION_DELAY_MS);
  }, []);

  const generateScene = useCallback(async () => {
    setCreatingScene(true);
    setEngineError(null);
    try {
      const result = await aether.createScene(projectName || "My Allure space");
      setSceneId(result.scene.scene_id);
      goTo(stepIndex + 1);
    } catch (err) {
      setEngineError(err instanceof Error ? err.message : String(err));
    } finally {
      setCreatingScene(false);
    }
  }, [projectName, goTo, stepIndex]);

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="overline text-ink-muted">See it before you commit</p>
          <h1 className="display text-3xl text-ink">Walkthrough Studio</h1>
          <p className="body-sm text-ink-muted">
            From an idea to a space you can walk through — moodboard first, 3D
            when you&apos;re sure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/cinematic"
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted transition-colors hover:bg-muted hover:text-ink-soft"
          >
            <Film className="size-3.5" />
            Cinematic film studio
          </Link>
          <Link
            href="/3d"
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted transition-colors hover:bg-muted hover:text-ink-soft"
          >
            <Box className="size-3.5" />
            Open 3D viewer
          </Link>
        </div>
      </div>

      {/* Stepper rail */}
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
        {STEPS.map((s, i) => {
          const state =
            i === stepIndex ? "current" : i <= maxReached ? "done" : "todo";
          return (
            <li key={s.id} className="flex items-center gap-1">
              <button
                type="button"
                disabled={i > maxReached}
                onClick={() => setStepIndex(i)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 caption transition-colors ${
                  state === "current"
                    ? "bg-gold text-ink font-medium"
                    : state === "done"
                      ? "border text-ink-soft hover:bg-muted"
                      : "border text-ink-muted/60"
                }`}
              >
                <span className="tabular">{i + 1}</span>
                {s.title}
                {s.badge === "free" ? (
                  <span className="rounded-sm border px-1 text-[10px] uppercase tracking-wide">
                    Free
                  </span>
                ) : null}
                {s.badge === "paid" ? (
                  <span
                    className={`rounded-sm px-1 text-[10px] uppercase tracking-wide ${
                      state === "current" ? "bg-ink/15" : "bg-gold text-ink"
                    }`}
                  >
                    Paid
                  </span>
                ) : null}
              </button>
              {i < STEPS.length - 1 ? (
                <span className="text-ink-muted/40" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* Step body */}
      <div className="rounded-lg border p-6">
        {step.id === "project" ? (
          <StepShell
            title="Tell us about your space"
            subtitle="Basic details to name the project — everything else comes from your photos and vision."
          >
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
                <select
                  value={spaceType}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="rounded-md border bg-transparent px-3 py-2 body-sm text-ink-soft focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option>Living room + bedroom</option>
                  <option>Living room</option>
                  <option>Bedroom</option>
                  <option>Full 2BHK</option>
                </select>
              </label>
            </div>
            <NavRow
              onNext={next}
              nextDisabled={!projectName.trim()}
              nextLabel="Continue"
            />
          </StepShell>
        ) : null}

        {step.id === "describe" ? (
          <StepShell
            title="Upload photos and describe your vision"
            subtitle="Room photos, inspiration shots, anything that shows what you have and what you want."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-ink-muted transition-colors hover:bg-muted">
                  <ImagePlus className="size-6" />
                  <span className="body-sm">Click to add room photos</span>
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
                {photos.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border">
                        {/* Object URLs — nothing for the Next optimiser to fetch. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.previewUrl}
                          alt={photo.name}
                          className="size-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute right-1 top-1 rounded-full bg-ink/70 p-0.5 text-cream opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label={`Remove ${photo.name}`}
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <label className="flex flex-col gap-1.5">
                <span className="body-sm font-medium text-ink-soft">Your vision</span>
                <textarea
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={7}
                  placeholder="Warm and calm, seating for five, keep the TV unit we already have, nothing that shows dust…"
                  className="resize-none rounded-md border bg-transparent px-3 py-2 body-sm text-ink-soft placeholder:text-ink-muted/60 focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </label>
            </div>
            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={photos.length === 0 && !vision.trim()}
              nextLabel="Continue"
            />
          </StepShell>
        ) : null}

        {step.id === "moodboard" ? (
          <StepShell
            title="Generate your moodboard"
            subtitle="Allure composes a direction from your photos and vision — palette, materials, and reference rooms."
          >
            {generating ? (
              <div className="flex flex-col items-center gap-3 py-12 text-ink-muted">
                <Loader2 className="size-6 animate-spin text-gold" />
                <p className="body-sm">Reading your photos and composing a direction…</p>
              </div>
            ) : concept ? (
              <MoodboardCard conceptIndex={conceptIndex ?? 0} />
            ) : (
              <div className="flex flex-col items-center gap-4 py-10">
                <Sparkles className="size-6 text-gold" />
                <p className="body-sm text-ink-muted">
                  {photos.length > 0
                    ? `${photos.length} photo${photos.length > 1 ? "s" : ""} ready.`
                    : "Working from your written vision."}{" "}
                  This step is free — generate as many times as you like.
                </p>
                <button
                  type="button"
                  onClick={generateMoodboard}
                  className="flex items-center gap-2 rounded-md bg-gold px-4 py-2 body-sm font-medium text-ink hover:opacity-90"
                >
                  <Sparkles className="size-4" />
                  Generate moodboard
                </button>
              </div>
            )}
            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={!concept || generating}
              nextLabel="Looks right — review it"
            />
          </StepShell>
        ) : null}

        {step.id === "refine" ? (
          <StepShell
            title="Review and refine"
            subtitle="Not quite it? Regenerate for a different direction — refining stays free until you go 3D."
          >
            {concept ? <MoodboardCard conceptIndex={conceptIndex ?? 0} /> : null}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generateMoodboard}
                disabled={generating}
                className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted disabled:opacity-40"
              >
                {generating ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="size-3.5" />
                )}
                Regenerate
              </button>
            </div>
            <NavRow
              onBack={back}
              onNext={next}
              nextDisabled={generating}
              nextLabel="Approve moodboard"
            />
          </StepShell>
        ) : null}

        {step.id === "generate3d" ? (
          <StepShell
            title="Generate your 3D space"
            subtitle="This is the paid step: your approved moodboard becomes a real, walkable 3D room on the Aether engine."
          >
            <div className="flex max-w-lg flex-col gap-4">
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="flex flex-col gap-0.5">
                  <p className="body-sm font-medium text-ink-soft">
                    {projectName || "My Allure space"}
                  </p>
                  <p className="caption text-ink-muted">
                    {spaceType} · {concept ? `“${MOODBOARD_CONCEPTS[(conceptIndex ?? 0) % MOODBOARD_CONCEPTS.length].name}” direction` : "no moodboard"}
                  </p>
                </div>
                <span className="rounded-sm bg-gold px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink">
                  Paid
                </span>
              </div>
              {engineError ? (
                <div className="rounded-md border border-warning/35 bg-warning/8 p-3">
                  <p className="body-sm text-ink-soft">{engineError}</p>
                  <p className="caption mt-1 text-ink-muted">
                    Start the engine with{" "}
                    <code className="rounded bg-muted px-1 py-0.5">
                      uvicorn app.main:app --port 8000
                    </code>{" "}
                    inside <code className="rounded bg-muted px-1 py-0.5">aether-backend/</code>.
                  </p>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => void generateScene()}
                disabled={creatingScene}
                className="flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-2.5 body-sm font-medium text-ink hover:opacity-90 disabled:opacity-40"
              >
                {creatingScene ? <Loader2 className="size-4 animate-spin" /> : <Box className="size-4" />}
                {creatingScene ? "Building your space…" : "Generate 3D space"}
              </button>
            </div>
            <NavRow onBack={back} />
          </StepShell>
        ) : null}

        {step.id === "experience" ? (
          <StepShell
            title="Walk through your space"
            subtitle="Orbit it, walk it in first person, or let the guided tour carry you room to room. Edit anything — every change is validated."
          >
            <Walkthrough3DView sceneId={sceneId ?? undefined} />
            <NavRow onBack={back} onNext={next} nextLabel="Save & share" />
          </StepShell>
        ) : null}

        {step.id === "share" ? (
          <StepShell
            title="Saved to your projects"
            subtitle="Share the walkthrough with family before you commit to anything."
          >
            <div className="flex max-w-lg flex-col gap-3">
              <div className="flex items-center gap-2 rounded-md border p-3">
                <Check className="size-4 text-gold" />
                <p className="body-sm text-ink-soft">
                  “{projectName || "My Allure space"}” is saved to My Projects.
                </p>
              </div>
              <ShareLinkRow />
            </div>
            <NavRow onBack={back} onNext={next} nextLabel="Connect with a designer" />
          </StepShell>
        ) : null}

        {step.id === "designer" ? (
          <StepShell
            title="Bring a designer into it"
            subtitle="A curated match based on your moodboard direction and city — connecting is free."
          >
            <div className="grid gap-3 md:grid-cols-3">
              {DESIGNERS.filter((d) => d.vetting === "verified")
                .slice(0, 3)
                .map((designer) => (
                  <div
                    key={designer.id}
                    className="flex flex-col gap-3 rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={designer.avatar}
                        alt={designer.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="body-sm font-medium text-ink-soft">
                          {designer.name}
                        </p>
                        <p className="caption text-ink-muted">
                          {designer.studio} · {designer.city}
                        </p>
                      </div>
                    </div>
                    <p className="caption text-ink-muted">{designer.style}</p>
                    {connectedDesigner === designer.id ? (
                      <p className="flex items-center gap-1.5 body-sm text-ink-soft">
                        <Check className="size-4 text-gold" /> Request sent
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConnectedDesigner(designer.id)}
                        className="flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 body-sm text-ink-muted hover:bg-muted"
                      >
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

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
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
    <div className="flex items-center justify-between border-t pt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 body-sm text-ink-muted hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" /> Back
        </button>
      ) : (
        <span />
      )}
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-1.5 rounded-md bg-gold px-4 py-2 body-sm font-medium text-ink hover:opacity-90 disabled:opacity-40"
        >
          {nextLabel} <ArrowRight className="size-3.5" />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function MoodboardCard({ conceptIndex }: { conceptIndex: number }) {
  const concept = MOODBOARD_CONCEPTS[conceptIndex % MOODBOARD_CONCEPTS.length];
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-gold/5 p-4">
      <div className="flex flex-col gap-0.5">
        <p className="body font-medium text-ink-soft">{concept.name}</p>
        <p className="body-sm text-ink-muted">{concept.caption}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {concept.imageSlots.map((slot) => {
          const image = IMAGES[slot];
          return (
            <Image
              key={slot}
              src={image.src}
              alt={concept.name}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              className="aspect-[4/3] rounded-md object-cover"
              sizes="(max-width: 1024px) 33vw, 260px"
            />
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          {concept.palette.map((swatch) => (
            <span
              key={swatch.name}
              title={swatch.name}
              className="size-6 rounded-full border"
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {concept.materialSlots.map((slot) => {
            const image = IMAGES[slot];
            return (
              <Image
                key={slot}
                src={image.src}
                alt={slot.replace("material-", "")}
                width={image.width}
                height={image.height}
                className="size-9 rounded-md object-cover"
                sizes="36px"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShareLinkRow() {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/3d`
      : "/3d";
  return (
    <div className="flex items-center gap-2 rounded-md border p-3">
      <Link2 className="size-4 shrink-0 text-ink-muted" />
      <span className="body-sm truncate text-ink-muted">{shareUrl}</span>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard?.writeText(shareUrl).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="ml-auto shrink-0 rounded-md border px-3 py-1 body-sm text-ink-muted hover:bg-muted"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
