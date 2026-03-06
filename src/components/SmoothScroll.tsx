"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let rafId: number;

    import("@studio-freight/lenis").then((mod) => {
      const Lenis = mod.default;
      try {
        const lenis = new Lenis({
          lerp: 0.1,
          duration: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis init failed:", e);
      }
    }).catch((e) => {
      console.warn("Lenis import failed:", e);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisRef.current && typeof (lenisRef.current as { destroy: () => void }).destroy === "function") {
        (lenisRef.current as { destroy: () => void }).destroy();
      }
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
