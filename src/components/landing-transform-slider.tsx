"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Check, Eye } from "lucide-react";

export function LandingTransformSlider({ onStartStudio }: { onStartStudio: () => void }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activePin, setActivePin] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      if (percentage < 0) percentage = 0;
      if (percentage > 100) percentage = 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  const pins = [
    {
      id: "sofa",
      top: "62%",
      left: "40%",
      label: "Custom Bouclé Sectional",
      material: "Warm Wool Blend · Custom Modular Layout",
    },
    {
      id: "table",
      top: "78%",
      left: "52%",
      label: "Solid Natural Oak Coffee Table",
      material: "Sustainably Sourced Wood · Matte Finish",
    },
    {
      id: "lighting",
      top: "22%",
      left: "48%",
      label: "Sculptural Globe Chandelier",
      material: "Warm Brass & Handblown Amber Glass",
    },
    {
      id: "plant",
      top: "50%",
      left: "12%",
      label: "Indoor Fiddle Leaf Fig",
      material: "Biophilic Design Accent",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#79553D]">
              <Sparkles className="h-4 w-4" />
              <span>Real-Time Transformation Engine</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613] mt-2">
              Slide to watch an empty room turn into 3D.
            </h2>
            <p className="text-base text-[#5A4F46] mt-2 max-w-xl">
              Drag the interactive slider below to see how Allure converts plain photos into photorealistic, walkable 3D environments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSliderPosition(20)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                sliderPosition < 35
                  ? "bg-[#79553D] text-white border-[#79553D]"
                  : "bg-white text-[#4A423B] border-[#E5DCD0] hover:bg-[#F6EFE6]"
              }`}
            >
              Show Before Photo
            </button>
            <button
              onClick={() => setSliderPosition(80)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                sliderPosition > 65
                  ? "bg-[#79553D] text-white border-[#79553D]"
                  : "bg-white text-[#4A423B] border-[#E5DCD0] hover:bg-[#F6EFE6]"
              }`}
            >
              Show 3D Render
            </button>
          </div>
        </div>

        {/* Interactive Split Slider Display Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[#E8DEC8] shadow-2xl select-none cursor-ew-resize group bg-[#1C1613]"
        >
          {/* Background Layer: After (Allure 3D Walkthrough) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero/transform_after.jpg"
              alt="Allure 3D Walkthrough Render"
              fill
              className="object-cover pointer-events-none"
              priority
            />
            {/* Overlay Label Right */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-[#E6C387]" />
              <span>Allure 3D Space (After)</span>
            </div>

            {/* Interactive Material Pins on the 3D Render */}
            {pins.map((pin) => (
              <div
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(activePin === pin.id ? null : pin.id);
                }}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-[#79553D] text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    <Eye className="h-3 w-3" />
                  </div>
                  {/* Tooltip Popup */}
                  <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-48 rounded-xl bg-[#1C1613]/95 backdrop-blur-md p-3 text-white shadow-2xl border border-white/15 transition-all ${
                    activePin === pin.id ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:scale-100"
                  }`}>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">Material Spec</span>
                    <p className="text-xs font-bold mt-0.5">{pin.label}</p>
                    <p className="text-[10px] text-white/70 mt-0.5">{pin.material}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Foreground Layer: Before (Original Empty Room Photo) - Clipped by Slider Position */}
          <div
            style={{ width: `${sliderPosition}%` }}
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl z-10"
          >
            <div className="relative w-full h-full min-w-[800px] lg:min-w-[1200px]">
              <Image
                src="/images/hero/transform_before.jpg"
                alt="Original Room Photo"
                fill
                className="object-cover pointer-events-none"
                priority
              />
              {/* Overlay Label Left */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-[#1C1613] border border-[#E8DEC8]">
                <span>Original Photo (Before)</span>
              </div>
            </div>
          </div>

          {/* Draggable Slider Control Handle */}
          <div
            style={{ left: `${sliderPosition}%` }}
            className="absolute top-0 bottom-0 z-30 transform -translate-x-1/2 flex items-center justify-center pointer-events-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#79553D] text-white shadow-2xl border-2 border-white transform transition-transform group-hover:scale-110">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8]">
          <div className="flex items-center gap-3 text-sm text-[#4A423B]">
            <Check className="h-5 w-5 text-[#79553D]" />
            <span>Generate interactive walkthroughs from 2D room photos in under 60 seconds.</span>
          </div>

          <button
            onClick={onStartStudio}
            className="flex items-center gap-2 rounded-full bg-[#79553D] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#64442F] transition-all shrink-0"
          >
            <span>Transform My Room</span>
            <Sparkles className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
