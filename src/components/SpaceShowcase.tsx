"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ── Quote word ── */
function QuoteWord({ word, index, active, baseDelay }: { word: string; index: number; active: boolean; baseDelay: number }) {
  return (
    <span
      className="inline-block transition-all duration-700 ease-out"
      style={{
        filter: active ? "blur(0px)" : "blur(8px)",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transitionDelay: `${baseDelay + index * 80}ms`,
      }}
    >
      {word}&nbsp;
    </span>
  );
}

export default function SpaceShowcase() {
  const { ref, inView } = useInView(0.15);
  const [phase, setPhase] = useState(0);

  // Refs for direct DOM manipulation (no React re-renders = silky smooth)
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const leftGlowRef = useRef<HTMLDivElement>(null);
  const rightGlowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Animation state (refs, not state — no re-renders)
  const swingHovered = useRef(false);
  const swingAmplitude = useRef(0); // smoothly lerps 0 → 3
  const animActive = useRef(false);
  const startTime = useRef(0);

  // Particle data (stable)
  const particleData = useRef(
    Array.from({ length: 18 }, () => ({
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      size: 5 + Math.random() * 7,
      speed: 6 + Math.random() * 8,
      phase: Math.random() * Math.PI * 2,
      drift: -30 + Math.random() * 60,
    }))
  ).current;

  useEffect(() => {
    if (!inView) return;
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1600);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  // Start the animation loop when phase >= 2
  useEffect(() => {
    if (phase < 2) return;
    animActive.current = true;
    startTime.current = performance.now();

    // Create particle DOM elements
    const pContainer = particlesRef.current;
    if (pContainer) {
      pContainer.innerHTML = "";
      particleData.forEach((p) => {
        const el = document.createElement("span");
        el.style.cssText = `
          position:absolute; border-radius:50%; pointer-events:none;
          left:${p.x}%; top:${p.y}%;
          width:${p.size}px; height:${p.size}px;
          background:radial-gradient(circle, rgba(27,94,59,0.9) 0%, rgba(27,94,59,0) 70%);
          box-shadow:0 0 ${p.size * 2}px rgba(27,94,59,0.5);
        `;
        pContainer.appendChild(el);
      });
    }

    const tick = () => {
      if (!animActive.current) return;
      const t = (performance.now() - startTime.current) / 1000;

      // Smooth swing amplitude ramp (lerp toward target)
      const target = swingHovered.current ? 3 : 0;
      swingAmplitude.current += (target - swingAmplitude.current) * 0.04;

      // Left image: swing rocking + Ken Burns
      const swingAngle = Math.sin(t * 1.57) * swingAmplitude.current;
      const leftScale = 1.02 + Math.sin(t * 0.3) * 0.04;
      if (leftImageRef.current) {
        leftImageRef.current.style.transform = `rotate(${swingAngle}deg) scale(${leftScale})`;
      }

      // Right image: breathing + Ken Burns pan
      const breatheScale = 1.0 + (Math.sin(t * 1.26) * 0.5 + 0.5) * 0.06;
      const rightTx = Math.sin(t * 0.35) * 2;
      const rightTy = Math.cos(t * 0.28) * 1.5;
      if (rightImageRef.current) {
        rightImageRef.current.style.transform = `scale(${breatheScale}) translate(${rightTx}%, ${rightTy}%)`;
      }

      // Glow pulse on both
      const glowSize = 25 + Math.sin(t * 1.8) * 20;
      const glowAlpha = 0.2 + Math.sin(t * 1.8) * 0.15;
      const glowStyle = `inset 0 0 ${glowSize}px rgba(27,94,59,${glowAlpha}), 0 0 ${glowSize * 0.8}px rgba(27,94,59,${glowAlpha * 0.5})`;
      if (leftGlowRef.current) leftGlowRef.current.style.boxShadow = glowStyle;
      if (rightGlowRef.current) rightGlowRef.current.style.boxShadow = glowStyle;

      // Particles
      if (pContainer && pContainer.children.length > 0) {
        particleData.forEach((p, i) => {
          const el = pContainer.children[i] as HTMLElement;
          if (!el) return;
          const cycle = ((t / p.speed + p.phase / (Math.PI * 2)) % 1);
          const y = -cycle * 150;
          const x = Math.sin(cycle * Math.PI * 2) * p.drift * 0.4;
          const op = cycle < 0.12 ? cycle / 0.12 : cycle > 0.8 ? (1 - cycle) / 0.2 : 0.85;
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.style.opacity = String(op);
        });
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { animActive.current = false; };
  }, [phase, particleData]);

  const quoteLine1 = "We didn\u2019t just build a caf\u00e9.".split(" ");
  const quoteLine2 = "We built a feeling.".split(" ");

  return (
    <section ref={ref} className="py-32 max-w-7xl mx-auto px-8 relative overflow-hidden">
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-30" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* ── LEFT: Swings — rocks on hover ── */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer"
          style={{
            transform: phase >= 1 ? "translateX(0)" : "translateX(-80px)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1), opacity 1s ease",
          }}
          onMouseEnter={() => { swingHovered.current = true; }}
          onMouseLeave={() => { swingHovered.current = false; }}
        >
          <div
            ref={leftImageRef}
            style={{
              position: "absolute",
              inset: "-5%",
              transformOrigin: "50% 0%",
              willChange: "transform",
            }}
          >
            <Image
              src="/images/interior/swings.jpg"
              alt="Swing seating area"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            ref={leftGlowRef}
            className="absolute inset-0 rounded-sm pointer-events-none z-10"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        </div>

        {/* ── RIGHT: Garden — breathes ── */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
          style={{
            transform: phase >= 1 ? "translateX(0)" : "translateX(80px)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 200ms, opacity 1s ease 200ms",
          }}
        >
          <div
            ref={rightImageRef}
            style={{
              position: "absolute",
              inset: "-5%",
              willChange: "transform",
            }}
          >
            <Image
              src="/images/interior/outdoor.jpg"
              alt="Outdoor seating area"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            ref={rightGlowRef}
            className="absolute inset-0 rounded-sm pointer-events-none z-10"
            style={{
              opacity: phase >= 2 ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        </div>
      </div>

      {/* Quote — blur reveal */}
      <blockquote className="mt-20 text-center">
        <p className="font-serif text-3xl md:text-5xl italic leading-[1.2] tracking-tight text-white/80 max-w-3xl mx-auto">
          &ldquo;
          {quoteLine1.map((word, i) => (
            <QuoteWord key={`l1-${i}`} word={word} index={i} active={phase >= 3} baseDelay={0} />
          ))}
          <br />
          {quoteLine2.map((word, i) => (
            <QuoteWord key={`l2-${i}`} word={word} index={i} active={phase >= 3} baseDelay={quoteLine1.length * 80 + 200} />
          ))}
          <span
            className="inline-block transition-all duration-700"
            style={{
              filter: phase >= 3 ? "blur(0px)" : "blur(8px)",
              opacity: phase >= 3 ? 1 : 0,
              transitionDelay: `${(quoteLine1.length + quoteLine2.length) * 80 + 300}ms`,
            }}
          >
            &rdquo;
          </span>
        </p>
      </blockquote>
    </section>
  );
}
