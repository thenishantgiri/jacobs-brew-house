"use client";

import React from "react";
import Link from "next/link";

function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

const navigationLinks = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "About", href: "/about" },
  { number: "03", label: "Gallery", href: "/gallery" },
  { number: "04", label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/jacobs_brewhouse/" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X (Twitter)", href: "https://x.com" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10">
      {/* Large CTA Section */}
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-16 md:pt-28 md:pb-20">
        <FadeUp>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] tracking-tight max-w-6xl">
            Let&apos;s brew something{" "}
            <span className="italic text-brand-green-light">special</span>{" "}
            together.
          </h2>
        </FadeUp>
      </div>

      <div className="mx-6 md:mx-12 lg:mx-20 border-t border-white/10" />

      {/* Main Grid Section */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 */}
          <FadeUp>
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <img src="/images/brand/logo.png" alt="Jacob's Brew House" width={140} height={48} />
              </Link>
              <p className="font-sans text-sm leading-relaxed text-white/50 max-w-[260px]">
                A modern European caf&eacute; experience crafted with passion and precision.
              </p>
            </div>
          </FadeUp>

          {/* Column 2 */}
          <FadeUp delay={0.1}>
            <div className="space-y-5">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/30 mb-6">Navigation</h3>
              <nav className="flex flex-col gap-3">
                {navigationLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="group flex items-center gap-3 text-white/70 hover:text-brand-green-light transition-colors duration-300">
                    <span className="font-sans text-[11px] text-white/30 group-hover:text-brand-green-light transition-colors duration-300">{link.number}</span>
                    <span className="relative font-sans text-sm">
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-brand-green-light group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </FadeUp>

          {/* Column 3 */}
          <FadeUp delay={0.2}>
            <div className="space-y-5">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/30 mb-6">Contact</h3>
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">Address</p>
                  <p className="font-sans text-sm text-white/70 leading-relaxed">Plot No 7, JLN, Opp. Clarks Amer Hotel,<br />Malviya Nagar, Jaipur, Rajasthan</p>
                </div>
                <div className="space-y-1">
                  <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">Phone</p>
                  <a href="tel:+917229966700" className="group relative inline-block font-sans text-sm text-white/70 hover:text-brand-green-light transition-colors duration-300">
                    +91 7229966700
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-brand-green-light group-hover:w-full transition-all duration-300" />
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30">Email</p>
                  <a href="mailto:info@jacobbrewhouse.com" className="group relative inline-block font-sans text-sm text-white/70 hover:text-brand-green-light transition-colors duration-300">
                    info@jacobbrewhouse.com
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-brand-green-light group-hover:w-full transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Column 4 */}
          <FadeUp delay={0.3}>
            <div className="space-y-5">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/30 mb-6">Social</h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative inline-block font-sans text-sm text-white/70 hover:text-brand-green-light transition-colors duration-300 w-fit">
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-brand-green-light group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2">Open Hours</p>
                <p className="font-sans text-sm text-white/70">Mon &ndash; Sun, 8AM &ndash; 11PM</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-6 md:mx-12 lg:mx-20 border-t border-white/10" />
      <div className="px-6 md:px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-white/30">
          &copy; {new Date().getFullYear()} Jacob&apos;s Brew House. All rights reserved.
        </p>
        <p className="font-sans text-xs text-white/30">Crafted with love</p>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-12 lg:right-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-brand-green-light hover:border-brand-green-light hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
