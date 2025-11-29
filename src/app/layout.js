// src/app/layout.js (FIXED & OPTIMIZED)

import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWrapper from "@/components/LayoutWrapper"; // <-- NEW IMPORT

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});
const lato = Lato({ 
  weight: ['300', '400', '700'], 
  subsets: ["latin"], 
  variable: "--font-lato" 
});

export const metadata = {
  title: "HairByTofunmi | Premium Styling",
  description: "Transforming hair dreams into reality.",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}>
        <ThemeProvider> 
          <AuthContextProvider>
            {/* EVERYTHING is now wrapped in LayoutWrapper, which handles conditional rendering */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
