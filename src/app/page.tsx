"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingTransformSlider } from "@/components/landing-transform-slider";
import { LandingPaths } from "@/components/landing-paths";
import { LandingStyleExplorer } from "@/components/landing-style-explorer";
import { LandingEstimator } from "@/components/landing-estimator";
import { LandingFeatures } from "@/components/landing-features";
import { WatchWalkthroughModal } from "@/components/watch-walkthrough-modal";
import { WalkthroughStudio } from "@/features/walkthrough-studio/components/walkthrough-studio";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Page() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [, setSelectedPath] = useState<"space" | "designer" | null>(null);

  const scrollToStudio = () => {
    const studioEl = document.getElementById("walkthrough-studio");
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPath = (path: "space" | "designer") => {
    setSelectedPath(path);
    scrollToStudio();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      {/* Top Navbar Header */}
      <Navbar onGetStarted={scrollToStudio} />

      {/* Hero Section */}
      <LandingHero
        onGetStarted={scrollToStudio}
        onWatchWalkthrough={() => setIsVideoModalOpen(true)}
      />

      {/* Interactive Before & After Room Transformation Slider */}
      <LandingTransformSlider onStartStudio={scrollToStudio} />

      {/* Path Selection: "What are you here for?" */}
      <LandingPaths onSelectPath={handleSelectPath} />

      {/* Interactive Aesthetic Style Explorer */}
      <LandingStyleExplorer onSelectStyle={scrollToStudio} />

      {/* Live Scope Calculator & Metrics */}
      <LandingEstimator onStartStudio={scrollToStudio} />

      {/* Bottom Feature Highlights Bar */}
      <LandingFeatures />

      {/* Interactive Walkthrough Studio Container */}
      <section id="walkthrough-studio" className="py-16 border-t border-[#EFE7DC] bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#79553D] text-white shadow-md">
                <Sparkles className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#1C1613]">
                  Allure Creation Studio
                </h3>
                <p className="text-sm text-[#5A4F46] mt-0.5 font-medium">
                  Upload room photos & brief to generate your AI moodboard and 3D walkthrough
                </p>
              </div>
            </div>

            <button
              onClick={scrollToStudio}
              className="flex items-center gap-2 rounded-full bg-[#79553D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#64442F] transition-all shrink-0 shadow-sm"
            >
              <span>Start New Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Embedded Walkthrough Studio Flow */}
        <WalkthroughStudio />
      </section>

      {/* Info Section: For Homeowners */}
      <section id="for-homeowners" className="py-20 bg-[#F6EFE6] border-t border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#79553D]">
            For Homeowners
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-2">
            Bring your vision to life before spending on construction
          </h3>
          <p className="text-base text-[#5A4F46] mt-3 leading-relaxed">
            Allure gives you absolute clarity on colors, materials, furniture layouts, and spatial feel with instant AI moodboards and 3D walkthroughs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-left shadow-xs hover:shadow-md transition-shadow">
              <CheckCircle2 className="h-8 w-8 text-[#79553D] mb-3" />
              <h4 className="font-bold text-lg text-[#1C1613]">No Guesswork</h4>
              <p className="text-xs text-[#5A4F46] mt-1.5 leading-relaxed">See exact room dimensions, lighting, and textures before committing.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-left shadow-xs hover:shadow-md transition-shadow">
              <ShieldCheck className="h-8 w-8 text-[#79553D] mb-3" />
              <h4 className="font-bold text-lg text-[#1C1613]">Risk Free</h4>
              <p className="text-xs text-[#5A4F46] mt-1.5 leading-relaxed">Free instant moodboard generation with full customization control.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] text-left shadow-xs hover:shadow-md transition-shadow">
              <HeartHandshake className="h-8 w-8 text-[#79553D] mb-3" />
              <h4 className="font-bold text-lg text-[#1C1613]">Shareable</h4>
              <p className="text-xs text-[#5A4F46] mt-1.5 leading-relaxed">Send interactive 3D links directly to your family, contractors, or designer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section: For Designers */}
      <section id="for-designers" className="py-20 bg-[#FAF7F2] border-t border-[#E8DEC8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#79553D]">
            For Designers
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-2">
            Accelerate client sign-offs with instant 3D presentations
          </h3>
          <p className="text-base text-[#5A4F46] mt-3 leading-relaxed">
            Turn initial client photos into compelling 3D concepts in minutes rather than days. Present interactive panoramic tours directly in the browser.
          </p>
          <div className="mt-8">
            <button
              onClick={scrollToStudio}
              className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-[#64442F] transition-all"
            >
              <span>Create Designer Project</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-14 bg-[#1C1613] text-[#EFE6DA]">
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
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#for-homeowners" className="hover:text-white transition-colors">For Homeowners</a>
              <a href="#for-designers" className="hover:text-white transition-colors">For Designers</a>
              <a href="#walkthrough-studio" className="hover:text-white transition-colors">Studio</a>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-4">
            <p>© {new Date().getFullYear()} ALLURE Walkthrough Engine. All rights reserved.</p>
            <p>Designed for immersive interior visual concepts.</p>
          </div>
        </div>
      </footer>

      {/* Watch Walkthrough Video/3D Preview Modal */}
      <WatchWalkthroughModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartStudio={scrollToStudio}
      />
    </div>
  );
}
