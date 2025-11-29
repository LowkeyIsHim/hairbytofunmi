// src/app/layout.js (Updated)

import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext"; // <-- NEW IMPORT
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    // NOTE: Removed the 'dark' class application from <html> tag here.
    // The ThemeContext component will handle applying the 'dark' class to the document root now.
    <html lang="en">
      <body className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}>
        {/* Wrap everything that needs theme/auth context */}
        <ThemeProvider> 
          <AuthContextProvider>
            <Navbar />
            <main>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
