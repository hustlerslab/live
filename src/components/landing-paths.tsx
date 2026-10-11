"use client";

import Link from "next/link";
import { Home, User, HardHat, ArrowRight } from "lucide-react";

interface LandingPathsProps {
  onSelectPath: (path: "space" | "designer" | "builder") => void;
}

export function LandingPaths({ onSelectPath }: LandingPathsProps) {
  return (
    <section id="how-it-works" className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
            What are you here for?
          </h2>
          <p className="text-base text-[#5A4F46] mt-2 font-normal">
            Choose your path and start creating with Allure.
          </p>
        </div>

        {/* 3 Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Path Card 1: I Have a Space */}
          <div
            onClick={() => onSelectPath("space")}
            className="group relative overflow-hidden rounded-3xl bg-[#F6EFE6] p-8 border border-[#E8DEC8] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#D5C7B5] hover:bg-[#F3EAThread] cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 flex items-start gap-4">
              {/* Home Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#79553D] shadow-xs group-hover:scale-105 transition-transform">
                <Home className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1613] group-hover:text-[#79553D] transition-colors">
                  I Have a Space
                </h3>
                <p className="text-sm text-[#5A4F46] mt-1 font-normal">
                  Explore ideas for my home
                </p>
              </div>
            </div>

            {/* Action Button at bottom left */}
            <div className="relative z-10 mt-8">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#79553D] text-white shadow-xs group-hover:bg-[#64442F] group-hover:scale-110 transition-all">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Background Line Art Illustration */}
            <div className="absolute right-3 bottom-0 w-40 h-32 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none">
              <svg viewBox="0 0 200 150" fill="none" stroke="#79553D" strokeWidth="1.5" className="w-full h-full">
                <rect x="130" y="10" width="45" height="35" rx="3" strokeDasharray="2 2" />
                <rect x="135" y="15" width="35" height="25" rx="2" />
                <path d="M70,90 L180,90 C185,90 190,95 190,100 L190,130 C190,135 185,140 180,140 L70,140 C65,140 60,135 60,130 L60,100 C60,95 65,90 70,90 Z" />
                <path d="M75,90 L75,70 C75,65 80,60 85,60 L165,60 C170,60 175,65 175,70 L175,90" />
                <line x1="125" y1="90" x2="125" y2="140" />
              </svg>
            </div>
          </div>

          {/* Path Card 2: I'm a Designer -> /designers */}
          <Link
            href="/designers"
            onClick={() => onSelectPath("designer")}
            className="group relative overflow-hidden rounded-3xl bg-[#F6EFE6] p-8 border border-[#E8DEC8] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#D5C7B5] hover:bg-[#F3EAThread] cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 flex items-start gap-4">
              {/* User/Designer Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#79553D] shadow-xs group-hover:scale-105 transition-transform">
                <User className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1613] group-hover:text-[#79553D] transition-colors">
                  I&apos;m a Designer
                </h3>
                <p className="text-sm text-[#5A4F46] mt-1 font-normal">
                  Create and present better designs
                </p>
              </div>
            </div>

            {/* Action Button at bottom left */}
            <div className="relative z-10 mt-8">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#79553D] text-white shadow-xs group-hover:bg-[#64442F] group-hover:scale-110 transition-all">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Background Line Art Illustration */}
            <div className="absolute right-3 bottom-0 w-40 h-32 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none">
              <svg viewBox="0 0 200 150" fill="none" stroke="#79553D" strokeWidth="1.5" className="w-full h-full">
                <line x1="50" y1="100" x2="190" y2="100" />
                <line x1="60" y1="100" x2="60" y2="140" />
                <line x1="180" y1="100" x2="180" y2="140" />
                <rect x="90" y="55" width="55" height="35" rx="3" />
                <path d="M117,90 L117,100 M105,100 L130,100" />
              </svg>
            </div>
          </Link>

          {/* Path Card 3: I'm a Builder -> /builders */}
          <Link
            href="/builders"
            onClick={() => onSelectPath("builder")}
            className="group relative overflow-hidden rounded-3xl bg-[#F6EFE6] p-8 border border-[#E8DEC8] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#D5C7B5] hover:bg-[#F3EAThread] cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 flex items-start gap-4">
              {/* Builder Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#79553D] shadow-xs group-hover:scale-105 transition-transform">
                <HardHat className="h-6 w-6" />
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1C1613] group-hover:text-[#79553D] transition-colors">
                  I&apos;m a Builder
                </h3>
                <p className="text-sm text-[#5A4F46] mt-1 font-normal">
                  Estimate materials & manage site builds
                </p>
              </div>
            </div>

            {/* Action Button at bottom left */}
            <div className="relative z-10 mt-8">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#79553D] text-white shadow-xs group-hover:bg-[#64442F] group-hover:scale-110 transition-all">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>

            {/* Background Line Art Illustration (Blueprint/Construction) */}
            <div className="absolute right-3 bottom-0 w-40 h-32 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none">
              <svg viewBox="0 0 200 150" fill="none" stroke="#79553D" strokeWidth="1.5" className="w-full h-full">
                {/* Crane / Building Structure */}
                <path d="M40,140 L40,30 L110,30 M40,50 L110,30 M40,70 L110,30" />
                <rect x="115" y="60" width="70" height="80" rx="2" strokeDasharray="3 3" />
                <line x1="115" y1="85" x2="185" y2="85" />
                <line x1="115" y1="110" x2="185" y2="110" />
                <line x1="150" y1="60" x2="150" y2="140" />
              </svg>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

