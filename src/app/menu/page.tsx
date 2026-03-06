"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";


/* ─── Menu Data ─── */

interface MenuItem {
  name: string;
  description: string;
  price: number;
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
  featuredImage?: string;
}

const menuSections: MenuSection[] = [
  {
    id: "coffee",
    label: "Coffee & Beverages",
    items: [
      { name: "Espresso", description: "Bold, rich, and intense", price: 180 },
      { name: "Cappuccino", description: "Velvety foam meets robust espresso", price: 220 },
      { name: "Flat White", description: "Smooth microfoam with a double shot", price: 240 },
      { name: "Pour Over", description: "Single-origin, hand-brewed to perfection", price: 280 },
      { name: "Cold Brew", description: "18-hour steeped, smooth and refreshing", price: 250 },
      { name: "Matcha Latte", description: "Ceremonial grade matcha with steamed milk", price: 260 },
      { name: "Chai Latte", description: "Spiced Indian chai with creamy froth", price: 200 },
      { name: "Fresh Juices", description: "Seasonal fruits, cold-pressed daily", price: 180 },
    ],
    featuredImage: "/images/food/coffee-brewing.jpg",
  },
  {
    id: "starters",
    label: "Starters",
    items: [
      { name: "Bruschetta Trio", description: "Tomato basil, mushroom truffle, avocado", price: 320 },
      { name: "Chicken Skewers", description: "Glazed with house-made teriyaki", price: 380 },
      { name: "Truffle Fries", description: "Parmesan, truffle oil, fresh herbs", price: 280 },
      { name: "Soup of the Day", description: "Chef's seasonal creation", price: 220 },
      { name: "Hummus Platter", description: "Classic, roasted garlic, beetroot", price: 300 },
      { name: "Stuffed Mushrooms", description: "Cream cheese, herbs, garlic butter", price: 340 },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 450 },
      { name: "Truffle Mushroom Pizza", description: "Wild mushrooms, truffle cream, arugula", price: 550 },
      { name: "Grilled Chicken Steak", description: "Herb-marinated, served with roasted vegetables", price: 520 },
      { name: "Pasta Aglio e Olio", description: "Spaghetti, garlic, chili flakes, olive oil", price: 420 },
      { name: "Buddha Bowl", description: "Quinoa, roasted veg, tahini dressing", price: 400 },
      { name: "Fish & Chips", description: "Beer-battered, tartare sauce, mushy peas", price: 480 },
    ],
    featuredImage: "/images/food/food-3.jpg",
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Tiramisu", description: "Classic Italian, mascarpone, espresso-soaked ladyfingers", price: 350 },
      { name: "Chocolate Fondant", description: "Molten center, vanilla ice cream", price: 380 },
      { name: "Cr\u00e8me Br\u00fbl\u00e9e", description: "Vanilla bean, caramelized sugar crust", price: 320 },
      { name: "Affogato", description: "Vanilla gelato drowned in hot espresso", price: 280 },
      { name: "Cheesecake", description: "New York style, berry compote", price: 340 },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    items: [
      { name: "Espresso Martini", description: "Vodka, Kahl\u00faa, fresh espresso", price: 550 },
      { name: "Aperol Spritz", description: "Aperol, prosecco, soda", price: 500 },
      { name: "Old Fashioned", description: "Bourbon, bitters, orange zest", price: 580 },
      { name: "Mojito", description: "White rum, lime, mint, soda", price: 480 },
      { name: "Negroni", description: "Gin, Campari, sweet vermouth", price: 550 },
      { name: "Jacob\u2019s Special", description: "Our secret house blend cocktail", price: 620 },
    ],
  },
];

/* ─── Single Menu Item Row ─── */
function MenuItemRow({ item }: { item: MenuItem; index: number }) {
  return (
    <div className="group flex items-baseline gap-2 py-4 cursor-default transition-all duration-300 hover:translate-x-2 hover:brightness-125">

      <div className="shrink-0">
        <h3 className="font-serif text-xl text-white group-hover:text-brand-cream transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-sm text-white/50 font-sans mt-0.5">{item.description}</p>
      </div>
      <div className="flex-1 border-b border-dotted border-white/20 translate-y-[-4px] min-w-[40px]" />
      <span className="shrink-0 font-sans text-lg text-brand-gold font-medium tracking-wide">
        &#8377;{item.price}
      </span>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-6 mb-12">

      <h2 className="font-serif text-3xl md:text-4xl text-white whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

/* ─── Menu Section Block ─── */
function MenuSectionBlock({
  section,
  sectionRef,
}: {
  section: MenuSection;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <section id={section.id} ref={sectionRef} className="py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <SectionHeading title={section.label} />
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className={`flex-1 grid grid-cols-1 ${section.featuredImage ? "md:grid-cols-1" : "md:grid-cols-2"} gap-x-12`}>
            {section.items.map((item, i) => (
              <MenuItemRow key={item.name} item={item} index={i} />
            ))}
          </div>
          {section.featuredImage && (
            <FeaturedImage src={section.featuredImage} alt={section.label} />
          )}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-24">
        <div className="h-px bg-white/5" />
      </div>
    </section>
  );
}

/* ─── Featured Image ─── */
function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full lg:w-[340px] h-[300px] lg:h-[420px] shrink-0 rounded-lg overflow-hidden">

      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 340px" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(menuSections[0].id);

  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  menuSections.forEach((section) => {
    if (!sectionRefs.current[section.id]) {
      sectionRefs.current[section.id] = { current: null };
    }
  });

  const handleTabClick = useCallback((id: string) => {
    setActiveTab(id);
    const ref = sectionRefs.current[id];
    if (ref?.current) {
      const yOffset = -100;
      const y = ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <main className="bg-[#0A0A0A] text-[#F5F0EB] min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/images/food/food-1.jpg" alt="Jacob's Brew House Menu" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6">
          <p className="uppercase tracking-[0.3em] text-sm text-brand-gold font-sans mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>Our Menu</p>
          <h1 className="font-serif text-6xl md:text-8xl text-white leading-[1.05] animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Crafted for<br />Every Palate
          </h1>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <nav className="flex md:justify-center overflow-x-auto scrollbar-hide gap-1 px-4 md:px-0 py-1" aria-label="Menu categories">
            {menuSections.map((section) => {
              const isActive = activeTab === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleTabClick(section.id)}
                  className={`relative whitespace-nowrap px-5 py-4 text-sm font-sans uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white/75"
                  }`}
                >
                  {section.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <MenuSectionBlock key={section.id} section={section} sectionRef={sectionRefs.current[section.id]} />
      ))}
    </main>
  );
}
