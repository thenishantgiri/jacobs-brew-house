"use client";

import { useState } from "react";

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

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section className="py-32 px-6 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50 font-sans mb-20">
          What Our Guests Say
        </h2>

        <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-snug text-white mb-10 max-w-3xl mx-auto">
          &ldquo;{t.quote}&rdquo;
        </p>
        <p className="font-sans text-sm tracking-[0.15em] text-white/50 mb-12">
          {t.name},{" "}
          <span className="text-white/40">{t.role}</span>
        </p>

        <div className="flex items-center justify-center gap-4">
          {testimonials.map((person, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-4 py-2 rounded-full text-sm font-sans cursor-pointer ${
                i === idx
                  ? "bg-brand-green text-white"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {person.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
