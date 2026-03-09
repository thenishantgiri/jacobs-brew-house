"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  index: number;
  onClick: () => void;
}

export default function GalleryCard({ src, alt, index, onClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const isHovered = useRef(false);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const cur = useRef({ tiltX: 0, tiltY: 0, pullX: 0, pullY: 0, scale: 1, overlay: 0, label: 0 });
  const rafId = useRef(0);
  const [inView, setInView] = useState(false);

  /* ── Scroll entrance ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── rAF loop — only runs while hovered or settling back ── */
  const startLoop = useCallback(() => {
    const tick = () => {
      const c = cur.current;
      const m = mousePos.current;
      const h = isHovered.current;

      /* Targets */
      const tTiltX = h ? (m.y - 0.5) * -18 : 0;
      const tTiltY = h ? (m.x - 0.5) * 18 : 0;
      const tPullX = h ? (m.x - 0.5) * 15 : 0;
      const tPullY = h ? (m.y - 0.5) * 15 : 0;
      const tScale = h ? 1.08 : 1;
      const tOverlay = h ? 0.35 : 0;
      const tLabel = h ? 1 : 0;

      /* Lerp — higher factors = snappier tracking */
      c.tiltX += (tTiltX - c.tiltX) * 0.15;
      c.tiltY += (tTiltY - c.tiltY) * 0.15;
      c.pullX += (tPullX - c.pullX) * 0.12;
      c.pullY += (tPullY - c.pullY) * 0.12;
      c.scale += (tScale - c.scale) * 0.12;
      c.overlay += (tOverlay - c.overlay) * 0.15;
      c.label += (tLabel - c.label) * 0.12;

      /* Card — tilt + shadow (no translateZ — fights with overflow:hidden) */
      if (cardRef.current) {
        const shadowY = 8 + c.overlay * 30;
        const shadowBlur = 20 + c.overlay * 50;
        const shadowAlpha = 0.2 + c.overlay * 0.5;
        const greenGlow = c.overlay * 0.3;
        cardRef.current.style.transform = `perspective(800px) rotateX(${c.tiltX}deg) rotateY(${c.tiltY}deg)`;
        cardRef.current.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}), 0 0 ${c.overlay * 30}px rgba(27,94,59,${greenGlow})`;
      }

      /* Image — magnetic pull + zoom */
      if (imgWrapRef.current) {
        imgWrapRef.current.style.transform = `translate(${c.pullX}px, ${c.pullY}px) scale(${c.scale})`;
      }

      /* Green glow — follows cursor */
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${m.x * 100}% ${m.y * 100}%, rgba(27,94,59,0.3) 0%, transparent 60%)`;
        glowRef.current.style.opacity = String(Math.min(c.overlay * 2.5, 1));
      }

      /* Specular shine — angle follows cursor */
      if (shineRef.current) {
        const angle = Math.atan2(m.y - 0.5, m.x - 0.5) * (180 / Math.PI);
        shineRef.current.style.background = `linear-gradient(${angle + 90}deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%)`;
        shineRef.current.style.opacity = String(Math.min(c.overlay * 2, 1));
      }

      /* Dark overlay */
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(c.overlay);
      }

      /* "View" label */
      if (labelRef.current) {
        labelRef.current.style.opacity = String(c.label);
        labelRef.current.style.transform = `translateY(${(1 - c.label) * 20}px)`;
      }

      /* Keep running? */
      const diff =
        Math.abs(c.tiltX - tTiltX) +
        Math.abs(c.tiltY - tTiltY) +
        Math.abs(c.scale - tScale) +
        Math.abs(c.overlay - tOverlay);

      if (diff > 0.01) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = 0;
        /* Snap to rest */
        if (!h) {
          if (cardRef.current) {
            cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
            cardRef.current.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
          }
          if (imgWrapRef.current) imgWrapRef.current.style.transform = "scale(1)";
          if (glowRef.current) glowRef.current.style.opacity = "0";
          if (shineRef.current) shineRef.current.style.opacity = "0";
          if (overlayRef.current) overlayRef.current.style.opacity = "0";
          if (labelRef.current) {
            labelRef.current.style.opacity = "0";
            labelRef.current.style.transform = "translateY(20px)";
          }
        }
      }
    };
    if (!rafId.current) rafId.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      startLoop();
    },
    [startLoop],
  );

  const handleEnter = useCallback(() => {
    isHovered.current = true;
    startLoop();
  }, [startLoop]);

  const handleLeave = useCallback(() => {
    isHovered.current = false;
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const staggerDelay = Math.min(index * 80, 800);

  return (
    <div
      ref={containerRef}
      className="mb-4 break-inside-avoid"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(50px) scale(0.92)",
        transition: `opacity 0.8s ease ${staggerDelay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${staggerDelay}ms`,
      }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        className="relative cursor-pointer overflow-hidden rounded-lg"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Image with magnetic pull */}
        <div ref={imgWrapRef} style={{ willChange: "transform", backfaceVisibility: "hidden" }}>
          <Image
            src={src}
            alt={alt}
            width={600}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Cursor-following green glow */}
        <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }} />

        {/* Specular light sweep */}
        <div ref={shineRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }} />

        {/* Dark overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: 0 }} />

        {/* "View" label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            ref={labelRef}
            className="text-sm tracking-[0.25em] uppercase font-sans text-white"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            View
          </span>
        </div>
      </div>
    </div>
  );
}
