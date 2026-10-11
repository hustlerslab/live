"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import {
  Palette,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Mail,
  User,
  Phone,
  Briefcase,
  Layers,
  Sparkles,
  MapPin,
  Globe,
  Star,
  Check,
  Lock,
} from "lucide-react";

export default function ApplyAsDesignerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studioName: "",
    city: "Patna",
    experienceYears: "3-5 Years",
    designStyle: "Contemporary Indian",
    portfolioUrl: "",
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
      {/* Header Navigation */}
      <Navbar />

      <main className="py-12 lg:py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Showcase & Brand Proposition */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EADECB] px-4 py-1.5 text-xs font-bold text-[#79553D] uppercase tracking-widest shadow-xs">
              <Palette className="h-4 w-4" />
              <span>ALLURE DESIGN PARTNER NETWORK</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-[#1C1613] tracking-tight">
                Apply as an Allure Design Partner
              </h1>
              <p className="text-base sm:text-lg text-[#5A4F46] leading-relaxed font-normal">
                Join a curated ecosystem of verified interior designers, design studios, and architects using one persistent spatial model to streamline workflows and present interactive 3D concepts.
              </p>
            </div>

            {/* Featured Image & Visual Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-xl bg-[#1C1613]">
              <div className="relative h-64 sm:h-72 w-full">
                <Image
                  src="/images/hero/hero_3d_furnished_room.jpg"
                  alt="Allure Design Studio Interface"
                  fill
                  className="object-cover opacity-85"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1613] via-transparent to-transparent" />
              </div>

              {/* Overlaid Floating Badge & Testimonial */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                <div className="self-end inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#EADECB] border border-white/20">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9/5 Rating · 2,400+ Active Designers</span>
                </div>

                <div className="bg-[#1C1613]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-white space-y-2">
                  <p className="text-xs sm:text-sm font-medium italic text-[#E8DEC8]">
                    &ldquo;Allure transformed how our studio presents 3D concepts to clients — sign-offs happen in hours instead of weeks.&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-[#A89A8C] pt-1">
                    <span className="font-bold text-white">Studio Minimalist · Patna Hub</span>
                    <span className="text-[#C49A78]">Verified Design Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79553D] text-white">
                  <Layers className="h-4 w-4" />
                </div>
                <h4 className="font-bold text-sm text-[#1C1613]">Persistent Spatial Model</h4>
                <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                  Capture room once, sync CAD & 3D renders without re-entry.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79553D] text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h4 className="font-bold text-sm text-[#1C1613]">Better Project Context</h4>
                <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                  Deep client briefs & qualified budget expectations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] shadow-xs space-y-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#79553D] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="font-bold text-sm text-[#1C1613]">Curated Matching</h4>
                <p className="text-xs text-[#5A4F46] leading-relaxed font-normal">
                  High-intent client projects matched to your aesthetic style.
                </p>
              </div>
            </div>

            {/* Sign-in Callout Box */}
            <div className="p-5 rounded-2xl bg-[#F6EFE6] border border-[#E8DEC8] flex items-center justify-between gap-4 shadow-xs">
              <div>
                <p className="text-xs font-bold text-[#1C1613]">Already registered as a designer?</p>
                <p className="text-xs text-[#5A4F46]">Access your active bids and studio workspace.</p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#79553D] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#64442F] transition-all shrink-0"
              >
                <span>Log in to Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Designer Application Form Card */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-8 sm:p-10 border border-[#E8DEC8] shadow-xl relative">
            
            {/* Form Top Accent Stripe */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-[#79553D] rounded-b-md" />

            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold text-[#1C1613]">Application Received!</h3>
                  <p className="text-sm text-[#5A4F46] max-w-md mx-auto leading-relaxed font-normal">
                    Thank you, <strong className="text-[#1C1613]">{formData.name}</strong>. Our design curation team will review <strong className="text-[#1C1613]">{formData.studioName || "your practice"}</strong> and contact you within 48 hours.
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="/designers"
                    className="inline-flex items-center gap-2 rounded-full bg-[#79553D] px-8 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#64442F] transition-all"
                  >
                    <span>Return to Designer Overview</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-6 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#79553D]">
                    Step 1 of 1 · Partner Application
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1613]">
                    Design Partner Application
                  </h3>
                  <p className="text-xs text-[#5A4F46]">
                    Fill in your studio details to join Allure&apos;s curated professional network.
                  </p>
                </div>

                {/* Full Name */}
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
                      placeholder="e.g. Ananya Roy"
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                  </div>
                </div>

                {/* Email & Phone Grid */}
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
                        placeholder="ananya@studio.design"
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
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
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                      />
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>
                </div>

                {/* Studio Name & City Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Studio / Practice Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.studioName}
                        onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                        placeholder="e.g. Studio Minimalist"
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                      />
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Primary City *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-semibold cursor-pointer"
                      >
                        <option value="Patna">Patna</option>
                        <option value="Indore">Indore</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Other">Other City</option>
                      </select>
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>
                </div>

                {/* Design Register & Portfolio URL Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Primary Design Register
                    </label>
                    <select
                      value={formData.designStyle}
                      onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })}
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] px-3 text-sm text-[#1C1613] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-semibold cursor-pointer"
                    >
                      <option value="Contemporary Indian">Contemporary Indian</option>
                      <option value="Warm Minimalism">Warm Minimalism</option>
                      <option value="Organic Modernism">Organic Modernism</option>
                      <option value="Industrial Luxe">Industrial Luxe</option>
                      <option value="Heritage Revival">Heritage Revival</option>
                      <option value="Scandinavian Fusion">Scandinavian Fusion</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                      Portfolio / Website URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="https://behance.net/studio"
                        className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                      />
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C]" />
                    </div>
                  </div>
                </div>

                {/* Practice & Project Notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A423B]">
                    Tell us about your practice & project interests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your design philosophy, team size, or typical project scale..."
                    className="w-full rounded-xl border border-[#E5DCD0] bg-[#FAF7F2] p-3 text-sm text-[#1C1613] placeholder-[#A89A8C] transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#79553D] text-sm font-semibold text-white shadow-md hover:bg-[#64442F] hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
                >
                  {isSubmitting ? (
                    <span>Processing Application...</span>
                  ) : (
                    <>
                      <span>Submit Design Partner Application</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Security Trust Badges */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8C7B6D] border-t border-[#EFE7DC]">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-[#79553D]" />
                    <span>256-bit Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#79553D]" />
                    <span>No Spam Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#79553D]" />
                    <span>48h Review SLA</span>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
