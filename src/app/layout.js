// src/app/layout.js (FIXED and UPGRADED)

import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { usePathname } from 'next/navigation'; // <-- NEW IMPORT (Must be used in a client component)

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

// --- CLIENT COMPONENT WRAPPER FOR CONDITIONAL RENDERING ---
const LayoutWrapper = ({ children }) => {
  // Use a client component to determine the current path
  const pathname = usePathname();
  
  // Decide if we are on an admin route
  const isAdminRoute = pathname.includes('/admin');

  return (
    <>
      {/* Navbar and Footer are only rendered if NOT an admin route */}
      {!isAdminRoute && <Navbar />}
      
      <main className={isAdminRoute ? "min-h-screen" : ""}>
        {children}
      </main>
      
      {!isAdminRoute && <Footer />}

      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          }
        }}
      />
    </>
  );
}
// --- END LayoutWrapper ---


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}>
        {/* Auth and Theme contexts must wrap the entire application */}
        <ThemeProvider> 
          <AuthContextProvider>
            {/* The conditional rendering logic is now inside the LayoutWrapper */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
