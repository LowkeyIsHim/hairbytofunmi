// app/layout.tsx (The final, fixed code)

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
// NOTE: We don't import Navbar, Footer, or DataProvider here anymore
import LayoutWrapper from "@/components/LayoutWrapper"; // <-- Import the new wrapper

// Elegant, sophisticated serif font for headings
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair',
  weight: ['400', '700', '900']
});

// Clean, modern sans-serif font for body text
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "HairByTofunmi | Premium Styling & Protective Hair Care",
  description: "Transforming hair dreams into reality with elegance, style, and care. Specializing in luxury braids, twists, and locs. Book your appointment via WhatsApp.",
  keywords: ["HairByTofunmi", "braids", "locs", "twists", "stylist", "premium hair", "lagos stylist"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-secondary text-dark antialiased`}>
        {/* The entire application UI (which includes the context) is now nested here */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
