"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onGetStarted?: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStartedClick = () => {
    setMobileMenuOpen(false);
    if (onGetStarted) {
      onGetStarted();
    } else {
      const studioElement = document.getElementById("walkthrough-studio");
      if (studioElement) {
        studioElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md transition-all border-b border-[#EFE7DC]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Brand Logo - ALLURE */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-[0.3em] text-[#1C1613] transition-colors group-hover:text-[#79553D]">
            ALLURE
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("how-it-works")}
            className="text-sm font-medium text-[#4A423B] transition-colors hover:text-[#1C1613]"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick("for-homeowners")}
            className="text-sm font-medium text-[#4A423B] transition-colors hover:text-[#1C1613]"
          >
            For Homeowners
          </button>
          <button
            onClick={() => handleNavClick("for-designers")}
            className="text-sm font-medium text-[#4A423B] transition-colors hover:text-[#1C1613]"
          >
            For Designers
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="text-sm font-medium text-[#4A423B] transition-colors hover:text-[#1C1613]"
          >
            About
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleGetStartedClick}
            className="text-sm font-medium text-[#2C241E] transition-colors hover:text-[#79553D]"
          >
            Log in
          </button>
          <button
            onClick={handleGetStartedClick}
            className="group flex items-center gap-2 rounded-full bg-[#79553D] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#64442F] hover:shadow-md active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-[#2C241E] hover:bg-[#EFE7DC]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DEC8] bg-[#FAF7F2] px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-left text-base font-medium text-[#2C241E]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick("for-homeowners")}
              className="text-left text-base font-medium text-[#2C241E]"
            >
              For Homeowners
            </button>
            <button
              onClick={() => handleNavClick("for-designers")}
              className="text-left text-base font-medium text-[#2C241E]"
            >
              For Designers
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-left text-base font-medium text-[#2C241E]"
            >
              About
            </button>
            <div className="pt-3 border-t border-[#EFE7DC] flex flex-col gap-3">
              <button
                onClick={handleGetStartedClick}
                className="w-full text-center py-2 text-sm font-medium text-[#2C241E]"
              >
                Log in
              </button>
              <button
                onClick={handleGetStartedClick}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-[#79553D] py-3 text-sm font-medium text-white shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
