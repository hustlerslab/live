"use client";

import Image from "next/image";
import { ArrowRight, Play, Home, Sparkles, Box, Upload } from "lucide-react";

interface LandingHeroProps {
  onGetStarted: () => void;
  onWatchWalkthrough: () => void;
}

export function LandingHero({ onGetStarted, onWatchWalkthrough }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Call-to-Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6 z-10">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-6 bg-[#A38D79]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8C7461]">
                SEE IT BEFORE YOU COMMIT
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] text-[#1C1613] tracking-tight">
              Visualize your{" "}
              <span className="italic font-normal text-[#79553D]">dream space</span>
              <br />
              before you build it.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A4F46] max-w-md leading-relaxed font-normal">
              Turn your ideas, inspiration, and room images into beautiful visual concepts and immersive 3D spaces.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="group flex items-center gap-2.5 rounded-full bg-[#79553D] px-7 py-3.5 text-base font-medium text-white shadow-md transition-all hover:bg-[#64442F] hover:shadow-lg active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onWatchWalkthrough}
                className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-medium text-[#1C1613] border border-[#E5DCD0] shadow-sm transition-all hover:bg-[#F9F5EF] hover:border-[#D5C7B5] active:scale-[0.98]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#79553D] text-white shadow-xs transition-transform group-hover:scale-105">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Walkthrough</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Visual Cards Showcase Flow */}
          <div className="lg:col-span-7 relative flex justify-center items-center py-6">
            
            {/* Background Decorative Shapes & Dot Matrix */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
              {/* Soft warm beige background blob */}
              <div className="w-[520px] h-[380px] rounded-full bg-[#EFE6DA]/70 blur-2xl transform -rotate-12 scale-110" />
              
              {/* Secondary circular shape */}
              <div className="absolute right-8 top-6 w-72 h-72 rounded-full bg-[#E8DEC8]/50 blur-xl" />

              {/* Dot matrix grid decoration top left */}
              <div className="absolute left-10 top-2 w-28 h-28 opacity-40">
                <svg width="100" height="100" fill="none">
                  <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill="#8C7461" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#dot-pattern)" />
                </svg>
              </div>
            </div>

            {/* Handwritten Note Annotation top right */}
            <div className="absolute -top-6 right-2 sm:right-8 z-30 flex items-center gap-2 pointer-events-none">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#5C3D28] -rotate-6 tracking-wide drop-shadow-xs">
                From idea to immersive 3D
              </span>
              <svg className="w-10 h-10 text-[#79553D] -rotate-12 translate-y-2" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6,6 Q28,4 40,30 M40,30 L32,24 M40,30 L46,20" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Floating Visual Cards Container */}
            <div className="relative flex items-center justify-center w-full max-w-2xl px-2">
              
              {/* Card 1: Your Room (Left Tilted) */}
              <div className="relative z-10 w-44 sm:w-56 lg:w-60 transform -rotate-6 hover:rotate-0 transition-transform duration-500 ease-out hover:z-30 cursor-pointer shadow-xl rounded-2xl overflow-hidden bg-white p-2 border border-[#EADFCF]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src="/images/hero/hero_empty_room.jpg"
                    alt="Your Room"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xs px-3.5 py-1.5 shadow-md border border-[#EBE2D5] text-xs font-semibold text-[#2C241E] whitespace-nowrap">
                  <Home className="h-3.5 w-3.5 text-[#79553D]" />
                  <span>Your Room</span>
                  <Upload className="h-3 w-3 text-[#8C7461]" />
                </div>
              </div>

              {/* Curved Connector Line 1 (Card 1 -> Card 2) */}
              <div className="absolute left-[26%] bottom-[15%] z-20 pointer-events-none hidden sm:block">
                <svg className="w-20 h-10 text-[#79553D]" viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M10,10 Q40,35 70,20" strokeDasharray="3 3" strokeLinecap="round" />
                  <path d="M70,20 L62,18 M70,20 L66,26" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Card 2: AI Moodboard (Center Elevated & Tilted) */}
              <div className="relative z-20 w-48 sm:w-60 lg:w-64 -ml-6 sm:-ml-8 transform rotate-2 -translate-y-4 hover:rotate-0 transition-transform duration-500 ease-out hover:z-30 cursor-pointer shadow-2xl rounded-2xl overflow-hidden bg-white p-2 border border-[#EADFCF]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src="/images/hero/hero_moodboard.jpg"
                    alt="AI Moodboard"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xs px-4 py-1.5 shadow-md border border-[#EBE2D5] text-xs font-semibold text-[#2C241E] whitespace-nowrap">
                  <Sparkles className="h-3.5 w-3.5 text-[#79553D]" />
                  <span>AI Moodboard</span>
                  <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                </div>
              </div>

              {/* Curved Connector Line 2 (Card 2 -> Card 3) */}
              <div className="absolute right-[25%] bottom-[12%] z-20 pointer-events-none hidden sm:block">
                <svg className="w-20 h-10 text-[#79553D]" viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M10,20 Q40,38 70,15" strokeDasharray="3 3" strokeLinecap="round" />
                  <path d="M70,15 L62,14 M70,15 L65,22" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Card 3: Your 3D Space (Right Tilted) */}
              <div className="relative z-10 w-52 sm:w-64 lg:w-72 -ml-6 sm:-ml-8 transform rotate-6 translate-y-4 hover:rotate-0 transition-transform duration-500 ease-out hover:z-30 cursor-pointer shadow-2xl rounded-2xl overflow-hidden bg-white p-2 border border-[#EADFCF]">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src="/images/hero/hero_3d_furnished_room.jpg"
                    alt="Your 3D Space"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-xs px-4 py-1.5 shadow-md border border-[#EBE2D5] text-xs font-semibold text-[#2C241E] whitespace-nowrap">
                  <Box className="h-3.5 w-3.5 text-[#79553D]" />
                  <span>Your 3D Space</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#79553D]" />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
