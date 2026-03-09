"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 lg:py-5">
          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <Image
              src="/images/brand/logo.png"
              alt="Jacob's Brew House"
              width={120}
              height={40}
              className="h-8 lg:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative uppercase tracking-[0.2em] text-sm font-sans text-white transition-colors duration-300 hover:text-brand-green-light"
                  >
                    <span
                      className={
                        isActive ? "text-brand-green-light" : ""
                      }
                    >
                      {link.label}
                    </span>
                    {/* Hover underline animation - slides in from left */}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-brand-green-light transition-all duration-300 ease-out ${
                        isActive
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Reserve CTA */}
          <Link
            href="/contact"
            className="hidden lg:block relative z-50 uppercase tracking-[0.2em] text-sm font-sans text-white bg-brand-green px-7 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-brand-green-light"
          >
            Reserve
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative z-50 flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-[6px]"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={
                mobileOpen
                  ? { rotate: 45, y: 3.75 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={
                mobileOpen
                  ? { rotate: -45, y: -3.75 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            style={{ backgroundColor: "rgba(10, 10, 10, 0.98)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`uppercase tracking-[0.2em] text-2xl font-sans transition-colors duration-300 ${
                        isActive
                          ? "text-brand-green-light"
                          : "text-white hover:text-brand-green-light"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Reserve Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + navLinks.length * 0.08,
                  ease: "easeOut",
                }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="uppercase tracking-[0.2em] text-sm font-sans text-white bg-brand-green px-8 py-3 rounded-full transition-all duration-300 hover:bg-brand-green-light"
                >
                  Reserve
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
