"use client";

import { useState } from "react";
import {
  HardHat,
  Ruler,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  Truck,
  ShieldAlert,
  Download,
} from "lucide-react";

interface LandingBuildersProps {
  onStartStudio: () => void;
}

const SAMPLE_PROJECTS = [
  {
    id: "site-1",
    name: "Patna Luxury Penthouse",
    type: "Independent Penthouse (3,200 sq.ft)",
    status: "Active Execution",
    completion: 65,
    materials: [
      { item: "Italian Marble Flooring", qty: "2,400 sq.ft", estCost: "₹4,80,000", status: "Delivered" },
      { item: "Teak Wood Veneer Panels", qty: "850 sq.ft", estCost: "₹2,55,000", status: "In Transit" },
      { item: "Low-VOC Asian Paints Velvet", qty: "180 Liters", estCost: "₹72,000", status: "Delivered" },
      { item: "Modular Kitchen Hardware (Hettich)", qty: "1 Suite", estCost: "₹3,20,000", status: "Ready" },
    ],
  },
  {
    id: "site-2",
    name: "Indore Minimal Villa",
    type: "4 BHK Villa (4,500 sq.ft)",
    status: "Foundation & Framing",
    completion: 35,
    materials: [
      { item: "Microcement Wall Finish", qty: "3,100 sq.ft", estCost: "₹3,72,000", status: "Delivered" },
      { item: "Toughened Glass Balustrades", qty: "450 sq.ft", estCost: "₹1,80,000", status: "Scheduled" },
      { item: "Concealed LED Profiles", qty: "320 Meters", estCost: "₹96,000", status: "Ready" },
      { item: "Custom Wardrobe Framework", qty: "6 Units", estCost: "₹4,10,000", status: "In Transit" },
    ],
  },
];

export function LandingBuilders({ onStartStudio }: LandingBuildersProps) {
  const [selectedSiteIndex, setSelectedSiteIndex] = useState(0);
  const selectedSite = SAMPLE_PROJECTS[selectedSiteIndex];
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBoq = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="for-builders" className="py-20 bg-[#FAF7F2] border-t border-[#E8DEC8] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] mb-3 uppercase tracking-widest shadow-xs">
            <HardHat className="h-4 w-4" />
            <span>For Builders & Contractors</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1613]">
            Precision Site Execution & Automated Material Takeoffs
          </h2>
          <p className="text-base sm:text-lg text-[#5A4F46] mt-4 leading-relaxed font-normal">
            Eliminate site rework and material waste. Transform architectural floor plans into interactive 3D site walkthroughs with live Bill of Quantities (BOQ) estimates.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#79553D] text-white mb-6 shadow-sm">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#1C1613]">Automated BOQ Takeoffs</h3>
            <p className="text-sm text-[#5A4F46] mt-2.5 leading-relaxed font-normal">
              Extract surface square footages, paint liters, and millwork counts directly from AI 3D space renders into exportable site spreadsheets.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#79553D] text-white mb-6 shadow-sm">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#1C1613]">Blueprint-to-3D Engine</h3>
            <p className="text-sm text-[#5A4F46] mt-2.5 leading-relaxed font-normal">
              Upload 2D CAD files or paper blueprints. Allure builds an interactive, navigable 3D environment for subcontractor alignment.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-sm hover:shadow-md transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#79553D] text-white mb-6 shadow-sm">
              <Ruler className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#1C1613]">Site Milestone Sign-Offs</h3>
            <p className="text-sm text-[#5A4F46] mt-2.5 leading-relaxed font-normal">
              Secure client approvals before ordering raw materials. Share web 3D links so homeowners and site engineers see exact specs upfront.
            </p>
          </div>
        </div>

        {/* Interactive Builder Preview Dashboard */}
        <div className="rounded-3xl bg-[#1C1613] text-[#FAF7F2] p-6 sm:p-10 shadow-2xl border border-[#38302A]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#38302A]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D5C7B5] uppercase tracking-wider">
                <Building2 className="h-4 w-4 text-[#C49A78]" />
                <span>Live Site Intelligence Demo</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Builder Command Center & BOQ
              </h3>
            </div>

            {/* Site selector tabs */}
            <div className="flex items-center gap-2 bg-[#2B231F] p-1.5 rounded-2xl border border-[#423730]">
              {SAMPLE_PROJECTS.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedSiteIndex(idx)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    selectedSiteIndex === idx
                      ? "bg-[#79553D] text-white shadow-xs"
                      : "text-[#A89A8C] hover:text-white"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {/* Project Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#38302A] text-xs">
            <div>
              <span className="text-[#A89A8C] block">Property Type</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{selectedSite.type}</span>
            </div>
            <div>
              <span className="text-[#A89A8C] block">Site Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#E8DEC8] text-sm mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {selectedSite.status}
              </span>
            </div>
            <div>
              <span className="text-[#A89A8C] block">Completion</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{selectedSite.completion}% Overall</span>
            </div>
            <div>
              <span className="text-[#A89A8C] block">Vendor Logistics</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#D5C7B5] text-sm mt-0.5">
                <Truck className="h-3.5 w-3.5 text-[#C49A78]" /> On Schedule
              </span>
            </div>
          </div>

          {/* Material Takeoff Table */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Material Quantities & Cost Estimates</span>
              </h4>
              <button
                onClick={handleDownloadBoq}
                className="flex items-center gap-2 text-xs font-bold text-[#E8DEC8] hover:text-white bg-[#2B231F] border border-[#423730] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>BOQ Exported (.CSV)</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 text-[#C49A78]" />
                    <span>Export BOQ Report</span>
                  </>
                )}
              </button>
            </div>

            <table className="w-full text-left text-xs text-[#D5C7B5]">
              <thead>
                <tr className="border-b border-[#38302A] text-[#8C7B6D] uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-2 font-semibold">Material / Specification</th>
                  <th className="py-3 px-2 font-semibold">Quantity / Area</th>
                  <th className="py-3 px-2 font-semibold">Est. Material Cost</th>
                  <th className="py-3 px-2 font-semibold">Logistics Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B231F]">
                {selectedSite.materials.map((mat, i) => (
                  <tr key={i} className="hover:bg-[#251E1A]/50 transition-colors">
                    <td className="py-3.5 px-2 font-semibold text-white">{mat.item}</td>
                    <td className="py-3.5 px-2 font-mono text-[#E8DEC8]">{mat.qty}</td>
                    <td className="py-3.5 px-2 font-mono text-white font-bold">{mat.estCost}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          mat.status === "Delivered"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/50"
                            : mat.status === "In Transit"
                            ? "bg-amber-950/80 text-amber-300 border border-amber-800/50"
                            : "bg-blue-950/80 text-blue-300 border border-blue-800/50"
                        }`}
                      >
                        {mat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action inside preview */}
          <div className="mt-8 pt-6 border-t border-[#38302A] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#A89A8C]">
              Need custom BOQ templates or direct ERP integration for your construction firm?
            </p>
            <button
              onClick={onStartStudio}
              className="flex items-center gap-2 rounded-full bg-[#79553D] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#64442F] transition-all shrink-0 cursor-pointer"
            >
              <span>Create Builder Studio Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartStudio}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#79553D] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#64442F] hover:shadow-xl transition-all cursor-pointer"
          >
            <span>Launch Allure for Builders</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
