"use client";

import { Home, User, ArrowRight } from "lucide-react";

interface LandingPathsProps {
  onSelectPath: (path: "space" | "designer") => void;
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

        {/* 2 Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Path Card 1: I Have a Space */}
          <div
            onClick={() => onSelectPath("space")}
            className="group relative overflow-hidden rounded-3xl bg-[#F6EFE6] p-8 sm:p-10 border border-[#E8DEC8] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#D5C7B5] hover:bg-[#F3EAThread] cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 flex items-start gap-5">
              {/* Home Icon Container */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#79553D] shadow-xs group-hover:scale-105 transition-transform">
                <Home className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#1C1613] group-hover:text-[#79553D] transition-colors">
                  I Have a Space
                </h3>
                <p className="text-sm sm:text-base text-[#5A4F46] mt-1 font-normal">
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

            {/* Background Line Art Illustration (Right Side) */}
            <div className="absolute right-3 bottom-0 w-44 sm:w-52 h-36 opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none">
              <svg viewBox="0 0 200 150" fill="none" stroke="#79553D" strokeWidth="1.5" className="w-full h-full">
                {/* Framed picture on wall */}
                <rect x="130" y="10" width="45" height="35" rx="3" strokeDasharray="2 2" />
                <rect x="135" y="15" width="35" height="25" rx="2" />
                
                {/* Sofa */}
                <path d="M70,90 L180,90 C185,90 190,95 190,100 L190,130 C190,135 185,140 180,140 L70,140 C65,140 60,135 60,130 L60,100 C60,95 65,90 70,90 Z" />
                <path d="M75,90 L75,70 C75,65 80,60 85,60 L165,60 C170,60 175,65 175,70 L175,90" />
                {/* Cushions */}
                <line x1="125" y1="90" x2="125" y2="140" />

                {/* Floor Lamp */}
                <line x1="40" y1="50" x2="40" y2="140" />
                <path d="M25,50 L55,50 L48,30 L32,30 Z" />
                <path d="M25,140 L55,140" />

                {/* Plant pot */}
                <path d="M10,110 L25,110 L22,140 L13,140 Z" />
                <path d="M17,110 C10,95 0,90 5,80 C15,90 18,105 17,110 Z" />
                <path d="M17,110 C25,95 35,90 30,80 C20,90 18,105 17,110 Z" />
              </svg>
            </div>
          </div>

          {/* Path Card 2: I'm a Designer */}
          <div
            onClick={() => onSelectPath("designer")}
            className="group relative overflow-hidden rounded-3xl bg-[#F6EFE6] p-8 sm:p-10 border border-[#E8DEC8] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#D5C7B5] hover:bg-[#F3EAThread] cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 flex items-start gap-5">
              {/* User/Designer Icon Container */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8DCCB] text-[#79553D] shadow-xs group-hover:scale-105 transition-transform">
                <User className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#1C1613] group-hover:text-[#79553D] transition-colors">
                  I&apos;m a Designer
                </h3>
                <p className="text-sm sm:text-base text-[#5A4F46] mt-1 font-normal">
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

            {/* Background Line Art Illustration (Right Side) */}
            <div className="absolute right-3 bottom-0 w-44 sm:w-52 h-36 opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none">
              <svg viewBox="0 0 200 150" fill="none" stroke="#79553D" strokeWidth="1.5" className="w-full h-full">
                {/* Desk */}
                <line x1="50" y1="100" x2="190" y2="100" />
                <line x1="60" y1="100" x2="60" y2="140" />
                <line x1="180" y1="100" x2="180" y2="140" />

                {/* Monitor */}
                <rect x="90" y="55" width="55" height="35" rx="3" />
                <path d="M117,90 L117,100 M105,100 L130,100" />
                
                {/* Chair */}
                <path d="M145,95 L145,120 L165,120 C170,120 170,95 165,95 Z" />
                <line x1="155" y1="120" x2="155" y2="140" />
                <line x1="145" y1="140" x2="165" y2="140" />

                {/* Desk Lamp */}
                <path d="M65,100 Q70,75 80,75 L85,80" />
                
                {/* Framed blueprint/drawing behind desk */}
                <rect x="70" y="10" width="40" height="35" rx="2" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
