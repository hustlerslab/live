"use client";

import { useState } from "react";
import { X, Play, Volume2, VolumeX, Maximize2, Sparkles, Box, ArrowRight } from "lucide-react";
import Image from "next/image";

interface WatchWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudio: () => void;
}

export function WatchWalkthroughModal({
  isOpen,
  onClose,
  onStartStudio,
}: WatchWalkthroughModalProps) {
  const [activeTab, setActiveTab] = useState<"video" | "interactive">("interactive");
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#FAF7F2] border border-[#E8DEC8] shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EFE7DC] px-6 py-4 bg-[#F5EEE4]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79553D] text-white">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1C1613]">
                Ishana 3D Walkthrough Preview
              </h3>
              <p className="text-xs text-[#665A50]">
                Experience your room transformed from photos to an interactive 3D space
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#4A423B] transition-colors hover:bg-[#EAE0D2] hover:text-[#1C1613]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#FAF7F2] border-b border-[#EFE7DC]">
          <div className="flex gap-2 bg-[#EFE6DA] p-1 rounded-full text-xs font-medium text-[#4A423B]">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
                activeTab === "interactive"
                  ? "bg-[#79553D] text-white shadow-xs"
                  : "hover:text-[#1C1613]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>3D Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
                activeTab === "video"
                  ? "bg-[#79553D] text-white shadow-xs"
                  : "hover:text-[#1C1613]"
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Cinematic Film</span>
            </button>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 text-xs text-[#5A4F46] hover:text-[#1C1613]"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span>{isMuted ? "Sound Off" : "Sound On"}</span>
          </button>
        </div>

        {/* Video / Interactive Media Viewport */}
        <div className="relative aspect-video w-full bg-[#1C1613] overflow-hidden group">
          {activeTab === "interactive" ? (
            <div className="relative w-full h-full">
              <Image
                src="/images/hero/hero_3d_furnished_room.jpg"
                alt="3D Walkthrough View"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Interactive Camera Hotspot Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                    Living Room · Modern Warm Oak Concept
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-0.5">
                    360° Panoramic Walkthrough
                  </h4>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onStartStudio();
                  }}
                  className="flex items-center gap-2 rounded-full bg-[#79553D] px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-[#64442F] transition-all"
                >
                  <span>Create My Space</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-[#181412]">
              <Image
                src="/images/hero/hero_moodboard.jpg"
                alt="Cinematic Preview"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Play Overlay */}
              <button
                onClick={() => {
                  onClose();
                  onStartStudio();
                }}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#79553D]/90 text-white shadow-2xl transition-transform hover:scale-110 hover:bg-[#79553D]"
              >
                <Play className="h-8 w-8 fill-current ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#F5EEE4] border-t border-[#EFE7DC]">
          <p className="text-sm text-[#5A4F46] text-center sm:text-left">
            Ready to convert your room photos into a custom 3D walkthrough?
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-full px-5 py-2 text-sm font-medium text-[#4A423B] hover:text-[#1C1613]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartStudio();
              }}
              className="flex items-center gap-2 rounded-full bg-[#79553D] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#64442F] transition-all"
            >
              <span>Start Free Concept</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
