"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  Palette,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Layout,
  Compass,
  Box,
  FileText,
  Briefcase,
  Sliders,
  Check,
  Eye,
  Building2,
  Home,
  Hammer,
  Users,
  Cpu,
  Info,
  Maximize2,
  RefreshCw,
} from "lucide-react";

export default function DesignersPage() {
  const [activeVisualizationTab, setActiveVisualizationTab] = useState<"beforeAfter" | "materials" | "walkthrough">("beforeAfter");
  const [beforeAfterSlider, setBeforeAfterSlider] = useState<number>(50);
  const [activeMaterial, setActiveMaterial] = useState<string>("oak");

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613] selection:bg-[#79553D] selection:text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* ==================================================
          1. HERO SECTION
         ================================================== */}
      <section className="relative py-12 lg:py-20 overflow-hidden bg-[#FAF7F2] border-b border-[#E8DEC8]">
        {/* Subtle architectural background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C8B89E_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] uppercase tracking-widest shadow-xs">
                <Palette className="h-4 w-4" />
                <span>FOR DESIGNERS & DESIGN STUDIOS</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-[#1C1613] tracking-tight">
                Your design workflow. <br />
                <span className="text-[#79553D]">One persistent spatial model.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5A4F46] leading-relaxed font-normal">
                Capture the space once, understand it deeply, design with confidence, visualize the result, and move toward specification without rebuilding the same information across tools.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/apply-as-designer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#64442F] hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <span>Become a Design Partner →</span>
                </Link>

                <a
                  href="#workflow"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E8DEC8] bg-[#F6EFE6] px-7 py-3.5 text-sm font-semibold text-[#1C1613] hover:bg-[#EAE0D2] transition-all"
                >
                  <span>Explore the Workflow</span>
                </a>
              </div>

              {/* Hero Workflow Pathway Ribbon */}
              <div className="pt-4 border-t border-[#E8DEC8]/80 text-xs font-medium text-[#79553D] flex flex-wrap items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#79553D] shrink-0" />
                <span className="font-semibold">CAPTURE</span>
                <span className="text-[#A89A8C]">→</span>
                <span className="font-semibold">UNDERSTAND</span>
                <span className="text-[#A89A8C]">→</span>
                <span className="font-semibold">DESIGN</span>
                <span className="text-[#A89A8C]">→</span>
                <span className="font-semibold">3D</span>
                <span className="text-[#A89A8C]">→</span>
                <span className="font-semibold">SPECIFICATION</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-7 relative">
              
              {/* Connected Stage Micro-Arc */}
              <div className="hidden sm:flex items-center justify-between gap-1.5 mb-3 relative z-20 px-1">
                {[
                  { step: "01", name: "Capture" },
                  { step: "02", name: "Understand" },
                  { step: "03", name: "Design" },
                  { step: "04", name: "3D", active: true },
                  { step: "05", name: "Specification" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <div
                      className={`flex items-center gap-2 rounded-xl px-3 py-1.5 shadow-xs border text-xs font-bold transition-all ${
                        item.active
                          ? "bg-[#79553D] text-white border-[#79553D]"
                          : "bg-white/95 text-[#1C1613] border-[#E8DEC8] backdrop-blur-sm"
                      }`}
                    >
                      <span className={`text-[10px] font-mono ${item.active ? "text-[#EADECB]" : "text-[#79553D]"}`}>
                        {item.step}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    {idx < 4 && <span className="text-[#B0A294] text-xs">→</span>}
                  </div>
                ))}
              </div>

              {/* Main Visual Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-2xl bg-[#1C1613]">
                <div className="relative h-[390px] sm:h-[470px] w-full">
                  <Image
                    src="/images/hero/hero_3d_furnished_room.jpg"
                    alt="Allure Designer Spatial Interface"
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
                </div>

                {/* Overlaid UI Canvas Elements */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
                  
                  {/* Top Bar: Room Telemetry & Moodboard Preview */}
                  <div className="flex items-start justify-between gap-3 pointer-events-auto">
                    {/* Live Spatial Telemetry Pill */}
                    <div className="flex items-center gap-2 rounded-2xl bg-black/70 backdrop-blur-md px-3.5 py-2 text-white border border-white/20 shadow-lg">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-[11px] font-mono">
                        <span className="text-white/70">MODEL ID:</span> <span className="font-bold text-white">ALLURE-SPT-402</span>
                        <span className="mx-2 text-white/30">|</span>
                        <span className="text-white/70">BOUNDS:</span> <span className="text-white">6.4m × 4.8m</span>
                      </div>
                    </div>

                    {/* Floating Moodboard Widget */}
                    <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 sm:p-3 shadow-xl border border-[#E8DEC8] backdrop-blur-md text-[#1C1613]">
                      <div className="relative h-10 w-12 rounded-lg overflow-hidden shrink-0 border border-[#E5DCD0]">
                        <Image
                          src="/images/hero/hero_moodboard.jpg"
                          alt="Material palette preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-xs font-bold text-[#1C1613] block">Active Palette</span>
                        <span className="text-[10px] text-[#79553D] font-medium">Teak, Travertine & Brass</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Studio Bar: Connected Persistent Spatial Architecture */}
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#1C1613]/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white pointer-events-auto shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#79553D] text-white shrink-0 shadow-sm">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Persistent Spatial Model Active</span>
                          <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Synchronized
                          </span>
                        </div>
                        <div className="text-[11px] text-[#D5C7B5]">
                          Zero manual re-entry between spatial layout, 3D visualizations, and specifications
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/apply-as-designer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#79553D] px-4 py-2 text-xs font-bold text-white hover:bg-[#64442F] transition-all shrink-0 self-end sm:self-center shadow-xs"
                    >
                      <span>Join Studio Pilot</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. DESIGNER WORKFLOW
         ================================================== */}
      <section id="workflow" className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              FIVE-STAGE PIPELINE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              One Workflow. From Capture to Specification.
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              A unified pipeline built so interior designers and studios do not have to rebuild the same space repeatedly across disconnected CAD, 3D, and spreadsheet tools.
            </p>
          </div>

          {/* Visual Step Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 relative">
            {[
              {
                num: "01",
                stage: "Capture",
                desc: "Capture the existing space, room information, dimensions, images and project context.",
                icon: Layout,
              },
              {
                num: "02",
                stage: "Understand",
                desc: "Organize spatial information, objects, geometry, relationships and requirements.",
                icon: Compass,
              },
              {
                num: "03",
                stage: "Design",
                desc: "Develop design concepts, layouts, moodboards, materials and spatial ideas.",
                icon: Palette,
              },
              {
                num: "04",
                stage: "3D",
                desc: "Turn the design into supported 3D visualizations and immersive experiences.",
                icon: Box,
              },
              {
                num: "05",
                stage: "Specification",
                desc: "Move from design concepts toward products, materials and project specifications.",
                icon: FileText,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl bg-[#FAF7F2] p-6 border border-[#E8DEC8] shadow-xs hover:shadow-md hover:border-[#79553D]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#79553D] bg-[#EADECB] px-2.5 py-1 rounded-md">
                      {item.num}
                    </span>
                    <item.icon className="h-4 w-4 text-[#79553D]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#1C1613] mb-2">{item.stage}</h3>
                  <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DEC8]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#79553D]">
                  <span>Stage {item.num}</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Connected Flow Diagram Card */}
          <div className="rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] p-5 max-w-4xl mx-auto mb-10 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#1C1613]">
              <span className="px-4 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">CAPTURE</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-4 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">UNDERSTAND</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-4 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">DESIGN</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-4 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">3D</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-4 py-2 rounded-xl bg-[#79553D] text-white w-full text-center">SPECIFICATION</span>
            </div>
          </div>

          {/* Workflow CTA */}
          <div className="text-center">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Explore Spatial Engine</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. BETTER BRIEFS
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              QUALIFIED CONTEXT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              Start With a Better Brief.
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Designers should have comprehensive project context before the first serious conversation. Our structured brief gives your studio full clarity to immediately answer:
            </p>
            <div className="inline-block rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] px-6 py-2.5 text-sm sm:text-base font-semibold text-[#1C1613] shadow-xs">
              &ldquo;Is this project right for my studio?&rdquo;
            </div>
          </div>

          {/* 8 Brief Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                title: "Project Requirements",
                desc: "Specific spatial needs, family living requirements, and structural scope.",
                icon: CheckCircle2,
              },
              {
                title: "Space Information",
                desc: "Accurate room dimensions, wall boundaries, and natural light conditions.",
                icon: Layout,
              },
              {
                title: "Client Goals",
                desc: "Target lifestyle goals, completion deadlines, and functional priorities.",
                icon: Compass,
              },
              {
                title: "Style Preferences",
                desc: "Curated aesthetic registers (Contemporary Indian, Warm Minimalism, Japandi).",
                icon: Palette,
              },
              {
                title: "Budget & Context",
                desc: "Defined budget expectations and scope where available to avoid mismatched pricing.",
                icon: Briefcase,
              },
              {
                title: "Project Scope",
                desc: "Explicit turnkey boundaries: full design-build vs. soft interior furnishing.",
                icon: Layers,
              },
              {
                title: "Design Expectations",
                desc: "Clear deliverable milestones, 3D review cadences, and approval timelines.",
                icon: Eye,
              },
              {
                title: "Project Fit",
                desc: "Pre-screened match score based on your studio's registered design philosophy.",
                icon: ShieldCheck,
              },
            ].map((brief, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3 shadow-xs hover:border-[#79553D]/40 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-[#79553D]">
                  <brief.icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-sm text-[#1C1613]">{brief.title}</h4>
                <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">{brief.desc}</p>
              </div>
            ))}
          </div>

          {/* Brief CTA */}
          <div className="text-center">
            <Link
              href="/apply-as-designer"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Apply as a Designer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          4. SPATIAL WORKFLOW
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              PERSISTENT SPATIAL MODEL
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              One Space. Connected Throughout the Workflow.
            </h2>
            <p className="text-base sm:text-lg text-[#79553D] font-semibold">
              Designers should not have to repeatedly rebuild the same space across disconnected tools.
            </p>
            <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
              In Allure, spatial information remains persistent and shared across layout design, 3D renderings, and bill of quantities.
            </p>
          </div>

          {/* Connected Spatial Flow Pipeline */}
          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] max-w-5xl mx-auto mb-12 shadow-sm">
            <div className="text-[11px] font-bold text-[#8C7B6D] uppercase tracking-wider mb-4 text-center">
              Persistent Spatial Architecture Flow
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-[#1C1613]">
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">SPACE</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">OBJECTS</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">GEOMETRY</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">RELATIONSHIPS</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">DESIGN</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">3D</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#79553D] text-white w-full text-center">SPECIFICATION</span>
            </div>
          </div>

          {/* 7 Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">01</span>
              <h4 className="font-bold text-base text-[#1C1613]">Object Identity</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Every piece of furniture, luminaire, and finish maintains a persistent identity and SKU across moodboard, render, and BOQ.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">02</span>
              <h4 className="font-bold text-base text-[#1C1613]">Geometry</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Parametric dimensions, ceiling heights, door clearances, and wall angles stay synchronized in true millimeter precision.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">03</span>
              <h4 className="font-bold text-base text-[#1C1613]">Spatial Relationships</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Circulation walkways, ergonomic clearances, and lighting incident angles are preserved across design iterations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">04</span>
              <h4 className="font-bold text-base text-[#1C1613]">Reusable Information</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Site survey scans and client requirement notes populate directly into design modules without repetitive manual data transcription.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">05</span>
              <h4 className="font-bold text-base text-[#1C1613]">Design Changes</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                When a client adjusts a partition wall or sofa dimensions, all downstream 3D visuals and itemized quantities update simultaneously.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">06</span>
              <h4 className="font-bold text-base text-[#1C1613]">3D Visualization</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Turn layout designs into browser-accessible panoramic 3D models with realistic material shaders without third-party render delays.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2 sm:col-span-2 lg:col-span-3">
              <span className="text-[10px] font-mono font-bold text-[#79553D] uppercase tracking-wider bg-[#EADECB] px-2 py-0.5 rounded">07</span>
              <h4 className="font-bold text-base text-[#1C1613]">Project Specifications</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Generate export-ready finish schedules, electrical placement notes, and contractor Bill of Quantities (BOQ) directly linked to model objects.
              </p>
            </div>
          </div>

          {/* Spatial Workflow CTA */}
          <div className="text-center">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Explore the Spatial Engine</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          5. VISUALIZATION
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              3D & RENDERING WORKFLOWS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              Bring the Design to Life.
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Present interactive panoramic tours and material studies directly in browser to communicate the design clearly and accelerate client sign-offs.
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] max-w-4xl mx-auto mb-12 shadow-xs">
            <div className="text-[11px] font-bold text-[#8C7B6D] uppercase tracking-wider mb-4 text-center">
              Visualization Workflow Sequence
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-[#1C1613]">
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">Design Concept</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">Material / Furniture Selection</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#79553D] text-white w-full text-center">3D Visualization</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">Client Review</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">Refinement</span>
            </div>
          </div>

          {/* Visual Showcase Examples with Interactive Tabs */}
          <div className="max-w-5xl mx-auto mb-12">
            {/* Tab Controls */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setActiveVisualizationTab("beforeAfter")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeVisualizationTab === "beforeAfter"
                    ? "bg-[#79553D] text-white shadow-sm"
                    : "bg-[#F6EFE6] text-[#5A4F46] hover:bg-[#EAE0D2]"
                }`}
              >
                Before / After Room Slider
              </button>
              <button
                onClick={() => setActiveVisualizationTab("materials")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeVisualizationTab === "materials"
                    ? "bg-[#79553D] text-white shadow-sm"
                    : "bg-[#F6EFE6] text-[#5A4F46] hover:bg-[#EAE0D2]"
                }`}
              >
                Material Swatches & Texture
              </button>
              <button
                onClick={() => setActiveVisualizationTab("walkthrough")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeVisualizationTab === "walkthrough"
                    ? "bg-[#79553D] text-white shadow-sm"
                    : "bg-[#F6EFE6] text-[#5A4F46] hover:bg-[#EAE0D2]"
                }`}
              >
                3D Walkthrough Preview
              </button>
            </div>

            {/* Tab 1: Before / After Room */}
            {activeVisualizationTab === "beforeAfter" && (
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-xl bg-[#1C1613]">
                <div className="relative h-[360px] sm:h-[460px] w-full overflow-hidden select-none">
                  {/* Before Image (Base) */}
                  <Image
                    src="/images/hero/transform_before.jpg"
                    alt="Empty Room Before Allure Transformation"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  
                  {/* After Image (Clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${beforeAfterSlider}%)` }}
                  >
                    <Image
                      src="/images/hero/transform_after.jpg"
                      alt="Furnished Room After Allure Transformation"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center pointer-events-none"
                    style={{ left: `${beforeAfterSlider}%` }}
                  >
                    <div className="h-9 w-9 rounded-full bg-[#79553D] text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Overlaid Badges */}
                  <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/20">
                    Empty Site Capture (Before)
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-[#79553D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-white/20">
                    Allure 3D Concept (After)
                  </div>

                  {/* Slider Control Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#1C1613]/85 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex items-center gap-4 text-white">
                    <span className="text-xs font-bold shrink-0">Drag to Compare:</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={beforeAfterSlider}
                      onChange={(e) => setBeforeAfterSlider(Number(e.target.value))}
                      className="w-full accent-[#79553D] cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold shrink-0">{beforeAfterSlider}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Material Visualization */}
            {activeVisualizationTab === "materials" && (
              <div className="rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#79553D]">
                      Interactive Palette Selector
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#1C1613]">
                      Material & Specification Fidelity
                    </h3>
                    <p className="text-xs text-[#5A4F46] leading-relaxed">
                      Allure maps architectural swatches directly to physical PBR material definitions so clients experience true texture, light reflection, and surface sheen.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      {[
                        { id: "oak", name: "Natural Oak", file: "/images/materials/material-oak.avif" },
                        { id: "marble", name: "Calacatta", file: "/images/materials/material-marble.avif" },
                        { id: "brass", name: "Brushed Brass", file: "/images/materials/material-brass.avif" },
                        { id: "linen", name: "Warm Linen", file: "/images/materials/material-linen.avif" },
                        { id: "terrazzo", name: "Terrazzo", file: "/images/materials/material-terrazzo.avif" },
                        { id: "walnut", name: "Smoked Walnut", file: "/images/materials/material-walnut.avif" },
                      ].map((mat) => (
                        <button
                          key={mat.id}
                          onClick={() => setActiveMaterial(mat.id)}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            activeMaterial === mat.id
                              ? "bg-white border-[#79553D] shadow-sm ring-2 ring-[#79553D]/20"
                              : "bg-[#FAF7F2] border-[#E8DEC8] hover:border-[#79553D]/40"
                          }`}
                        >
                          <div className="relative h-12 w-full rounded-xl overflow-hidden mb-1.5 border border-[#E5DCD0]">
                            <Image src={mat.file} alt={mat.name} fill unoptimized className="object-cover" />
                          </div>
                          <span className="text-[11px] font-bold text-[#1C1613] block truncate">{mat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#E8DEC8] bg-[#1C1613] shadow-md">
                    <Image
                      src="/images/hero/hero_moodboard.jpg"
                      alt="Rendered Material Surface"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-white/15 text-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold block">Selected: {activeMaterial.toUpperCase()}</span>
                        <span className="text-[10px] text-[#D5C7B5]">Matched with Grade A Verified Supplier Catalog</span>
                      </div>
                      <span className="text-emerald-400 font-mono text-[10px] font-bold">100% SPEC COMPLIANT</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: 3D Walkthrough Preview */}
            {activeVisualizationTab === "walkthrough" && (
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-xl bg-[#1C1613]">
                <div className="relative h-[360px] sm:h-[460px] w-full">
                  <Image
                    src="/images/hero/hero_3d_furnished_room.jpg"
                    alt="Panoramic 3D Walkthrough View"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white border border-white/20">
                        <Eye className="h-3.5 w-3.5 text-amber-400" />
                        <span>360° Browser Panorama Active</span>
                      </span>
                      <span className="text-[11px] font-mono text-white/70 bg-black/50 px-2.5 py-1 rounded-lg">
                        FOV: 75° | FPS: 60
                      </span>
                    </div>

                    <div className="bg-[#1C1613]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-white">Browser-Native Spatial Walkthrough</h4>
                        <p className="text-xs text-[#D5C7B5] mt-0.5">
                          Share single-link interactive 3D presentations with clients on mobile, iPad, or desktop without plugin installs.
                        </p>
                      </div>
                      <Link
                        href="/request-demo"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#79553D] px-4 py-2 text-xs font-bold text-white hover:bg-[#64442F] transition-all shrink-0"
                      >
                        <span>Launch Demo Walkthrough</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6 Capabilities Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                Available Now
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">Before / After Room Slider</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Compare empty site scan photos directly with 3D furnished spatial renders to demonstrate transformation value.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                Available Now
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">3D Walkthrough</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Browser-based panoramic tour links enabling clients to rotate, examine room sightlines, and visualize spatial volume.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                Available Now
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">Interior Visualization</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                High-fidelity rendering of spatial ambient lighting, window sunlight orientations, and architectural accents.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                Available Now
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">Material Visualization</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Texture-accurate surfaces for marble, natural wood, metal alloys, and textiles tied to real vendor samples.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                Available Now
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">Moodboard → 3D Transformation</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Seamless translation of inspirational visual moodboards directly into 3D scene materials and furniture styles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-2">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                In Development
              </span>
              <h4 className="font-bold text-base text-[#1C1613]">Spatial Design Preview & AR</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Real-time on-site AR projection of proposed layouts onto raw concrete floors during site inspection visits.
              </p>
            </div>
          </div>

          {/* Transparent Status Callout */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center text-xs text-[#5A4F46] max-w-3xl mx-auto mb-8">
            <strong className="text-[#1C1613]">Capability Transparency:</strong> High-definition browser 3D tours, material studies, and moodboard translations are live in production. AR site overlay and direct vendor API procurement are in active development.
          </div>

          {/* Visualization CTA */}
          <div className="text-center">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          6. PROFESSIONAL ECOSYSTEM
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              CURATED NETWORK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              Relevant Opportunities for Designers.
            </h2>
            <p className="text-base sm:text-lg text-[#1C1613] font-semibold">
              Discover projects and partnerships that are relevant to your expertise and workflow.
            </p>
            <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
              Allure is not a mass lead-distribution platform. We do not blast unqualified inquiries. We curate project connections where the client&apos;s aesthetic register, budget, and scope match your practice.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12">
            {[
              {
                title: "Homeowners",
                desc: "High-intent apartment and villa buyers looking for bespoke aesthetic interior design.",
                icon: Home,
              },
              {
                title: "Property Developers",
                desc: "Residential developers seeking show-flat concepts and pre-possession buyer interior catalogs.",
                icon: Building2,
              },
              {
                title: "Real-Estate Projects",
                desc: "Commercial and co-working developments requiring structured spatial planning.",
                icon: Layout,
              },
              {
                title: "Design Studios",
                desc: "Boutique practices looking to collaborate or scale 3D execution bandwidth.",
                icon: Palette,
              },
              {
                title: "Furniture Partners",
                desc: "Verified premium furniture brands providing direct SKU catalogs and trade pricing.",
                icon: Box,
              },
              {
                title: "Material Partners",
                desc: "Architectural surface, tile, marble, and veneer manufacturers with physical swatches.",
                icon: Sparkles,
              },
              {
                title: "Technology Partners",
                desc: "Smart home automation, architectural lighting, and acoustic hardware integrations.",
                icon: Cpu,
              },
              {
                title: "Turnkey Contractors",
                desc: "Vetted civil, carpentry, and electrical execution partners aligned with your drawings.",
                icon: Hammer,
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2.5 shadow-xs hover:border-[#79553D]/40 transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6EFE6] border border-[#E8DEC8] text-[#79553D]">
                  <cat.icon className="h-4 w-4" />
                </div>
                <h4 className="font-bold text-sm text-[#1C1613]">{cat.title}</h4>
                <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* Ecosystem CTA */}
          <div className="text-center">
            <Link
              href="/apply-as-designer"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Apply as a Design Partner</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          7. STUDIO PARTNERSHIP
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              PILOT PROGRAM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              Build With Allure.
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Partner with Allure to test the workflow on real projects. Selected design practices pilot Allure on real client engagements to refine spatial modeling and client presentation speed.
            </p>
          </div>

          {/* Studio Pilot Model Architecture Flow */}
          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] max-w-5xl mx-auto mb-10 shadow-xs">
            <div className="text-[11px] font-bold text-[#8C7B6D] uppercase tracking-wider mb-4 text-center">
              Studio Pilot Model Architecture
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold text-[#1C1613]">
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">DESIGN STUDIO</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">REAL PROJECT</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">ALLURE WORKFLOW</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">TEST & LEARN</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-white border border-[#E5DCD0] w-full text-center">MEASURE OUTCOMES</span>
              <span className="text-[#79553D] rotate-90 sm:rotate-0 font-bold">↓</span>
              <span className="px-3 py-2 rounded-xl bg-[#79553D] text-white w-full text-center">EXPAND</span>
            </div>
          </div>

          {/* Transparent Pilot Description */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] p-6 sm:p-8 space-y-4 mb-10">
            <h4 className="font-bold text-base text-[#1C1613] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#79553D]" />
              <span>Transparent Studio Pilot Principles</span>
            </h4>
            <div className="space-y-2 text-xs text-[#5A4F46] leading-relaxed">
              <p>
                • <strong>Real Projects:</strong> We test spatial models against live residential floor plans and actual client revisions, not hypothetical test cases.
              </p>
              <p>
                • <strong>Direct Engineering Access:</strong> Partner studios get dedicated slack channel access to Allure&apos;s product and spatial engineering team.
              </p>
              <p>
                • <strong>No Artificial Scarcity:</strong> We onboard studios in deliberate cohorts based on engineering review capacity rather than manufactured urgency.
              </p>
            </div>
          </div>

          {/* Pilot CTA */}
          <div className="text-center">
            <Link
              href="/apply-as-designer"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Explore Partnership</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          8. PROOF / PRODUCT STATUS
         ================================================== */}
      <section className="py-20 bg-[#1C1613] text-white border-b border-[#38302A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#38302A] px-4 py-1.5 text-xs font-bold text-[#EADECB] uppercase tracking-widest">
              <Info className="h-3.5 w-3.5 text-[#EADECB]" />
              <span>TRANSPARENT PRODUCT STATUS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              What We&apos;re Building.
            </h2>
            <p className="text-base text-[#D5C7B5] leading-relaxed font-normal">
              We distinguish clearly between current engineering signals and unproven commercial outcomes as we validate our core spatial hypothesis.
            </p>
          </div>

          {/* Engineering Signals vs Unproven Outcomes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            
            {/* Left: Current Engineering Signals */}
            <div className="p-8 rounded-3xl bg-[#261E1A] border border-[#3E332B] space-y-6">
              <div className="flex items-center justify-between border-b border-[#3E332B] pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  Current Engineering Signals
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#D5C7B5]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-mono">NOW</span>
                    <span>Persistent Spatial Schema</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Mathematical room graphs link dimensions, openings, and object bounding boxes across sessions.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded font-mono">NOW</span>
                    <span>Browser-Based 3D Walkthroughs</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Sub-second panoramic rendering running smoothly in mobile and desktop browsers with zero install.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded font-mono">PROTOTYPE</span>
                    <span>AI Moodboard Style Synthesis</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Generates cohesive palette swatches from qualitative client inspiration photos in under 45 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: What We're Validating (Unproven Commercial Outcomes) */}
            <div className="p-8 rounded-3xl bg-[#261E1A] border border-[#3E332B] space-y-6">
              <div className="flex items-center justify-between border-b border-[#3E332B] pb-4">
                <h3 className="font-display text-xl font-bold text-white">
                  What We&apos;re Actively Validating
                </h3>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800">
                  IN VALIDATION
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#D5C7B5]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded font-mono">BUILDING</span>
                    <span>Spatial Workflow & Usability</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Validating that studio designers prefer single-model spatial authoring over fragmented software chains.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded font-mono">BUILDING</span>
                    <span>Repeat Usage & Retention</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Measuring whether partner studios return to Allure for their second, third, and fourth client engagements.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded font-mono">PLANNED</span>
                    <span>Generalization Across Project Types</span>
                  </div>
                  <p className="pl-12 text-[#A89A8C]">
                    Expanding models from 2BHK/3BHK apartments to multi-story villas, retail boutiques, and corporate suites.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Validation Status Tags */}
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs text-[#D5C7B5] mb-10">
            <span className="font-bold text-white">Active Product Statuses:</span>
            <span className="px-3 py-1 rounded-full bg-[#38302A] text-emerald-400 font-mono font-bold">Now</span>
            <span className="px-3 py-1 rounded-full bg-[#38302A] text-amber-400 font-mono font-bold">Prototype</span>
            <span className="px-3 py-1 rounded-full bg-[#38302A] text-sky-400 font-mono font-bold">Building</span>
            <span className="px-3 py-1 rounded-full bg-[#38302A] text-purple-400 font-mono font-bold">Planned</span>
            <span className="px-3 py-1 rounded-full bg-[#38302A] text-slate-300 font-mono font-bold">Long-term</span>
          </div>

          {/* Proof CTA */}
          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
            >
              <span>About Allure</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================
          9. DESIGNER BENEFITS
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              STUDIO ADVANTAGES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
              Designer Benefits
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              A connected spatial model built to support your practice from initial client consultation through site handover.
            </p>
          </div>

          {/* 6 Core Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Capture Once</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Keep project information connected. Space dimensions, boundaries, and client goals are entered once and stay consistent across layouts, renders, and specification schedules.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Design Faster</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Reduce repetitive work across disconnected tools. Eliminate the tedious manual re-entry cycle between CAD drafting, 3D visualization modeling, and Excel BOQ formulas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Visualize Clearly</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Create compelling 3D and spatial presentations. Present interactive web walkthroughs and panoramic concepts directly to clients without bulky software installs or render farm waits.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Better Client Conversations</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Help clients understand the design before execution. Remove spatial ambiguity early, leading to faster design approvals and dramatically fewer mid-construction change orders.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Connected Specifications</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Move from concepts toward products and materials. Translate aesthetic visual selections directly into verified product items, manufacturer codes, and itemized contractor quantities.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md hover:border-[#79553D]/40 transition-all space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#79553D] shadow-xs border border-[#E8DEC8]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#1C1613]">Relevant Opportunities</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Discover projects and partnerships aligned with your expertise. Connect with qualified homeowners, developers, and premium brand partners suited to your studio&apos;s design register.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          10. FINAL CTA
         ================================================== */}
      <section className="py-24 bg-[#1C1613] text-white relative overflow-hidden">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#79553D]/25 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8DEC8]">
            JOIN AS A DESIGN PARTNER
          </span>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white tracking-tight">
            Design With a More Connected Spatial Workflow.
          </h2>

          <p className="text-base sm:text-lg text-[#D5C7B5] leading-relaxed font-normal">
            Bring your projects, spatial data, design thinking, and visualization into a more connected workflow with Allure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/apply-as-designer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#79553D] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#64442F] hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <span>Apply as a Design Partner →</span>
            </Link>

            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              <span>Request a Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 bg-[#1C1613] text-[#EFE6DA] border-t border-[#38302A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#38302A] pb-10">
            <div>
              <span className="font-display text-3xl font-bold tracking-[0.3em] text-white">
                ALLURE
              </span>
              <p className="text-xs text-[#A89A8C] mt-1">
                Visualize your dream space before you build it.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#D5C7B5]">
              <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              <Link href="/#for-homeowners" className="hover:text-white transition-colors">For Homeowners</Link>
              <Link href="/designers" className="hover:text-white transition-colors font-bold text-white">For Designers</Link>
              <Link href="/builders" className="hover:text-white transition-colors">For Builders</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-4">
            <p>© {new Date().getFullYear()} ALLURE Spatial Intelligence Platform. All rights reserved.</p>
            <p>Designed for interior designers, architects, and studio practices.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
