"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  Cpu,
  Building2,
  CheckCircle2,
  Users,
  Target,
  ChevronRight,
  ShieldCheck,
  Globe,
  Clock,
  Layout,
  Award,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      {/* Header Navigation */}
      <Navbar />

      {/* ==================================================
          1. HERO SECTION — "From Rooms to the Physical World"
         ================================================== */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] uppercase tracking-widest shadow-xs">
              <Compass className="h-4 w-4" />
              <span>OUR VISION & MISSION</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#1C1613] tracking-tight">
              From Rooms to the Physical World
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#5A4F46] max-w-3xl mx-auto leading-relaxed font-normal">
              Allure was founded on a singular premise: human imagination should not be trapped behind technical CAD software or static blueprints. We are building the spatial intelligence infrastructure connecting digital vision directly to physical reality.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/request-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#79553D] px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-[#64442F] hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Partner With Us</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#D5C7B5] bg-[#F6EFE6] px-8 py-4 text-base font-semibold text-[#1C1613] hover:bg-[#EAE0D2] transition-all"
              >
                <span>Try Allure Creation Studio</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. WHY ALLURE EXISTS
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              THE PURPOSE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Why Allure Exists
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              The built environment is one of humanity&apos;s largest industries, yet the process of conceptualizing, deciding on, and executing spaces remains deeply fragmented.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] shadow-xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EADECB] text-[#79553D]">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1613]">The Visualization Gap</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Homeowners struggle to interpret 2D blueprints or raw floor plans. This uncertainty causes anxiety, delayed decisions, and unexpected change orders during execution.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] shadow-xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EADECB] text-[#79553D]">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1613]">Design Friction</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Interior designers spend up to 80% of their billable hours configuring 3D renders and tweaking scene files rather than focusing on spatial experience and client relationships.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] shadow-xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EADECB] text-[#79553D]">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1613]">Disconnected Handover</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Property developers lack meaningful digital engagement tools during the long wait between booking and possession, leading to missed post-handover ecosystem opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. UNIVERSAL SPATIAL ENGINE
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              CORE TECHNOLOGY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Universal Spatial Engine
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Allure powers instant, web-native 3D spatial transformation through our unified graphics and material synthesis engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <Cpu className="h-8 w-8 text-[#79553D]" />
              <h4 className="font-bold text-base text-[#1C1613]">Multi-Modal Ingestion</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Accepts room photos, 2D floor plans, and architectural CAD drawings to construct 3D spatial meshes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <Sparkles className="h-8 w-8 text-[#79553D]" />
              <h4 className="font-bold text-base text-[#1C1613]">Generative Synthesis</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Synthesizes realistic material palettes, lighting conditions, and aesthetic moodboards in sub-seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <Layout className="h-8 w-8 text-[#79553D]" />
              <h4 className="font-bold text-base text-[#1C1613]">Web-Native 3D Renderer</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Lightweight WebGL/Three.js panoramic walkthrough engine running smoothly across desktop and mobile devices.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <Target className="h-8 w-8 text-[#79553D]" />
              <h4 className="font-bold text-base text-[#1C1613]">Automated BOQ Takeoffs</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Extracts surface square footages, tile quantities, and paint volumes directly into exportable site schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. PRODUCT ROADMAP
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              STRATEGIC HORIZON
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Product Roadmap
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Our multi-phase journey from digital visual concept generation to connected physical execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Phase 1 */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] relative space-y-3">
              <span className="text-[10px] font-bold text-[#79553D] bg-[#EADECB] px-3 py-1 rounded-full uppercase tracking-wider">
                Phase 1 · Live
              </span>
              <h4 className="font-bold text-lg text-[#1C1613]">Spatial Concept Studio</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Instant 3D room walkthroughs, AI material moodboards, and interactive aesthetic style exploration.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] relative space-y-3">
              <span className="text-[10px] font-bold text-[#79553D] bg-[#EADECB] px-3 py-1 rounded-full uppercase tracking-wider">
                Phase 2 · Live
              </span>
              <h4 className="font-bold text-lg text-[#1C1613]">Connected Ecosystem</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Developer pre-possession portals, curated designer matching, and automated BOQ site estimates.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] relative space-y-3">
              <span className="text-[10px] font-bold text-[#79553D] bg-[#EADECB] px-3 py-1 rounded-full uppercase tracking-wider">
                Phase 3 · In Development
              </span>
              <h4 className="font-bold text-lg text-[#1C1613]">AR & Site Projection</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                On-site Augmented Reality projections overlaid directly onto physical room walls and floor slabs.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] relative space-y-3">
              <span className="text-[10px] font-bold text-[#79553D] bg-[#EADECB] px-3 py-1 rounded-full uppercase tracking-wider">
                Phase 4 · Future Horizon
              </span>
              <h4 className="font-bold text-lg text-[#1C1613]">Physical Synthesis</h4>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Automated modular millwork fabrication triggers and full digital twin property lifecycle management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. WHERE WE ARE TODAY
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              CURRENT MILESTONES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Where We Are Today
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Active traction across property hubs, design studios, and residential developer projects.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D] block">10,000+</span>
              <span className="text-xs font-bold text-[#1C1613] mt-1 block">Spaces Rendered</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D] block">&lt; 30s</span>
              <span className="text-xs font-bold text-[#1C1613] mt-1 block">Spatial Generation</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D] block">5 Hubs</span>
              <span className="text-xs font-bold text-[#1C1613] mt-1 block">Patna, Indore, Bhubaneswar...</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
              <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D] block">2,400+</span>
              <span className="text-xs font-bold text-[#1C1613] mt-1 block">Active Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. MEET THE TEAM
         ================================================== */}
      <section className="py-20 bg-[#F6EFE6] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              THE LEADERSHIP
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              Meet the Team
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              A cross-disciplinary team of spatial AI researchers, architectural designers, and software engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-[#EADECB] text-[#79553D] mx-auto flex items-center justify-center font-bold text-xl">
                AM
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1C1613]">Aarav Mehta</h4>
                <p className="text-xs font-semibold text-[#79553D]">Founder & CEO</p>
              </div>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Former architectural technology lead passionate about democratic spatial design tools.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-[#EADECB] text-[#79553D] mx-auto flex items-center justify-center font-bold text-xl">
                ER
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1C1613]">Elena Rostova</h4>
                <p className="text-xs font-semibold text-[#79553D]">Head of Spatial AI</p>
              </div>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Generative computer graphics researcher specializing in real-time WebGL synthesis.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-[#EADECB] text-[#79553D] mx-auto flex items-center justify-center font-bold text-xl">
                MV
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1C1613]">Marcus Vance</h4>
                <p className="text-xs font-semibold text-[#79553D]">Director of Partnerships</p>
              </div>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                15+ years in real estate development, property tech, and builder ecosystem strategy.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-[#EADECB] text-[#79553D] mx-auto flex items-center justify-center font-bold text-xl">
                PS
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#1C1613]">Priya Sharma</h4>
                <p className="text-xs font-semibold text-[#79553D]">Lead Design Curator</p>
              </div>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Interior architect guiding material curation, lighting registers, and spatial aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. WHAT WE'RE WORKING TO PROVE
         ================================================== */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#79553D]">
              CORE BENCHMARKS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
              What We&apos;re Working to Prove
            </h2>
            <p className="text-base text-[#5A4F46] leading-relaxed font-normal">
              Three fundamental hypotheses guiding our engineering and partner deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <div className="text-xs font-bold text-[#79553D] uppercase tracking-wider">Hypothesis 01</div>
              <h3 className="font-bold text-xl text-[#1C1613]">75% Faster Client Decisions</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                By enabling instant, interactive 3D spatial exploration in browser, homeowners make confident design sign-offs in days rather than weeks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <div className="text-xs font-bold text-[#79553D] uppercase tracking-wider">Hypothesis 02</div>
              <h3 className="font-bold text-xl text-[#1C1613]">Zero Pre-Possession Anxiety</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Giving property buyers 3D walkthrough access 90 days before handover transforms passive waiting into active, delighted engagement.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] space-y-3">
              <div className="text-xs font-bold text-[#79553D] uppercase tracking-wider">Hypothesis 03</div>
              <h3 className="font-bold text-xl text-[#1C1613]">100% Budget Transparency</h3>
              <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                Automated material BOQ takeoffs prevent unexpected site expenses and eliminate friction between homeowners, designers, and contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FINAL CTA — Build / Partner With Us
         ================================================== */}
      <section className="py-24 bg-[#1C1613] text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8DEC8]">
            JOIN THE ECOSYSTEM
          </span>

          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-white">
            Build / Partner With Us
          </h2>

          <p className="text-base sm:text-lg text-[#D5C7B5] leading-relaxed font-normal">
            Join property developers, design studios, and homeowners shaping the future of spatial intelligence.
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
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              <span>Launch Studio Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FOOTER
         ================================================== */}
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
              <Link href="/builders" className="hover:text-white transition-colors">For Builders</Link>
              <Link href="/about" className="hover:text-white transition-colors font-bold text-white">About</Link>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-4">
            <p>© {new Date().getFullYear()} ALLURE Spatial Intelligence Platform. All rights reserved.</p>
            <p>From Rooms to the Physical World.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
