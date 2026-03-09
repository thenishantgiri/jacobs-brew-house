import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jacobbrewhouse.com"),
  title: {
    default: "Jacob's Brew House | Premium Cafe Experience in Jaipur",
    template: "%s | Jacob's Brew House",
  },
  description:
    "Jacob's Brew House is a European-style premium cafe in Malviya Nagar, Jaipur offering artisan coffee, wood-fired pizzas, craft cocktails, and a refined atmosphere.",
  keywords: [
    "Jacob's Brew House",
    "cafe Jaipur",
    "premium cafe Malviya Nagar",
    "coffee Jaipur",
    "restaurant Jaipur",
    "European cafe India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jacob's Brew House",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="bg-[#0A0A0A] text-[#F5F0EB] font-sans antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Jacob's Brew House",
              description:
                "European-style premium cafe in Malviya Nagar, Jaipur offering artisan coffee, wood-fired pizzas, craft cocktails, and a refined atmosphere.",
              url: "https://www.jacobbrewhouse.com",
              telephone: "+917229966700",
              email: "info@jacobbrewhouse.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot No 7, JLN, Opp. Clarks Amer Hotel",
                addressLocality: "Malviya Nagar, Jaipur",
                addressRegion: "Rajasthan",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 26.8448925,
                longitude: 75.8025298,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday", "Sunday",
                ],
                opens: "08:00",
                closes: "23:00",
              },
              servesCuisine: ["European", "Italian", "Cafe"],
              priceRange: "$$",
              image: "https://www.jacobbrewhouse.com/images/hero-1.jpg",
            }),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
