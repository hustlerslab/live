"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Mail,
  User,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    propertyType: "Residential Multi-Family",
    unitsCount: "100-500 Units",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      <Navbar />

      <main className="py-16 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Value Prop */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] uppercase tracking-widest">
              <Building2 className="h-4 w-4" />
              <span>Developer Partnership Program</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-[#1C1613]">
              Request your Developer Demo & Pilot Assessment
            </h1>

            <p className="text-base sm:text-lg text-[#5A4F46] leading-relaxed">
              Discover how Allure seamlessly connects property development with pre-handover visualization, post-possession homeowner engagement, and curated execution partners.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E8DEC8]">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D] border border-[#E8DEC8]">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1C1613]">Dedicated Pilot Setup</h4>
                  <p className="text-xs text-[#5A4F46] mt-0.5 leading-relaxed">
                    Test Allure on a single property project or buyer group before full portfolio deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D] border border-[#E8DEC8]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1C1613]">Customized Spatial Renders</h4>
                  <p className="text-xs text-[#5A4F46] mt-0.5 leading-relaxed">
                    Interactive 3D walkthroughs customized with your floor plans, finishes, and unit specs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D] border border-[#E8DEC8]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1C1613]">Enterprise Operating Guardrails</h4>
                  <p className="text-xs text-[#5A4F46] mt-0.5 leading-relaxed">
                    Strict data privacy, customer consent rules, clear commercial attribution, and brand control.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] text-xs text-[#5A4F46]">
              <p className="font-bold text-[#1C1613] mb-1">Looking for Homeowner or Designer access?</p>
              <p>
                Homeowners and designers can start instantly in the studio.{" "}
                <Link href="/login" className="font-bold text-[#79553D] hover:underline">
                  Log in to Studio →
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Demo Request Form */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E8DEC8] shadow-lg">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1C1613]">Demo Request Received</h3>
                <p className="text-sm text-[#5A4F46] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1C1613]">{formData.name}</strong>. Our developer partnership team will review <strong className="text-[#1C1613]">{formData.company || "your organization"}</strong>&apos;s project requirements and reach out within 1 business day.
                </p>
                <div className="pt-4">
                  <Link
                    href="/builders"
                    className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#64442F] transition-all"
                  >
                    <span>Return to Builder Overview</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold text-[#1C1613]">Schedule Developer Demo</h3>
                  <p className="text-xs text-[#5A4F46] mt-1">
                    Fill in your project details to connect with our partnership team.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] focus:border-[#79553D] focus:outline-none"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@company.com"
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] focus:border-[#79553D] focus:outline-none"
                      />
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] focus:border-[#79553D] focus:outline-none"
                      />
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                    Builder / Developer Company Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Infrastructures & Realty"
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] focus:border-[#79553D] focus:outline-none"
                    />
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] px-3 text-sm text-[#1C1613] focus:border-[#79553D] focus:outline-none cursor-pointer"
                    >
                      <option value="Residential Multi-Family">Residential Multi-Family</option>
                      <option value="Luxury Villas & Estates">Luxury Villas & Estates</option>
                      <option value="Townships & Mixed-Use">Townships & Mixed-Use</option>
                      <option value="Commercial & Retail Spaces">Commercial & Retail Spaces</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Target Pilot Scope
                    </label>
                    <select
                      value={formData.unitsCount}
                      onChange={(e) => setFormData({ ...formData, unitsCount: e.target.value })}
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] px-3 text-sm text-[#1C1613] focus:border-[#79553D] focus:outline-none cursor-pointer"
                    >
                      <option value="1-50 Units (Single Tower)">1-50 Units (Single Project)</option>
                      <option value="100-500 Units">100-500 Units</option>
                      <option value="500+ Units (Multi-Project)">500+ Units (Multi-Project)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                    Project Notes & Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your upcoming project handovers or pre-booking schedule..."
                    className="w-full rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] p-3 text-sm text-[#1C1613] placeholder-[#A89A8C] focus:border-[#79553D] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#79553D] text-sm font-semibold text-white shadow-md hover:bg-[#64442F] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>Submit Developer Demo Request</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#8C7B6D] pt-2">
                  By submitting, you agree to Allure&apos;s enterprise privacy policy and partnership terms.
                </p>
              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
