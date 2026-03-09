"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const dishes = [
  {
    image: "/images/food/food-1.jpg",
    title: "Artisan Pizzas",
    num: "01",
    description:
      "Wood-fired to perfection with San Marzano tomatoes, hand-stretched dough, and locally sourced toppings.",
    review: "The best pizza I\u2019ve had outside of Naples.",
    reviewer: "Rahul D.",
  },
  {
    image: "/images/food/food-2.jpg",
    title: "Gourmet Skewers",
    num: "02",
    description:
      "Tender, marinated cuts grilled over open flame and finished with our signature herb glaze.",
    review:
      "Perfectly charred, incredibly flavourful \u2014 we ordered seconds.",
    reviewer: "Sneha T.",
  },
  {
    image: "/images/food/food-3.jpg",
    title: "Fresh Salads & Bowls",
    num: "03",
    description:
      "Seasonal greens, house-made dressings, and vibrant toppings for a lighter indulgence.",
    review:
      "Light yet satisfying \u2014 the dressing alone is worth the visit.",
    reviewer: "Ananya R.",
  },
  {
    image: "/images/food/food-4.jpg",
    title: "Specialty Coffee",
    num: "04",
    description:
      "Single-origin beans, expertly roasted and brewed to bring out delicate, complex notes.",
    review: "The pour-over here rivals the best caf\u00e9s in Melbourne.",
    reviewer: "Karan J.",
  },
  {
    image: "/images/food/food-5.jpg",
    title: "Herb-Crusted Rice Bowl",
    num: "05",
    description:
      "Fragrant basmati rice tossed with seasonal vegetables, topped with succulent herb-crusted chicken and fresh microgreens.",
    review: "Comfort food elevated \u2014 every bite feels like home, but fancier.",
    reviewer: "Vikram P.",
  },
  {
    image: "/images/food/food-6.jpg",
    title: "Classic Pepperoni",
    num: "06",
    description:
      "Our golden, crispy-edged pepperoni pizza with spiced salami, rich tomato sauce, and bubbling mozzarella.",
    review: "Crispy, cheesy, perfectly spiced \u2014 this is pizza done right.",
    reviewer: "Diya M.",
  },
];

export default function DishesSection() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggle = (num: string) => {
    setFlipped((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <section className="py-32 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50 font-sans mb-16">
          Crafted with Passion
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-8 pb-4 no-scrollbar">
        {dishes.map((dish) => (
          <div key={dish.num} className="flex-shrink-0 snap-start">
            <div className="group w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw]">
              {/* 3D flip container */}
              <div
                className="relative aspect-[3/4] mb-4 cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => toggle(dish.num)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped[dish.num]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* ── FRONT FACE ── */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-xl transition-all duration-500 ease-out group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(27,94,59,0.15)] group-hover:rounded-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-125 group-hover:rotate-2"
                      sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, 28vw"
                    />
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-all duration-500 group-hover:from-black/40 group-hover:via-brand-green-dark/10" />
                    {/* Green glow border */}
                    <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-500 group-hover:border-brand-green/40 group-hover:shadow-[inset_0_0_50px_rgba(27,94,59,0.2)] group-hover:rounded-2xl" />
                    {/* Centered label on hover */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs uppercase tracking-[0.3em] text-white font-sans px-6 py-3 border border-white/0 rounded-full opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-white/30 group-hover:backdrop-blur-sm group-hover:bg-white/5">
                        View Dish
                      </span>
                    </div>
                  </div>

                  {/* ── BACK FACE ── */}
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden bg-[#111] border border-white/10 flex flex-col items-center justify-center px-8 text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(27,94,59,0.15),transparent_60%)]" />

                    <div className="relative z-10 flex flex-col items-center gap-6 max-w-[85%]">
                      {/* Number */}
                      <span className="font-serif text-6xl text-brand-green/20">
                        {dish.num}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif text-2xl md:text-3xl text-white">
                        {dish.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-sm leading-relaxed text-white/60">
                        {dish.description}
                      </p>

                      {/* Divider */}
                      <div className="w-12 h-px bg-brand-green/40" />

                      {/* Review */}
                      <p className="font-serif italic text-base text-white/80 leading-relaxed">
                        &ldquo;{dish.review}&rdquo;
                      </p>
                      <p className="font-sans text-xs tracking-[0.15em] text-white/40 uppercase">
                        {dish.reviewer}
                      </p>

                      {/* Gallery link */}
                      <Link
                        href="/gallery"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-brand-green-light hover:text-white transition-colors duration-300"
                      >
                        View Gallery &rarr;
                      </Link>
                    </div>

                    {/* Tap to flip back hint */}
                    <p className="absolute bottom-4 font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">
                      Tap to flip back
                    </p>
                  </div>
                </div>
              </div>

              {/* Number — scales up and turns green on hover */}
              <span className="block font-serif text-8xl leading-none mb-2 transition-all duration-500 text-white/10 group-hover:text-brand-green/30 group-hover:scale-110 group-hover:-translate-x-2 origin-left">
                {dish.num}
              </span>
              {/* Title with underline that expands */}
              <div className="relative inline-block">
                <h3 className="font-serif text-xl md:text-2xl text-white transition-colors duration-300 group-hover:text-brand-green-light">
                  {dish.title}
                </h3>
                <div className="h-[2px] bg-brand-green mt-2 w-0 transition-all duration-700 ease-out group-hover:w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
