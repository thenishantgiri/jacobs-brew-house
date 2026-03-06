"use client";

import { useState } from "react";
import Image from "next/image";

function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

/* ── FAQ data ── */
const faqs = [
  { question: "Do you take reservations?", answer: "Yes! You can reserve a table through our website, by calling us, or just walk in. We always keep a few tables for spontaneous visitors." },
  { question: "Is there parking available?", answer: "We have dedicated parking for 30+ vehicles, plus valet service on weekends." },
  { question: "Do you host private events?", answer: "Absolutely. Our upper deck and garden terrace can be reserved for private gatherings of up to 60 guests." },
  { question: "What are your signature dishes?", answer: "Our wood-fired Truffle Mushroom Pizza and Espresso Martini are crowd favorites. But we'd say everything on the menu is worth trying." },
];

/* ── FAQ Item ── */
function FAQItem({ item, index }: { item: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">

      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-6 text-left group cursor-pointer">
        <span className="font-serif text-xl md:text-2xl text-white/90 group-hover:text-white transition-colors duration-300">
          {item.question}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center text-white/50 group-hover:text-brand-green transition-all duration-300 text-2xl leading-none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.4s ease",
        }}
      >
        <p className="pb-6 text-white/50 leading-relaxed max-w-2xl font-sans">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/* ── Contact Page ── */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "General Inquiry", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0EB]">
      {/* 1. HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/images/interior/outdoor.jpg" alt="Jacob's Brew House outdoor seating" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/60 font-sans mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>Get In Touch</p>
          <h1 className="font-serif text-7xl md:text-9xl text-white animate-fade-in" style={{ animationDelay: "0.4s" }}>Let&rsquo;s Connect</h1>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT */}
          <div className="flex flex-col gap-10">
            <FadeUp>
              <h2 className="font-serif text-3xl md:text-4xl text-white">We&rsquo;d love to hear from you</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white/50 leading-relaxed max-w-md font-sans">
                Whether you&rsquo;re planning a private event, want to reserve a table, or just want to say hello — we&rsquo;re here for you.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 shrink-0 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-white/70 font-sans text-sm leading-relaxed">123 Brew Lane, Coffee District, City Center</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 shrink-0 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-white/70 font-sans text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 shrink-0 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-white/70 font-sans text-sm">hello@jacobsbrewhouse.com</span>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 shrink-0 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/70 font-sans text-sm">Monday — Sunday: 8:00 AM — 11:00 PM</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-8 pt-4">
                {["Instagram", "Facebook", "X"].map((platform) => (
                  <a key={platform} href="#" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-brand-green transition-colors duration-300 font-sans">
                    {platform}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — FORM */}
          <FadeUp delay={0.15}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-sm uppercase tracking-wide text-white/50 font-sans">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-white/50 font-sans">Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans appearance-none cursor-pointer">
                  {["General Inquiry", "Reservation", "Private Event", "Feedback", "Other"].map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0A0A0A] text-white">{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-white/50 font-sans">Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} className="bg-transparent border-b border-white/20 focus:border-brand-green text-white py-4 outline-none transition-colors duration-300 font-sans resize-none" />
              </div>
              <button type="submit" className="w-full bg-brand-green text-white py-4 rounded-lg font-sans text-sm uppercase tracking-[0.2em] hover:bg-brand-green/80 transition-colors duration-300 mt-4 cursor-pointer">
                Send Message
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* 3. MAP */}
      <FadeUp>
        <section className="relative w-full h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-[#111]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-brand-green/5 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-6">
            <svg className="w-8 h-8 text-brand-green mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <h3 className="font-serif text-2xl md:text-3xl text-white">Visit us at Jacob&rsquo;s Brew House</h3>
            <p className="text-white/40 font-sans text-sm tracking-wide">123 Brew Lane, Coffee District, City Center</p>
          </div>
        </section>
      </FadeUp>

      {/* 4. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-8">
        <FadeUp>
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 font-sans mb-4">FAQ</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Frequently Asked</h2>
          </div>
        </FadeUp>
        <div>
          {faqs.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
