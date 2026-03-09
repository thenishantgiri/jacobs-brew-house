"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    quote:
      "Jacob\u2019s Brew House transformed our idea of what a caf\u00e9 could be. The atmosphere, the food, the coffee \u2014 everything is impeccable.",
    name: "Priya M.",
    role: "Food Blogger",
  },
  {
    quote:
      "The interiors alone are worth the visit. Add in their artisan pizza and specialty brews, and you have the perfect spot.",
    name: "Arjun S.",
    role: "Architect",
  },
  {
    quote:
      "My go-to place for both work meetings and weekend brunches. The attention to detail is extraordinary.",
    name: "Meera K.",
    role: "Entrepreneur",
  },
];

const AUTO_PLAY_MS = 6000;

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = testimonials[idx];

  const goTo = useCallback(
    (i: number) => {
      if (i === idx) return;
      setIdx(i);
      setAnimKey((k) => k + 1);
    },
    [idx]
  );

  const next = useCallback(() => {
    const nextIdx = (idx + 1) % testimonials.length;
    goTo(nextIdx);
  }, [idx, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idx, isPaused, next]);

  // Split quote into words for staggered reveal
  const words = t.quote.split(" ");

  return (
    <section
      className="py-32 px-6 md:px-8 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow behind the quote */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          key={`glow-${animKey}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-0 animate-[glowPulse_3s_ease-in-out_forwards]"
          style={{
            background:
              "radial-gradient(circle, rgba(27,94,59,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl text-center relative z-10">
        {/* Section heading with line animation */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <div
            key={`line-l-${animKey}`}
            className="h-px bg-gradient-to-r from-transparent to-white/20 w-0 animate-[expandLine_1s_ease-out_forwards]"
          />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50 font-sans shrink-0">
            What Our Guests Say
          </h2>
          <div
            key={`line-r-${animKey}`}
            className="h-px bg-gradient-to-l from-transparent to-white/20 w-0 animate-[expandLine_1s_ease-out_forwards]"
          />
        </div>

        {/* Decorative animated quote mark */}
        <div className="relative">
          <span
            key={`q-${animKey}`}
            className="absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[120px] md:text-[180px] leading-none text-brand-green/0 select-none pointer-events-none animate-[quoteMarkIn_1.2s_ease-out_forwards]"
          >
            &ldquo;
          </span>

          {/* Quote — staggered word reveal */}
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug text-white mb-10 max-w-3xl mx-auto relative z-10 min-h-[140px] md:min-h-[120px]">
            {words.map((word, i) => (
              <span
                key={`${animKey}-${i}`}
                className="inline-block opacity-0 translate-y-4 animate-[wordReveal_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </p>
        </div>

        {/* Author — slides up after quote finishes */}
        <div
          key={`author-${animKey}`}
          className="opacity-0 translate-y-6 animate-[slideUp_0.6s_ease-out_forwards]"
          style={{ animationDelay: `${words.length * 40 + 200}ms` }}
        >
          <p className="font-sans text-sm tracking-[0.15em] text-white/50 mb-12">
            {t.name},{" "}
            <span className="text-white/40">{t.role}</span>
          </p>
        </div>

        {/* Dot indicators with progress ring on active */}
        <div className="flex items-center justify-center gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View testimonial ${i + 1}`}
              className="relative w-6 h-6 flex items-center justify-center cursor-pointer group"
            >
              {/* The dot */}
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === idx
                    ? "w-3 h-3 bg-brand-green shadow-[0_0_12px_rgba(27,94,59,0.5)]"
                    : "w-2.5 h-2.5 bg-white/25 group-hover:bg-white/40"
                }`}
              />
              {/* Progress ring around active dot */}
              {i === idx && !isPaused && (
                <svg
                  key={`ring-${animKey}`}
                  className="absolute inset-0 w-6 h-6 -rotate-90"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="rgba(27,94,59,0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="62.83"
                    strokeDashoffset="62.83"
                    className="animate-[progressRing_6s_linear_forwards]"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Inline keyframes — bypasses Turbopack CSS cache */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wordReveal { to{opacity:1;transform:translateY(0)} }
        @keyframes quoteMarkIn { 0%{color:rgba(27,94,59,0);transform:translateX(-50%) scale(0.5) rotate(-10deg)} 50%{color:rgba(27,94,59,0.08)} 100%{color:rgba(27,94,59,0.06);transform:translateX(-50%) scale(1) rotate(0deg)} }
        @keyframes glowPulse { 0%{opacity:0;transform:translate(-50%,-50%) scale(0.5)} 50%{opacity:1} 100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)} }
        @keyframes expandLine { to{width:60px} }
        @keyframes progressRing { to{stroke-dashoffset:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}} />
    </section>
  );
}
