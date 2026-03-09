import Image from "next/image";
import Link from "next/link";
import TestimonialsSection from "@/components/TestimonialsSection";
import DishesSection from "@/components/DishesSection";

/* Plain wrapper — no animation, just renders children visibly */
function FadeUp({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

/* ══════════════════════════════════════════════
   1. HERO SECTION
   ══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-2.jpg"
          alt="Jacob's Brew House hero"
          fill
          priority
          className="object-cover scale-110"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p
          className="mb-6 text-xs uppercase tracking-[0.3em] text-white/70 font-sans animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          EST. 2024 &mdash; PREMIUM CAF&Eacute;
        </p>

        <div className="overflow-hidden">
          <h1
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-white animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            JACOB&apos;S
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-white animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            BREW HOUSE
          </h1>
        </div>

        {/* Decorative line */}
        <div
          className="mt-8 h-px bg-white/40 animate-width-expand"
          style={{ animationDelay: "1s" }}
        />

        {/* Tagline */}
        <p
          className="mt-6 text-sm md:text-base font-sans tracking-[0.2em] text-white/70 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
        >
          Where every cup tells a story
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.8s" }}>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-sans">
          Scroll for more
        </span>
        <svg
          className="h-5 w-5 text-white/50 animate-bounce-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   2. INTRODUCTION / MISSION SECTION
   ══════════════════════════════════════════════ */
function IntroductionSection() {
  return (
    <section className="bg-[#0A0A0A] py-32 px-6 md:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        <div className="lg:col-span-2">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-brand-green" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-sans">
                Our Philosophy
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative overflow-hidden rounded-lg aspect-[3/4] group">
              <Image
                src="/images/food/coffee-brewing.jpg"
                alt="Coffee brewing at Jacob's Brew House"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-center">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-8">
              Redefining the caf&eacute; experience through elegance, craft, and community.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-2xl">
              At Jacob&apos;s Brew House, we blend European sophistication with warm hospitality.
              Every detail &mdash; from our hand-selected beans to our artisan interiors &mdash; is
              designed to create moments worth savoring.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white hover:text-brand-green transition-colors duration-300 font-sans"
              >
                Our Story
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white hover:text-brand-green transition-colors duration-300 font-sans"
              >
                Visit Us
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  &rarr;
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   3. FEATURED SPACES SHOWCASE
   ══════════════════════════════════════════════ */
const spaces = [
  {
    image: "/images/interior/main-hall.jpg",
    title: "The Main Hall",
    desc: "Grand double-height dining with industrial charm and European flair",
  },
  {
    image: "/images/interior/swings.jpg",
    title: "The Swing Lounge",
    desc: "Playful suspended seating for a unique dining experience",
  },
  {
    image: "/images/interior/terrace.jpg",
    title: "Garden Terrace",
    desc: "Al fresco dining surrounded by lush tropical greenery",
  },
  {
    image: "/images/interior/photobooth.jpg",
    title: "The Photo Booth",
    desc: "Capture memories in our vintage-inspired photo corner",
  },
];

function SpacesSection() {
  return (
    <section className="w-full py-32 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-xs md:text-sm uppercase tracking-[0.35em] text-white/50 font-sans mb-16">
          Experience Our Spaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map((space) => (
            <div
              key={space.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ease-out hover:scale-[1.04] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(27,94,59,0.15)] hover:-translate-y-2 hover:rotate-[0.5deg]"
            >
              {/* Image with zoom */}
              <Image
                src={space.image}
                alt={space.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay that lightens with green tint on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/60 group-hover:via-brand-green-dark/20 group-hover:to-transparent" />

              {/* Green glow border on hover */}
              <div className="absolute inset-0 rounded-lg border border-transparent transition-all duration-500 group-hover:border-brand-green/40 group-hover:shadow-[inset_0_0_40px_rgba(27,94,59,0.2)]" />

              {/* Number badge */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-serif text-lg text-white/40 transition-all duration-500 group-hover:border-brand-green/60 group-hover:text-brand-green-light group-hover:scale-110 group-hover:rotate-12">
                {String(spaces.indexOf(space) + 1).padStart(2, "0")}
              </div>

              {/* Text content that lifts on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 group-hover:-translate-y-4">
                {/* Decorative line */}
                <div className="w-0 h-[2px] bg-brand-green mb-4 transition-all duration-700 ease-out group-hover:w-16" />
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 transition-colors duration-300 group-hover:text-brand-green-light">
                  {space.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed transition-all duration-500 group-hover:text-white/90">
                  {space.desc}
                </p>
                {/* Explore text that appears on hover */}
                <span className="inline-block mt-4 text-xs uppercase tracking-[0.25em] text-brand-green opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   4. MARQUEE / HORIZONTAL SCROLLING TEXT
   ══════════════════════════════════════════════ */
function MarqueeSection() {
  const text = "COFFEE \u2014 PIZZA \u2014 COCKTAILS \u2014 BRUNCH \u2014 DESSERTS \u2014 VIBES \u2014 ";
  const repeated = text.repeat(6);

  return (
    <section className="overflow-hidden py-8 border-y border-white/10 select-none">
      <div className="marquee mb-4">
        <div className="marquee-content">
          <span
            className="text-6xl md:text-8xl font-serif text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "2px #1B5E3B" }}
          >
            {repeated}
          </span>
          <span
            className="text-6xl md:text-8xl font-serif text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "2px #1B5E3B" }}
          >
            {repeated}
          </span>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-content-reverse">
          <span
            className="text-6xl md:text-8xl font-serif text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "2px #1B5E3B" }}
          >
            {repeated}
          </span>
          <span
            className="text-6xl md:text-8xl font-serif text-transparent whitespace-nowrap"
            style={{ WebkitTextStroke: "2px #1B5E3B" }}
          >
            {repeated}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   5. FEATURED DISHES SECTION — see DishesSection component
   ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   6. PHILOSOPHY / STORY SECTION
   ══════════════════════════════════════════════ */
function PhilosophySection() {
  return (
    <section className="bg-[#0F0F0F] py-32 px-6 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Main image with hover parallax + reveal frame */}
        <div className="group relative">
          {/* Decorative offset border that shifts on hover */}
          <div className="absolute -inset-4 border border-brand-green/20 rounded-2xl transition-all duration-700 ease-out group-hover:-inset-6 group-hover:border-brand-green/40 group-hover:rotate-1" />
          {/* Floating green accent square */}
          <div className="absolute -top-8 -right-8 w-24 h-24 border border-brand-green/30 rounded-lg transition-all duration-700 ease-out group-hover:-top-12 group-hover:-right-12 group-hover:rotate-12 group-hover:border-brand-green/50 group-hover:scale-110" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-700 ease-out group-hover:rounded-2xl group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_60px_rgba(27,94,59,0.1)]">
            <Image
              src="/images/interior/lounge.jpg"
              alt="Jacob's Brew House lounge"
              fill
              className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-115 group-hover:rotate-1"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Green overlay shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green-dark/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            {/* Corner accent text */}
            <div className="absolute top-6 left-6 flex items-center gap-3 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
              <div className="w-8 h-[1px] bg-brand-green" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-sans">Since 2024</span>
            </div>
          </div>
        </div>

        {/* Right — Text content with interactive elements */}
        <div>
          {/* Section label with animated line */}
          <div className="group/label flex items-center gap-4 mb-8 cursor-default">
            <div className="h-px w-12 bg-brand-green transition-all duration-500 group-hover/label:w-20 group-hover/label:bg-brand-green-light" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/50 font-sans transition-colors duration-300 group-hover/label:text-brand-green-light">
              From Bean to Cup
            </span>
          </div>

          {/* Heading with individual word hover effects */}
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.15] text-white mb-6">
            <span className="inline-block transition-all duration-300 hover:text-brand-green-light hover:-translate-y-1 hover:drop-shadow-[0_4px_12px_rgba(27,94,59,0.3)] cursor-default">Designing </span>
            <span className="inline-block transition-all duration-300 hover:text-brand-green-light hover:-translate-y-1 hover:drop-shadow-[0_4px_12px_rgba(27,94,59,0.3)] cursor-default">Experiences </span>
            <span className="inline-block transition-all duration-300 hover:text-brand-green-light hover:-translate-y-1 hover:drop-shadow-[0_4px_12px_rgba(27,94,59,0.3)] cursor-default">That </span>
            <span className="inline-block transition-all duration-300 hover:text-brand-green-light hover:-translate-y-1 hover:drop-shadow-[0_4px_12px_rgba(27,94,59,0.3)] cursor-default">Resonate</span>
          </h2>

          {/* Paragraph with left border that glows on hover */}
          <div className="group/text relative pl-6 mb-10 cursor-default">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 transition-all duration-500 group-hover/text:bg-brand-green group-hover/text:shadow-[0_0_12px_rgba(27,94,59,0.4)]" />
            <p className="text-lg text-white/60 leading-relaxed max-w-xl transition-colors duration-500 group-hover/text:text-white/80">
              Every detail we craft, from our specialty pour-over station to our handpicked
              interiors, is rooted in a passion for quality, community, and the belief that great
              spaces make great conversations.
            </p>
          </div>

          {/* Second image with hover reveal overlay */}
          <div className="group/img relative w-3/4 ml-auto aspect-[4/3] overflow-hidden rounded-xl transition-all duration-700 ease-out hover:rounded-2xl hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(27,94,59,0.12)]">
            <Image
              src="/images/interior/lounge-2.jpg"
              alt="Jacob's Brew House lounge detail"
              fill
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover/img:scale-120 group-hover/img:-rotate-1"
              sizes="(max-width: 1024px) 75vw, 35vw"
            />
            {/* Green tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-bl from-brand-green-dark/20 via-transparent to-black/40 opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />
            {/* Glow border */}
            <div className="absolute inset-0 rounded-xl border border-transparent transition-all duration-500 group-hover/img:border-brand-green/30 group-hover/img:shadow-[inset_0_0_40px_rgba(27,94,59,0.15)] group-hover/img:rounded-2xl" />
            {/* Corner detail */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 translate-y-3 transition-all duration-500 group-hover/img:opacity-100 group-hover/img:translate-y-0">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-sans">Our Space</span>
              <div className="w-6 h-[1px] bg-brand-green" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   8. CTA SECTION
   ══════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-1.jpg"
          alt="Jacob's Brew House ambiance"
          fill
          className="object-cover scale-110"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-6">
        <FadeUp>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-snug">
            Ready to experience
            <br />
            Jacob&apos;s Brew House?
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <Link
            href="/contact"
            className="inline-block bg-brand-green text-white font-sans text-sm uppercase tracking-[0.2em] px-12 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(27,94,59,0.4)]"
          >
            Reserve a Table
          </Link>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="mt-6 text-sm text-white/40 font-sans">
            Or just walk in &mdash; we love surprises
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <SpacesSection />
      <MarqueeSection />
      <DishesSection />
      <PhilosophySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
