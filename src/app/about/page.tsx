"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ValuesSection from "@/components/ValuesSection";
import SpaceShowcase from "@/components/SpaceShowcase";
import ExperienceSection from "@/components/ExperienceSection";


function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/* ── Data ── */


export default function AboutPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      {/* 1. HERO */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src="/images/interior/main-hall.jpg" alt="Jacob's Brew House interior" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/60 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>About Us</p>
          <h1 className="font-serif text-6xl md:text-8xl leading-[1.05] tracking-tight max-w-4xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
            The Story Behind<br /><span className="italic text-brand-green-light">Every Brew</span>
          </h1>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeUp>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
              Born from a passion for <span className="italic text-brand-green-light">craft</span> and <span className="italic text-brand-green-light">community</span>
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.15}>
              <p className="text-lg leading-relaxed text-white/60">
                Jacob&apos;s Brew House was founded in 2024 with a singular vision &mdash; to create a space where European caf&eacute; culture meets Indian warmth. Named after the timeless tradition of gathering over great coffee, our brew house is more than a caf&eacute;; it&apos;s a destination.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="text-lg leading-relaxed text-white/60">
                From the industrial green steel beams to the hand-laid checkered tiles, every element of our space has been thoughtfully designed to transport you to a world where time slows down and conversations deepen.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 3. VALUES */}
      <ValuesSection />

      {/* 4. SPACE SHOWCASE */}
      <SpaceShowcase />

      {/* 5. THE EXPERIENCE */}
      <ExperienceSection />

      {/* 6. CTA */}
      <section className="relative py-40 overflow-hidden">
        <Image src="/images/interior/main-hall.jpg" alt="Jacob's Brew House ambience" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <FadeUp>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-6">Visit Us</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-10 max-w-3xl">
              Come Experience It <span className="italic text-brand-green-light">Yourself</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link href="/contact" className="inline-block uppercase tracking-[0.2em] text-sm font-sans text-white bg-brand-green px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-brand-green-light">
              Reserve a Table
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
