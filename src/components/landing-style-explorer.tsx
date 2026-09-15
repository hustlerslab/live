"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Palette, ArrowRight, Check } from "lucide-react";

interface StyleExplorerProps {
  onSelectStyle: (styleName: string) => void;
}

export function LandingStyleExplorer({ onSelectStyle }: StyleExplorerProps) {
  const [activeStyle, setActiveStyle] = useState(0);

  const styles = [
    {
      id: "wabi-sabi",
      name: "Wabi-Sabi Minimalist",
      tagline: "Unrefined textures, earthy warmth & raw organic beauty",
      image: "/images/hero/style_wabi_sabi.jpg",
      colors: ["#EADECB", "#8C7461", "#4A3E35", "#C8B097"],
      materials: ["Raw Lime Plaster", "Jute Weave", "Reclaimed Dark Oak", "Textured Linen"],
      lighting: "Soft diffuse daylight · Golden hour warmth",
    },
    {
      id: "parisian",
      name: "Parisian Elegance",
      tagline: "Ornate wall moldings, marble fireplaces & timeless grandeur",
      image: "/images/hero/style_parisian.jpg",
      colors: ["#F7F3EC", "#C5A059", "#3A332C", "#A38D79"],
      materials: ["Herringbone Oak", "Calacatta Marble", "Brushed Brass", "Velvet Upholstery"],
      lighting: "High ceiling chandeliers · Ambient wall sconces",
    },
    {
      id: "organic-oak",
      name: "Warm Organic Oak",
      tagline: "Scandinavian warmth, bouclé fabrics & natural biophilic accents",
      image: "/images/hero/hero_3d_furnished_room.jpg",
      colors: ["#EFE8DC", "#79553D", "#5C7A5C", "#D5C7B5"],
      materials: ["Natural Light Oak", "Wool Bouclé", "Biophilic Plants", "Warm Ceramics"],
      lighting: "Abundant floor-to-ceiling sunlight",
    },
  ];

  const current = styles[activeStyle];

  return (
    <section className="py-16 lg:py-24 bg-[#F6EFE6] border-t border-[#E8DEC8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#79553D] bg-[#FAF7F2] px-4 py-1.5 rounded-full border border-[#E8DEC8] mb-3">
            <Palette className="h-3.5 w-3.5" />
            <span>Curated Aesthetic Styles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1C1613]">
            Explore interior concepts tailored to your taste.
          </h2>
          <p className="text-base text-[#5A4F46] mt-2">
            Switch between design registers to see how Ishana adjusts materials, lighting, and spatial moods instantly.
          </p>
        </div>

        {/* Style Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {styles.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStyle(idx)}
              className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                activeStyle === idx
                  ? "bg-[#79553D] text-white shadow-md scale-105"
                  : "bg-white text-[#4A423B] border border-[#E8DEC8] hover:bg-[#FAF7F2]"
              }`}
            >
              <Sparkles className={`h-4 w-4 ${activeStyle === idx ? "text-[#E6C387]" : "text-[#79553D]"}`} />
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Active Style Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white p-6 sm:p-8 border border-[#E8DEC8] shadow-xl">
          
          {/* Image Showcase Left */}
          <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#FAF7F2] border border-[#EADFCF] group">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white border border-white/20">
              {current.name}
            </div>
          </div>

          {/* Style Details Right */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#79553D] font-semibold">
                Design Register
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1C1613] mt-1">
                {current.name}
              </h3>
              <p className="text-sm text-[#5A4F46] mt-2 leading-relaxed">
                {current.tagline}
              </p>

              {/* Color Swatches */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-[#1C1613] uppercase tracking-wider">
                  Color Palette Tokens
                </span>
                <div className="flex items-center gap-3 mt-2">
                  {current.colors.map((hex, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="h-10 w-10 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[10px] text-[#665A50] font-mono">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Badges */}
              <div className="mt-6">
                <span className="text-xs font-semibold text-[#1C1613] uppercase tracking-wider">
                  Recommended Materials
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {current.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F6EFE6] px-3 py-1 text-xs font-medium text-[#4A423B] border border-[#E8DEC8]"
                    >
                      <Check className="h-3 w-3 text-[#79553D]" />
                      <span>{mat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onSelectStyle(current.name)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#79553D] py-3.5 px-6 text-sm font-medium text-white shadow-md hover:bg-[#64442F] transition-all w-full"
            >
              <span>Apply &quot;{current.name}&quot; to My Space</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
