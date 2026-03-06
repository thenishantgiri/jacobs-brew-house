"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/* ── Image data ── */
type Category = "Interior" | "Food & Drinks" | "Ambience";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const images: GalleryImage[] = [
  { src: "/images/interior/lounge.jpg", alt: "The lounge area", category: "Interior" },
  { src: "/images/interior/upper-deck.jpg", alt: "Upper deck seating", category: "Interior" },
  { src: "/images/interior/swings.jpg", alt: "Swing seating area", category: "Interior" },
  { src: "/images/interior/photobooth.jpg", alt: "Photo booth corner", category: "Interior" },
  { src: "/images/interior/terrace.jpg", alt: "Terrace view", category: "Interior" },
  { src: "/images/interior/outdoor.jpg", alt: "Outdoor seating", category: "Interior" },
  { src: "/images/interior/main-hall.jpg", alt: "Main hall interiors", category: "Interior" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Brew house interior view", category: "Interior" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Warm interior lighting", category: "Interior" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Seating arrangement", category: "Interior" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Design details", category: "Interior" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Architectural elements", category: "Interior" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Ambient interior", category: "Interior" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Cozy corner", category: "Interior" },
  { src: "/images/food/food-1.jpg", alt: "Signature dish", category: "Food & Drinks" },
  { src: "/images/food/food-2.jpg", alt: "Gourmet platter", category: "Food & Drinks" },
  { src: "/images/food/food-3.jpg", alt: "Chef's special", category: "Food & Drinks" },
  { src: "/images/food/food-4.jpg", alt: "Artisan plate", category: "Food & Drinks" },
  { src: "/images/food/coffee-brewing.jpg", alt: "Coffee being brewed", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-1.jpg", alt: "Crafted beverage", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Table spread", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Fresh brew pour", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Dessert close-up", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Beverage art", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Plated delicacy", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Cocktail presentation", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Brew house specials", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-9.jpg", alt: "Morning coffee ritual", category: "Food & Drinks" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Seasonal offering", category: "Food & Drinks" },
  { src: "/images/interior/photobooth-2.jpg", alt: "Photo booth lights", category: "Ambience" },
  { src: "/images/interior/lounge-2.jpg", alt: "Lounge mood lighting", category: "Ambience" },
];

const tabs = ["All", "Interior", "Food & Drinks", "Ambience"] as const;
type Tab = (typeof tabs)[number];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeTab === "All" ? images : images.filter((img) => img.category === activeTab);
  const lightboxOpen = lightboxIndex !== null;

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => setLightboxIndex((prev) => prev === null ? null : prev === 0 ? filtered.length - 1 : prev - 1), [filtered.length]);
  const goNext = useCallback(() => setLightboxIndex((prev) => prev === null ? null : prev === filtered.length - 1 ? 0 : prev + 1), [filtered.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  useEffect(() => { setLightboxIndex(null); }, [activeTab]);

  return (
    <main className="min-h-screen bg-brand-charcoal text-white">
      {/* 1. HERO */}
      <section className="flex h-[50vh] flex-col items-center justify-center px-6">
        <p className="mb-4 text-xs tracking-[0.35em] uppercase text-white/40 font-sans animate-fade-in" style={{ animationDelay: "0.2s" }}>Gallery</p>
        <h1 className="text-7xl md:text-9xl font-serif text-center leading-none animate-fade-in" style={{ animationDelay: "0.4s" }}>A Visual Journey</h1>
        <p className="mt-6 text-base md:text-lg font-sans text-white/50 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>Every corner tells a story</p>
      </section>

      {/* 2. FILTER TABS */}
      <nav className="sticky top-0 z-30 bg-brand-charcoal/90 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-6 py-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-xs tracking-[0.25em] uppercase font-sans transition-colors duration-300 pb-1 ${activeTab === tab ? "text-white" : "text-white/40 hover:text-white/60"}`}
            >
              {tab}
              {activeTab === tab && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white" />}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. MASONRY GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.src}
              className="mb-4 break-inside-avoid"
              style={{
                animation: `fadeInUp 0.5s ease ${i * 0.04}s both`,
              }}
            >
              <div onClick={() => openLightbox(i)} className="group relative cursor-pointer overflow-hidden rounded-lg">
                <Image src={img.src} alt={img.alt} width={600} height={800} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                  <span className="text-sm tracking-[0.25em] uppercase font-sans text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIGHTBOX */}
      {lightboxOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          style={{ animation: "fadeIn 0.3s ease" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white" aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 md:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white" aria-label="Previous image">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 md:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white" aria-label="Next image">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} width={1200} height={900} sizes="90vw" className="max-h-[85vh] w-auto rounded-lg object-contain" priority />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/40 font-sans">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}

      {/* 5. BOTTOM CTA */}
      <section className="py-24 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Want to see it in person?</h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Link href="/contact" className="inline-block rounded-full bg-brand-green px-10 py-4 text-sm tracking-[0.2em] uppercase font-sans text-white transition-colors duration-300 hover:bg-brand-green-light">
            Visit Us
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
