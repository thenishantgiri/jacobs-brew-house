"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const experiences = [
  { num: "01", title: "Specialty Coffee", description: "Single-origin beans, pour-over precision, and latte art that\u2019s almost too beautiful to drink." },
  { num: "02", title: "Artisan Kitchen", description: "Wood-fired pizzas, gourmet plates, and seasonal menus that celebrate fresh, local ingredients." },
  { num: "03", title: "Curated Interiors", description: "Every chair, tile, and light fixture tells a story of craftsmanship and intentional design." },
  { num: "04", title: "Vibrant Events", description: "Live music evenings, art shows, and community gatherings that keep the energy alive." },
];

/* ── 3D Tilt Card ── */
function ExperienceCard({
  item,
  index,
  inView,
}: {
  item: (typeof experiences)[0];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const innerLineRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  const baseDelay = index * 200;

  // Smooth tilt animation loop — runs only while hovered or returning to 0
  const startLoop = useCallback(() => {
    const tick = () => {
      const targetX = isHovered.current ? (mousePos.current.y - 0.5) * -28 : 0;
      const targetY = isHovered.current ? (mousePos.current.x - 0.5) * 28 : 0;

      currentTilt.current.x += (targetX - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetY - currentTilt.current.y) * 0.08;

      const card = cardRef.current;
      if (card) {
        card.style.transform = `perspective(800px) rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg) translateZ(0)`;
      }

      // Glow follows mouse
      const glow = glowRef.current;
      if (glow && isHovered.current) {
        glow.style.background = `radial-gradient(circle at ${mousePos.current.x * 100}% ${mousePos.current.y * 100}%, rgba(27,94,59,0.2) 0%, transparent 60%)`;
        glow.style.opacity = "1";
      } else if (glow) {
        glow.style.opacity = "0";
      }

      // Line grows on hover
      if (lineRef.current) {
        lineRef.current.style.width = isHovered.current ? "80px" : "48px";
      }

      // Check if we need to keep animating
      const diff = Math.abs(currentTilt.current.x - targetX) + Math.abs(currentTilt.current.y - targetY);
      if (diff > 0.01) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        rafId.current = 0;
        if (card && !isHovered.current) {
          card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
        }
      }
    };
    if (!rafId.current) rafId.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    startLoop();
  }, [startLoop]);

  const handleEnter = useCallback(() => {
    isHovered.current = true;
    startLoop();
  }, [startLoop]);

  const handleLeave = useCallback(() => {
    isHovered.current = false;
    startLoop();
  }, [startLoop]);

  useEffect(() => {
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  // Shimmer on the accent line
  useEffect(() => {
    if (!inView || !innerLineRef.current) return;
    let active = true;
    const el = innerLineRef.current;
    const animate = () => {
      if (!active) return;
      const t = (performance.now() / 1000);
      const pos = ((t * 50 + index * 80) % 400) - 100;
      el.style.background = `linear-gradient(90deg, rgba(27,94,59,0.8) 0%, rgba(27,94,59,1) ${pos}%, rgba(100,200,130,1) ${pos + 15}%, rgba(27,94,59,1) ${pos + 30}%, rgba(27,94,59,0.8) 100%)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => { active = false; };
  }, [inView, index]);

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${baseDelay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${baseDelay}ms`,
      }}
    >
      <div
        ref={cardRef}
        className="relative p-8 rounded-xl cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
          transition: "border-color 0.5s, box-shadow 0.5s",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Glow overlay — follows mouse */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ opacity: 0, transition: "opacity 0.5s" }}
        />

        {/* Number */}
        <span
          className="block font-serif text-5xl md:text-6xl mb-4"
          style={{
            color: "rgba(27,94,59,0.15)",
            transform: inView ? "translateY(0)" : "translateY(30px)",
            opacity: inView ? 1 : 0,
            transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 100}ms`,
          }}
        >
          {item.num}
        </span>

        {/* Accent line with shimmer */}
        <div
          ref={lineRef}
          className="h-[2px] mb-6 overflow-hidden rounded-full"
          style={{
            width: inView ? "48px" : "0px",
            transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 200}ms`,
          }}
        >
          <div ref={innerLineRef} className="w-full h-full" />
        </div>

        {/* Title — letter stagger */}
        <h3 className="font-sans text-sm uppercase tracking-[0.2em] text-white mb-3 overflow-hidden">
          {item.title.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: inView ? "translateY(0)" : "translateY(100%)",
                opacity: inView ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + 300 + i * 30}ms, opacity 0.4s ease ${baseDelay + 300 + i * 30}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>

        {/* Description */}
        <p
          className="font-sans text-sm leading-relaxed text-white/50"
          style={{
            transform: inView ? "translateY(0)" : "translateY(15px)",
            opacity: inView ? 1 : 0,
            transition: `all 0.7s ease ${baseDelay + 500}ms`,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Heading text reveal — character by character with wave
  useEffect(() => {
    if (!inView || !headingRef.current) return;
    const el = headingRef.current;
    const text = "The Experience";
    el.innerHTML = "";
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.cssText = `
        display:inline-block;
        transform:translateY(100%) rotateX(-80deg);
        opacity:0;
        transition:transform 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 40}ms, opacity 0.6s ease ${200 + i * 40}ms;
      `;
      el.appendChild(span);
      // Trigger transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          span.style.transform = "translateY(0) rotateX(0deg)";
          span.style.opacity = "1";
        });
      });
    });
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0F0F0F] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(27,94,59,0.06) 0%, transparent 70%)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.5)",
          transition: "all 2s ease",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p
            className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            What We Offer
          </p>

          <h2
            ref={headingRef}
            className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight mb-6 overflow-hidden"
            style={{ perspective: "600px" }}
          >
            The Experience
          </h2>

          <p
            className="text-lg text-white/50 leading-relaxed"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 600ms",
            }}
          >
            What makes Jacob&apos;s Brew House different isn&apos;t one thing &mdash; it&apos;s everything. Every detail, from the aroma that greets you at the door to the last sip of your espresso, is designed to be memorable.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((item, i) => (
            <ExperienceCard key={item.num} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
