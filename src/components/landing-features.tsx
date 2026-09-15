"use client";

import { Sparkles, Box, Users, Check } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-powered visualization",
    },
    {
      icon: Box,
      title: "From inspiration to 3D",
    },
    {
      icon: Users,
      title: "Share with designers",
    },
    {
      icon: Check,
      title: "No commitment to start",
    },
  ];

  return (
    <section className="py-10 border-t border-[#EFE7DC] bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 p-2 rounded-2xl transition-all hover:bg-[#F4ECE0]/60"
              >
                {/* Round soft brown icon circle */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EADECB] text-[#79553D] shadow-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm sm:text-base font-medium text-[#2C241E] leading-snug">
                  {feature.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
