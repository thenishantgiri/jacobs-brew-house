"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const values = [
  {
    number: "01",
    title: "CRAFT",
    description:
      "Every cup is brewed with precision. Every dish is prepared with care. We believe in doing fewer things, but doing them exceptionally.",
  },
  {
    number: "02",
    title: "COMMUNITY",
    description:
      "We designed our spaces to bring people together. From swing seats to communal tables, every corner invites connection.",
  },
  {
    number: "03",
    title: "CHARACTER",
    description:
      "Our vintage photo booth, industrial pipes, and eclectic d\u00e9cor aren\u2019t just design choices \u2014 they\u2019re conversation starters.",
  },
];

/* ── Hooks ── */

function useInView(threshold = 0.3) {
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

function useMouseParallax(sectionRef: React.RefObject<HTMLDivElement | null>) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalize to -1 … 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse({ x, y });
    };

    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [sectionRef]);

  return mouse;
}

/* ── CountUp ── */

function CountUp({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <>{String(count).padStart(2, "0")}</>;
}

/* ── ValueCard ── */

function ValueCard({
  value,
  index,
  inView,
  isLast,
  mouse,
}: {
  value: (typeof values)[0];
  index: number;
  inView: boolean;
  isLast: boolean;
  mouse: { x: number; y: number };
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const baseDelay = index * 250;

  // Each card responds to mouse differently based on position
  const parallaxX = mouse.x * (8 - index * 3);
  const parallaxY = mouse.y * (6 - index * 2);

  return (
    <div
      ref={cardRef}
      className="relative py-12 md:px-10 first:md:pl-0 last:md:pr-0 group/card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated vertical divider with flowing gradient */}
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-0 h-full w-px overflow-hidden">
          <div
            className="w-full transition-all duration-1000 ease-out"
            style={{
              height: inView ? "100%" : "0%",
              transitionDelay: `${baseDelay + 400}ms`,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(27,94,59,0.3) 50%, transparent 100%)",
              backgroundSize: "100% 200%",
              animation: inView
                ? "shimmerDivider 3s ease-in-out infinite"
                : "none",
            }}
          />
        </div>
      )}

      {/* Hover glow — follows mouse position */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, rgba(27,94,59,0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Number — floats with mouse + breathes */}
      <div className="relative overflow-hidden mb-6">
        <span
          className="block font-serif text-7xl md:text-8xl transition-colors duration-500"
          style={{
            transform: inView
              ? `translateY(0) translateX(${parallaxX}px) translateZ(0)`
              : "translateY(80px)",
            opacity: inView ? 1 : 0,
            transition: inView
              ? "transform 0.15s ease-out, opacity 1s ease-out, color 0.5s ease"
              : `transform 1s ease-out ${baseDelay}ms, opacity 1s ease-out ${baseDelay}ms, color 0.5s ease`,
            color: hovered
              ? "rgba(27,94,59,0.4)"
              : "rgba(255,255,255,0.08)",
            animation: inView ? `float${index} 4s ease-in-out ${baseDelay}ms infinite` : "none",
          }}
        >
          <CountUp target={parseInt(value.number)} inView={inView} />
        </span>
      </div>

      {/* Title — letter stagger with smooth entrance */}
      <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-white mb-4 overflow-hidden">
        {value.title.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              transform: inView ? "translateY(0)" : "translateY(100%)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 400 + i * 60}ms, opacity 0.6s ease ${baseDelay + 400 + i * 60}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h3>

      {/* Description — smooth fade in as a block */}
      <p
        className="font-sans text-sm leading-relaxed text-white/50"
        style={{
          transform: inView ? "translateY(0)" : "translateY(20px)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 700}ms, opacity 0.8s ease ${baseDelay + 700}ms`,
        }}
      >
        {value.description}
      </p>

      {/* Accent line — breathes on hover with shimmer */}
      <div
        className="mt-8 h-[2px] rounded-full overflow-hidden"
        style={{
          width: hovered ? "80px" : inView ? "40px" : "0px",
          opacity: inView ? 1 : 0,
          transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${inView ? baseDelay + 900 : 0}ms, opacity 0.7s ease ${inView ? baseDelay + 900 : 0}ms`,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(90deg, rgba(27,94,59,0.6), rgba(27,94,59,1), rgba(27,94,59,0.6))",
            backgroundSize: "200% 100%",
            animation: inView ? "shimmerLine 2s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </div>
  );
}

/* ── Main Section ── */

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView(0.2);
  const mouse = useMouseParallax(sectionRef);

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [inViewRef]
  );

  return (
    <section
      ref={setRefs}
      className="py-24 max-w-7xl mx-auto px-8 relative overflow-hidden"
    >
      {/* Background floating numbers — parallax with mouse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {values.map((v, i) => (
          <span
            key={v.number}
            className="absolute font-serif text-[200px] md:text-[300px] text-white/[0.02] select-none"
            style={{
              left: `${10 + i * 30}%`,
              top: "50%",
              transform: inView
                ? `translate(${mouse.x * (15 - i * 5)}px, calc(-50% + ${mouse.y * (10 - i * 3)}px))`
                : "translateY(0%)",
              opacity: inView ? 1 : 0,
              transition: inView
                ? "transform 0.3s ease-out, opacity 1.5s ease-out"
                : `opacity 1.5s ease-out ${i * 300}ms`,
              animation: inView
                ? `ghostFloat${i} ${6 + i}s ease-in-out infinite`
                : "none",
            }}
          >
            {v.number}
          </span>
        ))}
      </div>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0">
        {values.map((value, i) => (
          <ValueCard
            key={value.number}
            value={value}
            index={i}
            inView={inView}
            isLast={i === values.length - 1}
            mouse={mouse}
          />
        ))}
      </div>

      {/* Inline keyframes — bypasses Turbopack CSS cache */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ghostFloat0 { 0%,100%{transform:translate(0,-50%)} 50%{transform:translate(0,calc(-50% - 15px))} }
        @keyframes ghostFloat1 { 0%,100%{transform:translate(0,-50%)} 50%{transform:translate(0,calc(-50% + 12px))} }
        @keyframes ghostFloat2 { 0%,100%{transform:translate(0,-50%)} 50%{transform:translate(0,calc(-50% - 10px))} }
        @keyframes shimmerDivider { 0%,100%{background-position:100% 0%} 50%{background-position:100% 100%} }
        @keyframes shimmerLine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}} />
    </section>
  );
}
