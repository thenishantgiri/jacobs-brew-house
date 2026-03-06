"use client";

import { ReactNode } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <SplashScreen />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
