// src/app/layout.js (Refined)

import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css"; // Your main stylesheet
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar"; // Assuming Navbar is correctly imported
import Footer from "@/components/Footer"; // Assuming Footer is correctly imported
import { Toaster } from "react-hot-toast";

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
      <body 
        // Applying the font variables and a robust base class for min height
        className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}
      >
        <AuthContextProvider>
          <Navbar />
          {/* Main content area - flexible padding handled by individual pages/sections */}
          <main className="flex-grow pt-[var(--navbar-height)]"> {/* Adjust pt- to match navbar height */}
            {children}
          </main>
          <Footer />
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              }
            }}
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
