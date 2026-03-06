"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    __jbhSplashPlayed?: boolean;
  }
}

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.__jbhSplashPlayed) {
      setShow(false);
      return;
    }
    window.__jbhSplashPlayed = true;

    const timer = setTimeout(() => setShow(false), 3400);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="jbh-splash" aria-hidden="true">
      <img
        className="jbh-splash-monogram"
        src="/images/brand/monogram.png"
        alt=""
        width={110}
        height={110}
        style={{ marginBottom: 16 }}
      />
      <img
        className="jbh-splash-logo"
        src="/images/brand/logo.png"
        alt="Jacob's Brew House"
        width={260}
        height={78}
      />
    </div>
  );
}
