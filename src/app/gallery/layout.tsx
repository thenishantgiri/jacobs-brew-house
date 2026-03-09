import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the spaces of Jacob's Brew House — the main hall, swing lounge, garden terrace, and photo booth in Malviya Nagar, Jaipur.",
  alternates: {
    canonical: "https://www.jacobbrewhouse.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
