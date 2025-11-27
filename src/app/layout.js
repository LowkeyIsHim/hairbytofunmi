import { Playfair_Display, Lato } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

// 1. Correct Font Variable Names for Clarity
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

// 2. Wrap Layout with AuthContextProvider (Best Practice)
export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en">
        {/* 💡 REVERTING TO HTML <style> TAG INJECTION 💡 */}
        {/* This avoids the 'styled-jsx' syntax failure and is robust. */}
        <head>
          <style dangerouslySetInnerHTML={{__html: `
            /* Defining CSS Variables for Theming */
            :root {
              --foreground-rgb: 26, 26, 26; /* brand-dark */
              --background-rgb: 247, 244, 240; /* brand-cream */
            }
            /* Dark Mode Overrides */
            :root.dark {
              --foreground-rgb: 247, 244, 240; /* brand-cream */
              --background-rgb: 26, 26, 26; /* brand-dark */
            }
            body {
              color: rgb(var(--foreground-rgb));
              background: radial-gradient(at 0% 0%, #ffffff 0px, var(--background-rgb) 50%);
              background-attachment: fixed;
              transition: background-color 0.3s, color 0.3s;
            }
          `}} />
        </head>
        
        {/* 3. Apply Font Classes to the body tag */}
        <body 
            className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}
        >
            <Toaster />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </body>
      </html>
    </AuthContextProvider>
  );
}
