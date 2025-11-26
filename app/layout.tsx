import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DataProvider } from "@/context/DataContext";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "HairByTofunmi | Premium Hair Stylist",
  description: "Transforming hair dreams into reality. Specializing in braids, twists, and locs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-secondary text-stone-800 antialiased`}>
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
