"use client";

import { useState } from "react";
import { Sparkles, Layers, Zap, Camera, CheckCircle2, ArrowRight } from "lucide-react";

export function LandingEstimator({ onStartStudio }: { onStartStudio: () => void }) {
  const [selectedRoom, setSelectedRoom] = useState("living");
  const [selectedProfile, setSelectedProfile] = useState("4k");

  const roomOptions = [
    { id: "living", name: "Living Room", icon: "🛋️" },
    { id: "bedroom", name: "Master Bedroom", icon: "🛏️" },
    { id: "kitchen", name: "Modern Kitchen", icon: "🍳" },
    { id: "dining", name: "Dining Hall", icon: "🍽️" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Metric Cards Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] text-center shadow-xs hover:shadow-md transition-shadow">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D]">
              1,420+
            </span>
            <p className="text-xs sm:text-sm text-[#5A4F46] mt-1 font-medium">
              Spaces Transformed
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] text-center shadow-xs hover:shadow-md transition-shadow">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D]">
              99.4%
            </span>
            <p className="text-xs sm:text-sm text-[#5A4F46] mt-1 font-medium">
              Spatial Accuracy
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] text-center shadow-xs hover:shadow-md transition-shadow">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D]">
              &lt; 60s
            </span>
            <p className="text-xs sm:text-sm text-[#5A4F46] mt-1 font-medium">
              Generation Time
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] text-center shadow-xs hover:shadow-md transition-shadow">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#79553D]">
              4.9 ★
            </span>
            <p className="text-xs sm:text-sm text-[#5A4F46] mt-1 font-medium">
              Designer Satisfaction
            </p>
          </div>
        </div>

        {/* Interactive Scope Calculator */}
        <div className="rounded-3xl bg-[#F6EFE6] p-8 sm:p-10 border border-[#E8DEC8] shadow-xl max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#79553D] font-semibold">
              Interactive Scope Calculator
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1613] mt-1">
              Select your room type & output preference.
            </h3>
          </div>

          {/* Room Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {roomOptions.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all ${
                  selectedRoom === room.id
                    ? "bg-[#79553D] text-white border-[#79553D] shadow-md scale-105"
                    : "bg-white text-[#2C241E] border-[#E8DEC8] hover:bg-[#FAF7F2]"
                }`}
              >
                <span className="text-2xl">{room.icon}</span>
                <span className="text-xs font-semibold">{room.name}</span>
              </button>
            ))}
          </div>

          {/* Render Profile Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div
              onClick={() => setSelectedProfile("preview")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedProfile === "preview"
                  ? "bg-white border-[#79553D] shadow-md ring-2 ring-[#79553D]/20"
                  : "bg-white/60 border-[#E8DEC8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-[#1C1613]">
                  <Zap className="h-4 w-4 text-[#79553D]" />
                  <span>Real-time Preview (Eevee Engine)</span>
                </div>
                {selectedProfile === "preview" && <CheckCircle2 className="h-5 w-5 text-[#79553D]" />}
              </div>
              <p className="text-xs text-[#5A4F46] mt-2">
                Instant interactive web walkthrough with 960x540 viewport lighting. Fast and free.
              </p>
            </div>

            <div
              onClick={() => setSelectedProfile("4k")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedProfile === "4k"
                  ? "bg-white border-[#79553D] shadow-md ring-2 ring-[#79553D]/20"
                  : "bg-white/60 border-[#E8DEC8] hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-[#1C1613]">
                  <Camera className="h-4 w-4 text-[#79553D]" />
                  <span>Photorealistic 4K (Cycles Engine)</span>
                </div>
                {selectedProfile === "4k" && <CheckCircle2 className="h-5 w-5 text-[#79553D]" />}
              </div>
              <p className="text-xs text-[#5A4F46] mt-2">
                4096x2048 equirectangular panoramas, denoised Cycles lighting & hero stills.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onStartStudio}
            className="flex items-center justify-center gap-2 rounded-full bg-[#79553D] py-4 px-8 text-base font-semibold text-white shadow-lg hover:bg-[#64442F] transition-all w-full"
          >
            <span>Launch Studio for {roomOptions.find((r) => r.id === selectedRoom)?.name}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
