"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/* ── Data ── */
const values = [
  { number: "01", title: "CRAFT", description: "Every cup is brewed with precision. Every dish is prepared with care. We believe in doing fewer things, but doing them exceptionally." },
  { number: "02", title: "COMMUNITY", description: "We designed our spaces to bring people together. From swing seats to communal tables, every corner invites connection." },
  { number: "03", title: "CHARACTER", description: "Our vintage photo booth, industrial pipes, and eclectic d\u00e9cor aren\u2019t just design choices \u2014 they\u2019re conversation starters." },
];

const experiences = [
  { title: "Specialty Coffee", description: "Single-origin beans, pour-over precision, and latte art that\u2019s almost too beautiful to drink." },
  { title: "Artisan Kitchen", description: "Wood-fired pizzas, gourmet plates, and seasonal menus that celebrate fresh, local ingredients." },
  { title: "Curated Interiors", description: "Every chair, tile, and light fixture tells a story of craftsmanship and intentional design." },
  { title: "Vibrant Events", description: "Live music evenings, art shows, and community gatherings that keep the energy alive." },
];

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
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((value, i) => (
            <FadeUp key={value.number} delay={i * 0.15}>
              <div className={`py-12 md:px-10 first:md:pl-0 last:md:pr-0 ${i < values.length - 1 ? "border-b md:border-b-0 md:border-r border-white/10" : ""}`}>
                <span className="block font-serif text-6xl text-white/20 mb-6">{value.number}</span>
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white mb-4">{value.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-white/50">{value.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 4. SPACE SHOWCASE */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FadeUp>
            <div className="relative aspect-[4/5] overflow-hidden group">
              <Image src="/images/interior/swings.jpg" alt="Swing seating area" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden group">
              <Image src="/images/interior/outdoor.jpg" alt="Outdoor seating area" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={0.4}>
          <blockquote className="mt-20 text-center">
            <p className="font-serif text-3xl md:text-5xl italic leading-[1.2] tracking-tight text-white/80 max-w-3xl mx-auto">
              &ldquo;We didn&apos;t just build a caf&eacute;.<br />We built a feeling.&rdquo;
            </p>
          </blockquote>
        </FadeUp>
      </section>

      {/* 5. THE EXPERIENCE */}
      <section className="py-32 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mb-20">
            <FadeUp>
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4">What We Offer</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight mb-6">The Experience</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-white/50 leading-relaxed">
                What makes Jacob&apos;s Brew House different isn&apos;t one thing &mdash; it&apos;s everything. Every detail, from the aroma that greets you at the door to the last sip of your espresso, is designed to be memorable.
              </p>
            </FadeUp>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {experiences.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.15}>
                <div className="group">
                  <div className="w-12 h-[2px] bg-brand-green mb-6 transition-all duration-500 group-hover:w-20" />
                  <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-white mb-3">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/50">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

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
