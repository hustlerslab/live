"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  Layout,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";
type UserRole = "homeowner" | "designer";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [role, setRole] = useState<UserRole>("homeowner");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (authMode === "forgot") {
      if (!email.trim()) {
        setErrorMessage("Please enter your registered email address.");
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setForgotSent(true);
      }, 900);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (authMode === "signup" && !fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const userDisplayName = fullName.trim() || email.split("@")[0] || "User";

      try {
        window.sessionStorage.setItem(
          "allure_user",
          JSON.stringify({
            name: userDisplayName,
            email: email.trim(),
            role,
            loggedInAt: new Date().toISOString(),
          })
        );
      } catch {
        /* ignore storage error */
      }

      setSuccessMessage(
        authMode === "signup"
          ? `Welcome to ALLURE, ${userDisplayName}! Setting up your studio...`
          : `Welcome back, ${userDisplayName}! Loading your workspace...`
      );

      setTimeout(() => {
        router.push("/#walkthrough-studio");
      }, 1200);
    }, 1000);
  };

  const handleQuickDemo = (selectedRole: UserRole) => {
    setRole(selectedRole);
    const demoName = selectedRole === "homeowner" ? "Alex Vance" : "Studio Minimal";
    const demoEmail = selectedRole === "homeowner" ? "alex@allure.design" : "studio@allure.design";

    setEmail(demoEmail);
    setPassword("demo123456");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      try {
        window.sessionStorage.setItem(
          "allure_user",
          JSON.stringify({
            name: demoName,
            email: demoEmail,
            role: selectedRole,
            loggedInAt: new Date().toISOString(),
          })
        );
      } catch {
        /* ignore */
      }

      setSuccessMessage(`Logging in as demo ${selectedRole} (${demoName})...`);
      setTimeout(() => {
        router.push("/#walkthrough-studio");
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1613] flex flex-col lg:flex-row">
      {/* Left Column: Visual Brand Banner (Desktop Only) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-[#1C1613] p-12 text-white">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-bg.jpg"
            alt="Allure Luxury Interior Showcase"
            fill
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1613] via-[#1C1613]/60 to-black/40" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#79553D] text-white shadow-lg transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-2xl font-bold tracking-[0.3em] text-white">
              ALLURE
            </span>
          </Link>
          <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#E8DEC8] backdrop-blur-md border border-white/15">
            CREATION STUDIO 2.0
          </span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto max-w-lg space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#79553D]/40 border border-[#E8DEC8]/20 px-4 py-1.5 text-xs font-semibold text-[#E8DEC8] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#E8DEC8]" />
            <span>AI Spatial Intelligence & 3D Walkthroughs</span>
          </div>

          <h1 className="font-display text-4xl xl:text-5xl font-bold leading-tight text-white tracking-tight">
            Visualize your dream space before you commit.
          </h1>

          <p className="text-base text-[#D5C7B5] leading-relaxed">
            Turn your inspiration, room photos, and interior preferences into photorealistic material moodboards and interactive 3D spatial experiences in seconds.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/10 p-2 text-[#E8DEC8] shrink-0">
                <Layout className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Moodboards</h4>
                <p className="text-xs text-[#A89A8C] mt-0.5">Instant room palettes & materials</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/10 p-2 text-[#E8DEC8] shrink-0">
                <Home className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">3D Walkthrough</h4>
                <p className="text-xs text-[#A89A8C] mt-0.5">Real-time spatial visualization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Security Badge */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-6 text-xs text-[#A89A8C]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#E8DEC8]" />
            <span>256-bit Encrypted Studio Security</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#E8DEC8]">
            <span className="font-bold">4.9/5</span>
            <span>★</span>
            <span className="text-[#A89A8C] ml-1">(2,400+ Designers & Homeowners)</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean, Proportional Authentication Card Container */}
      <div className="flex w-full lg:w-1/2 flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#FAF7F2] min-h-screen">
        {/* Header Bar Navigation */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xs font-bold text-[#5A4F46] hover:text-[#1C1613] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Top Right Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-display text-lg font-bold tracking-[0.25em] text-[#1C1613]">
              ALLURE
            </span>
          </Link>
        </div>

        {/* Centered Main Form Card */}
        <div className="mx-auto w-full max-w-md py-6 sm:py-8 my-auto">
          {/* Header Title Section */}
          <div className="mb-6 space-y-1.5">
            <h2 className="font-display text-3xl font-bold text-[#1C1613] tracking-tight">
              {authMode === "signin"
                ? "Sign in to Allure"
                : authMode === "signup"
                ? "Create your Studio account"
                : "Reset your password"}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4F46] leading-relaxed">
              {authMode === "signin"
                ? "Access your saved spatial designs, moodboards, and 3D walkthroughs."
                : authMode === "signup"
                ? "Join thousands of homeowners and interior designers visualizing spaces."
                : "Enter your account email to receive a password reset link."}
            </p>
          </div>

          {/* Role Selection Tabs (Homeowner vs Interior Designer) */}
          {authMode !== "forgot" && (
            <div className="mb-5 rounded-xl bg-[#EFE7DC] p-1 flex gap-1 border border-[#E5DCD0]">
              <button
                type="button"
                onClick={() => setRole("homeowner")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  role === "homeowner"
                    ? "bg-white text-[#1C1613] shadow-xs"
                    : "text-[#5A4F46] hover:text-[#1C1613]"
                }`}
              >
                <Home className="h-3.5 w-3.5 text-[#79553D]" />
                <span>Homeowner</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("designer")}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                  role === "designer"
                    ? "bg-white text-[#1C1613] shadow-xs"
                    : "text-[#5A4F46] hover:text-[#1C1613]"
                }`}
              >
                <Layout className="h-3.5 w-3.5 text-[#79553D]" />
                <span>Interior Designer</span>
              </button>
            </div>
          )}

          {/* Social Sign-In Buttons (Side by Side Equal Width) */}
          {authMode !== "forgot" && (
            <div className="mb-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemo(role)}
                  className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-[#E5DCD0] bg-white px-4 text-xs font-bold text-[#1C1613] shadow-xs transition-all hover:bg-[#F6EFE6] hover:border-[#D5C7B5] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo(role)}
                  className="flex h-11 items-center justify-center gap-2.5 rounded-xl border border-[#E5DCD0] bg-white px-4 text-xs font-bold text-[#1C1613] shadow-xs transition-all hover:bg-[#F6EFE6] hover:border-[#D5C7B5] active:scale-[0.98] cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0 fill-current text-[#1C1613]" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.02c.63-.76 1.06-1.82.94-2.88-.91.04-2.02.61-2.67 1.37-.58.67-.99 1.76-.85 2.8.1.01 2.05.07 2.58-1.29z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* Clean Section Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5DCD0]" />
                </div>
                <span className="relative bg-[#FAF7F2] px-3 text-[10px] font-bold uppercase tracking-wider text-[#8C7B6D]">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>
          )}

          {/* Quick Demo Login Banner Box */}
          {authMode === "signin" && (
            <div className="mb-5 rounded-xl bg-[#F6EFE6] p-3.5 border border-[#E8DEC8] flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 shrink">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#79553D] text-white shrink-0">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1C1613] truncate">Instant Studio Demo</p>
                  <p className="text-[11px] text-[#5A4F46] truncate">Skip typing to test immediately</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleQuickDemo(role)}
                className="rounded-lg bg-[#79553D] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#64442F] transition-all shadow-xs shrink-0 cursor-pointer"
              >
                1-Click Demo
              </button>
            </div>
          )}

          {/* Alert Notifications */}
          {errorMessage && (
            <div className="mb-5 rounded-xl bg-red-50 p-3.5 border border-red-200 text-xs font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {forgotSent ? (
            <div className="rounded-xl bg-white p-6 border border-[#E8DEC8] text-center space-y-4 shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F6EFE6] text-[#79553D]">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#1C1613]">Check your inbox</h3>
              <p className="text-xs text-[#5A4F46]">
                We sent a password reset link to <strong className="text-[#1C1613]">{email}</strong>. Please follow the instructions in the email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForgotSent(false);
                  setAuthMode("signin");
                }}
                className="w-full rounded-xl bg-[#79553D] py-3 text-xs font-semibold text-white hover:bg-[#64442F] transition-all cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            /* Main Input Form with Generous Vertical Spacing */
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#4A423B] uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-white px-4 text-sm text-[#1C1613] placeholder-[#A89A8C] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                      required={authMode === "signup"}
                    />
                  </div>
                </div>
              )}

              {/* Email Address Block */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A423B] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-white pl-10 pr-4 text-sm text-[#1C1613] placeholder-[#A89A8C] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                    required
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C] pointer-events-none" />
                </div>
              </div>

              {/* Password Block */}
              {authMode !== "forgot" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between w-full">
                    <label className="block text-xs font-semibold text-[#4A423B] uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage(null);
                          setSuccessMessage(null);
                          setAuthMode("forgot");
                        }}
                        className="text-xs font-semibold text-[#79553D] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-11 rounded-xl border border-[#E5DCD0] bg-white pl-10 pr-10 text-sm text-[#1C1613] placeholder-[#A89A8C] shadow-xs transition-all focus:border-[#79553D] focus:ring-2 focus:ring-[#79553D]/20 focus:outline-none font-medium"
                      required
                    />
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A89A8C] pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A89A8C] hover:text-[#1C1613] p-1 cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              {authMode === "signin" && (
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#E5DCD0] text-[#79553D] focus:ring-[#79553D] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs font-medium text-[#5A4F46] cursor-pointer select-none">
                    Keep me signed in for 30 days
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-[#79553D] px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#64442F] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 mt-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {authMode === "signin"
                        ? "Sign In to Studio"
                        : authMode === "signup"
                        ? "Create Studio Account"
                        : "Send Reset Link"}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle between Sign in & Sign Up */}
          <div className="mt-6 text-center text-xs text-[#5A4F46] pt-5 border-t border-[#E5DCD0]">
            {authMode === "signin" ? (
              <p>
                Don&apos;t have an Allure Studio account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode("signup");
                  }}
                  className="font-bold text-[#79553D] hover:underline ml-1 cursor-pointer"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode("signin");
                  }}
                  className="font-bold text-[#79553D] hover:underline ml-1 cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Footer Credits */}
        <div className="text-center text-[11px] text-[#A89A8C] max-w-md mx-auto w-full pt-4">
          <p>© {new Date().getFullYear()} ALLURE Spatial Intelligence Studio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
