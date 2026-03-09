import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jacob's Brew House. Visit us at Malviya Nagar, Jaipur. Reservations, private events, and inquiries welcome.",
  alternates: {
    canonical: "https://www.jacobbrewhouse.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
