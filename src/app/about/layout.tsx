import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the story behind Jacob's Brew House — a European-style cafe in Jaipur built on craft, community, and character.",
  alternates: {
    canonical: "https://www.jacobbrewhouse.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
