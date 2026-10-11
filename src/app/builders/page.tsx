"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  Building2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Compass,
  Layers,
  Layout,
  Home,
  Lock,
  LineChart,
  Play,
  Box,
  UserCheck,
} from "lucide-react";

export default function BuildersPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      {/* Header Navigation */}
      <Navbar />

      {/* ==================================================
          1. HERO — BUILDER VALUE PROPOSITION & REFERENCE VISUAL
         ================================================== */}
      <section className="relative py-12 lg:py-20 overflow-hidden bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] uppercase tracking-widest shadow-xs">
                <Building2 className="h-4 w-4" />
                <span>FOR PROPERTY DEVELOPERS & REAL ESTATE BUILDERS</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-[#1C1613] tracking-tight">
                Extend the homeowner experience beyond the property transaction
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5A4F46] leading-relaxed font-normal">
                Give buyers a more connected experience before possession and continue supporting their journey after they move in.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href="/request-demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#79553D] px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#64442F] hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <span>Explore a Builder Partnership</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/request-demo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E8DEC8] bg-[#F6EFE6] px-7 py-3.5 text-sm font-semibold text-[#1C1613] hover:bg-[#EAE0D2] transition-all"
                >
                  <span>Request Developer Demo</span>
                </Link>
              </div>

              {/* Value Chain Summary Badge */}
              <div className="pt-4 border-t border-[#E8DEC8]/80 text-xs font-medium text-[#79553D] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#79553D]" />
                <span>PROPERTY → HOMEOWNER → VISUALIZE → DESIGN & PLAN → PROFESSIONAL ECOSYSTEM</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-7 relative">
              
              {/* Connected Top Arc Flow Cards */}
              <div className="hidden sm:flex items-center justify-between gap-2 mb-4 relative z-20 px-2">
                {/* Step 1: Your Property */}
                <div className="flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 px-3.5 shadow-md border border-[#E8DEC8] backdrop-blur-sm shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D]">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1613]">Your Property</div>
                    <div className="text-[10px] text-[#5A4F46]">Project Showcase</div>
                  </div>
                </div>

                <div className="text-[#8C7B6D]">→</div>

                {/* Step 2: Homeowner */}
                <div className="flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 px-3.5 shadow-md border border-[#E8DEC8] backdrop-blur-sm shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D]">
                    <Home className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1613]">Homeowner</div>
                    <div className="text-[10px] text-[#5A4F46]">Explore & Visualize</div>
                  </div>
                </div>

                <div className="text-[#8C7B6D]">→</div>

                {/* Step 3: Design & Plan */}
                <div className="flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 px-3.5 shadow-md border border-[#E8DEC8] backdrop-blur-sm shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D]">
                    <Box className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1613]">Design & Plan</div>
                    <div className="text-[10px] text-[#5A4F46]">Interiors & Finishes</div>
                  </div>
                </div>

                <div className="text-[#8C7B6D]">→</div>

                {/* Step 4: Professional Ecosystem */}
                <div className="flex items-center gap-2 rounded-2xl bg-white/95 p-2.5 px-3.5 shadow-md border border-[#E8DEC8] backdrop-blur-sm shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D]">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C1613]">Professional Ecosystem</div>
                    <div className="text-[10px] text-[#5A4F46]">Designers & Partners</div>
                  </div>
                </div>
              </div>

              {/* Main Background Property Visual + Floating Interactive Renders Overlay */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-2xl bg-[#1C1613]">
                {/* Background Development Image */}
                <div className="relative h-[380px] sm:h-[460px] w-full">
                  <Image
                    src="/images/builder_hero_property.jpg"
                    alt="Luxury Property Development Showcase"
                    fill
                    className="object-cover opacity-85"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Foreground Display Composition */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-4 sm:p-6 pb-6">
                  
                  {/* Floating Elements Container */}
                  <div className="w-full relative flex items-center justify-center">

                    {/* Card A (Left Floating): 3D Walkthrough */}
                    <div className="hidden sm:flex absolute left-2 bottom-6 z-20 items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-xl border border-[#E8DEC8] backdrop-blur-md">
                      <div className="relative h-12 w-16 rounded-xl overflow-hidden shrink-0 border border-[#E5DCD0]">
                        <Image
                          src="/images/hero/hero_empty_room.jpg"
                          alt="3D Walkthrough preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#79553D] text-white">
                            <Play className="h-3 w-3 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1C1613] block">3D Walkthrough</span>
                        <span className="text-[10px] text-[#79553D] font-medium">Interactive Tour</span>
                      </div>
                    </div>

                    {/* Center Desktop Monitor Frame */}
                    <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-4 border-[#2B231F] bg-[#1C1613] shadow-2xl">
                      <div className="relative h-44 sm:h-56 w-full">
                        <Image
                          src="/images/hero/hero_3d_furnished_room.jpg"
                          alt="Allure Interior 3D Experience"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                          <Sparkles className="h-3 w-3 text-[#EADECB]" />
                          <span>Allure 3D Spatial Engine</span>
                        </div>
                      </div>
                    </div>

                    {/* Card B (Right Floating): AI Moodboard */}
                    <div className="hidden sm:flex absolute -right-2 top-0 z-20 items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-xl border border-[#E8DEC8] backdrop-blur-md">
                      <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-[#E5DCD0]">
                        <Image
                          src="/images/hero/hero_moodboard.jpg"
                          alt="AI Moodboard palette"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1C1613] block">AI Moodboard →</span>
                        <span className="text-[10px] text-[#5A4F46]">Materials & Textures</span>
                      </div>
                    </div>

                    {/* Card C (Bottom Right Floating): Interior Options */}
                    <div className="hidden lg:flex absolute right-4 -bottom-2 z-20 items-center gap-2.5 rounded-2xl bg-white/95 p-2.5 pr-4 shadow-xl border border-[#E8DEC8] backdrop-blur-md">
                      <div className="relative h-10 w-14 rounded-xl overflow-hidden shrink-0 border border-[#E5DCD0]">
                        <Image
                          src="/images/hero/transform_after.jpg"
                          alt="Interior Options preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1C1613] block">Interior Options →</span>
                        <span className="text-[10px] text-[#5A4F46]">Custom Furniture</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          1. PROPERTY → HOMEOWNER → ALLURE
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Integration Architecture
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              PROPERTY → HOMEOWNER → ALLURE
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Show how the builder&apos;s property connects to the homeowner through Allure to streamline design exploration and professional discovery.
            </p>
          </div>

          {/* Connected Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-stretch max-w-6xl mx-auto mb-10">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-2 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-[#EADECB] text-[#79553D] flex items-center justify-center font-bold text-sm mb-1">
                1
              </div>
              <h4 className="font-bold text-sm text-[#1C1613]">Builder Property</h4>
              <p className="text-[11px] text-[#5A4F46]">Booked units & developments</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-2 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-[#EADECB] text-[#79553D] flex items-center justify-center font-bold text-sm mb-1">
                2
              </div>
              <h4 className="font-bold text-sm text-[#1C1613]">Homeowner</h4>
              <p className="text-[11px] text-[#5A4F46]">Digital buyer onboarding</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#79553D] text-white text-center space-y-2 flex flex-col items-center justify-center shadow-md">
              <div className="h-10 w-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-sm mb-1">
                3
              </div>
              <h4 className="font-bold text-sm text-white">Allure Platform</h4>
              <p className="text-[11px] text-[#D5C7B5]">Spatial intelligence engine</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-2 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-[#EADECB] text-[#79553D] flex items-center justify-center font-bold text-sm mb-1">
                4
              </div>
              <h4 className="font-bold text-sm text-[#1C1613]">Visualization</h4>
              <p className="text-[11px] text-[#5A4F46]">Photorealistic 3D tours</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-2 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-[#EADECB] text-[#79553D] flex items-center justify-center font-bold text-sm mb-1">
                5
              </div>
              <h4 className="font-bold text-sm text-[#1C1613]">Design & Plan</h4>
              <p className="text-[11px] text-[#5A4F46]">Materials & room layouts</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-2 flex flex-col items-center justify-center">
              <div className="h-10 w-10 rounded-xl bg-[#EADECB] text-[#79553D] flex items-center justify-center font-bold text-sm mb-1">
                6
              </div>
              <h4 className="font-bold text-sm text-[#1C1613]">Pro Discovery</h4>
              <p className="text-[11px] text-[#5A4F46]">Matched design studios</p>
            </div>
          </div>

          <div className="text-center pt-4">
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
          2. BEFORE POSSESSION
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Pre-Handover Engagement
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Before Possession
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Explain how buyers can experience and visualize their future home long before physical possession.
            </p>
          </div>

          {/* 6 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Property Visualization", desc: "Interactive 3D representation of unit layouts and structural geometry." },
              { title: "3D Walkthroughs", desc: "Immersive 360° panoramic tours navigable directly in the browser." },
              { title: "Interior Visualization", desc: "Photorealistic material options tailored to developer project specs." },
              { title: "AI Moodboards", desc: "Instant visual style cards matched to buyer aesthetic preferences." },
              { title: "Finish & Material Exploration", desc: "Explore floorings, veneers, wall finishes, and fixture tones." },
              { title: "Space Planning", desc: "Digital floor layout previews and furniture clearance planning." },
            ].map((feat, i) => (
              <div key={i} className="p-7 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow">
                <CheckCircle2 className="h-7 w-7 text-[#79553D] mb-3" />
                <h4 className="font-bold text-lg text-[#1C1613]">{feat.title}</h4>
                <p className="text-xs text-[#5A4F46] mt-2 leading-relaxed font-normal">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Explore the Experience</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. AFTER POSSESSION
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Post-Handover Continuity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              After Possession
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Explain how Allure continues supporting the homeowner as buyers transition from possession to execution.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="mb-14 p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] max-w-5xl mx-auto shadow-xs">
            <div className="text-xs font-bold text-[#8C7B6D] uppercase tracking-wider mb-4 text-center">
              Post-Possession Execution Flow
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#1C1613]">
              <span className="px-4 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Possession</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-4 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Interior Planning</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-4 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Find Professionals</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-4 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Products & Materials</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-4 py-2.5 rounded-xl bg-[#79553D] text-white w-full text-center">Execution</span>
            </div>
          </div>

          {/* 7 Feature Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Interior Planning", desc: "Refine room specifications, bill of quantities, and spatial layouts." },
              { title: "Designer Discovery", desc: "Explore verified interior designer portfolios matched to unit types." },
              { title: "Professional Matching", desc: "Match homeowners with vetted architects and turnkey contractors." },
              { title: "Product Discovery", desc: "Select furniture, lighting, and decor aligned with 3D moodboards." },
              { title: "Material Discovery", desc: "Discover premium surfaces, veneers, microcements, and hardware." },
              { title: "Project Planning", desc: "Milestone schedule tracking for smooth site execution." },
              { title: "Execution Ecosystem", desc: "Seamless coordination with trusted supply chain partners." },
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <Compass className="h-6 w-6 text-[#79553D] mb-3" />
                <h4 className="font-bold text-base text-[#1C1613]">{pillar.title}</h4>
                <p className="text-xs text-[#5A4F46] mt-2 leading-relaxed font-normal">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. CURATED PROFESSIONAL ECOSYSTEM
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Vetted Quality Network
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Curated Professional Ecosystem
            </h2>
            <p className="text-lg text-[#1C1613] font-semibold mt-1">
              Connect homeowners with relevant professionals for their specific project.
            </p>
            <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
              Allure is not an uncontrolled mass marketplace. We maintain a curated network of verified design and execution partners.
            </p>
          </div>

          {/* Ecosystem Partners Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 max-w-6xl mx-auto">
            {[
              "Interior Designers",
              "Design Studios",
              "Architects",
              "Furniture Partners",
              "Material Partners",
              "Technology Partners",
            ].map((partner, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] text-center font-bold text-xs text-[#1C1613] shadow-xs"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. PARTNER REPORTING
         ================================================== */}
      <section className="py-20 bg-[#1C1613] text-white border-b border-[#38302A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8DEC8]">
              Analytics Dashboard
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Partner Reporting & Insights
            </h2>
            <p className="text-base text-[#D5C7B5] leading-relaxed font-normal">
              A premium builder dashboard offering visibility into homeowner activation, project creation, and professional matching.
            </p>
          </div>

          {/* Mock Dashboard UI */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#2B231F] border border-[#423730] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#38302A] pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E8DEC8] uppercase tracking-wider">
                <LineChart className="h-4 w-4 text-[#79553D]" />
                <span>Partner Reporting Metrics (UI Sample Data)</span>
              </div>
              <span className="text-[10px] font-mono text-[#A89A8C] bg-[#1C1613] px-2.5 py-1 rounded-md">
                PROJECT: GRAND HORIZON TOWERS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#1C1613] border border-[#38302A]">
                <span className="text-[10px] font-bold text-[#A89A8C] uppercase tracking-wider block">HOMEOWNERS INVITED</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">500</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1C1613] border border-[#38302A]">
                <span className="text-[10px] font-bold text-[#A89A8C] uppercase tracking-wider block">ACTIVATED</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">320</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1C1613] border border-[#38302A]">
                <span className="text-[10px] font-bold text-[#A89A8C] uppercase tracking-wider block">PROJECTS CREATED</span>
                <span className="text-2xl font-bold font-mono text-[#E8DEC8] mt-1 block">180</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1C1613] border border-[#38302A]">
                <span className="text-[10px] font-bold text-[#A89A8C] uppercase tracking-wider block">PRO MATCHES</span>
                <span className="text-2xl font-bold font-mono text-amber-300 mt-1 block">120</span>
              </div>
              <div className="p-4 rounded-xl bg-[#1C1613] border border-[#38302A] col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-[#A89A8C] uppercase tracking-wider block">QUALIFIED PROJECTS</span>
                <span className="text-2xl font-bold font-mono text-sky-400 mt-1 block">75</span>
              </div>
            </div>

            {/* Explicit Sample Data Notice */}
            <div className="p-3.5 rounded-xl bg-[#1C1613]/80 border border-[#38302A] text-center text-[11px] text-[#A89A8C]">
              <strong>Sample Data Notice:</strong> The numbers displayed above are illustrative UI placeholders only. Live analytics populate upon pilot project activation.
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. PARTNERSHIP GUARDRAILS
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Governance & Integrity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Clear Partnership Rules
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Every builder partnership should define how customers, data, branding, and commercial relationships are handled.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Customer Consent", desc: "Explicit opt-in protocols for digital onboarding and communications." },
              { title: "Data Sharing", desc: "Strict data privacy parameters governing buyer information access." },
              { title: "Attribution", desc: "Transparent attribution tracing buyer project journeys." },
              { title: "Branding", desc: "Co-branding standards preserving developer reputation and identity." },
              { title: "Commercial Rights", desc: "Clearly defined commercial terms without undisclosed fee structures." },
              { title: "Privacy", desc: "Enterprise-grade data encryption and compliance safeguards." },
              { title: "Partner Responsibilities", desc: "Defined operational SLAs and delivery expectations." },
              { title: "Data Ownership", desc: "Clear protocols regarding developer project and buyer analytics." },
            ].map((rule, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
                <Lock className="h-6 w-6 text-[#79553D] mb-3" />
                <h4 className="font-bold text-sm text-[#1C1613]">{rule.title}</h4>
                <p className="text-xs text-[#5A4F46] mt-1.5 leading-relaxed font-normal">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          7. PILOT MODEL
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Low-Risk Entry
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Start With a Pilot
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Builders can test Allure on one property/project before expanding across their portfolio.
            </p>
          </div>

          {/* Pilot Flow */}
          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] max-w-5xl mx-auto shadow-xs">
            <div className="text-xs font-bold text-[#8C7B6D] uppercase tracking-wider mb-6 text-center">
              Pilot Expansion Architecture
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#1C1613]">
              <span className="px-3.5 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">One Builder</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-3.5 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">One Property</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-3.5 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Selected Homeowners</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-3.5 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Allure Experience</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-3.5 py-2.5 rounded-xl bg-[#F6EFE6] border border-[#E5DCD0] w-full text-center">Measure Results</span>
              <ChevronRight className="h-4 w-4 text-[#8C7B6D] rotate-90 sm:rotate-0 shrink-0" />
              <span className="px-3.5 py-2.5 rounded-xl bg-[#79553D] text-white w-full text-center">Expand</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. BUILDER BENEFITS
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              Strategic Advantages
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Builder Benefits
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Enhance buyer value propositions with a modern digital homeowner experience.
            </p>
          </div>

          {/* 6 Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Better Buyer Experience</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Help buyers visualize and understand their future space long before physical handover.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Pre-Possession Engagement</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Create meaningful digital engagement during the waiting period before property handover.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Post-Possession Continuity</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Continue supporting homeowners with design planning and execution after possession.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Curated Professional Ecosystem</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Connect homeowners with relevant, verified design and execution professionals.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Project Insights</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Provide visibility into activation, engagement, matching, and project activity metrics.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] hover:shadow-md transition-shadow space-y-3">
              <h3 className="font-bold text-lg text-[#1C1613]">Scalable Partnership Model</h3>
              <p className="text-sm text-[#5A4F46] leading-relaxed font-normal">
                Start with a pilot project and expand across portfolio based on measurable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FINAL CTA
         ================================================== */}
      <section className="py-24 bg-[#1C1613] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8DEC8]">
            Get Started
          </span>

          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-white">
            Build a More Connected Homeowner Experience
          </h2>

          <p className="text-base sm:text-lg text-[#D5C7B5] leading-relaxed font-normal">
            Explore how Allure can become part of your property&apos;s digital homeowner journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#79553D] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#64442F] transition-all"
            >
              <span>Explore a Builder Partnership</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/request-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              <span>Request Developer Demo</span>
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
              <Link href="/#for-designers" className="hover:text-white transition-colors">For Designers</Link>
              <Link href="/builders" className="hover:text-white transition-colors font-bold text-white">For Builders</Link>
              <Link href="/request-demo" className="hover:text-white transition-colors">Request Demo</Link>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-4">
            <p>© {new Date().getFullYear()} ALLURE Spatial Intelligence Platform. All rights reserved.</p>
            <p>Designed for real-estate developers and homeowner journeys.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
