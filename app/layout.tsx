import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DataProvider } from "@/context/DataContext";

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
  title: "HairByTofunmi | Premium Hair Stylist & Loc Specialist",
  description: "Transforming hair dreams into reality with elegance and style. Specializing in braids, twists, and locs. Book your luxury styling appointment via WhatsApp.",
  // Add favicon here if you had the file
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-secondary text-dark antialiased`}>
        <DataProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </DataProvider>
      </body>
    </html>
  );
}
