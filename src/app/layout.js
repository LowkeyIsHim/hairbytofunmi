import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
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
    icon: '/favicon.ico', // You can use the SVG code below to generate an ICO or SVG file
  }
};

// ... existing imports ...

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 💡 START OF EMBEDDED CSS FIX 💡 */}
      <style global jsx>{`
        /* Defining CSS Variables for Theming */
        :root {
          --foreground-rgb: 26, 26, 26;
          --background-rgb: 247, 244, 240;
        }
        /* Dark Mode Overrides */
        :root.dark {
          --foreground-rgb: 247, 244, 240;
          --background-rgb: 26, 26, 26;
        }
        body {
          color: rgb(var(--foreground-rgb));
          background: radial-gradient(at 0% 0%, #ffffff 0px, var(--background-rgb) 50%);
          background-attachment: fixed;
          transition: background-color 0.3s, color 0.3s;
        }
        /* Ensure the body font uses the configured Playfair Display */
        body {
            font-family: var(--font-sans);
        }
        /* NOTE: Tailwind classes like .btn-primary are still working via globals.css */
      `}</style>
      {/* 💡 END OF EMBEDDED CSS FIX 💡 */}
      
      <body className={`min-h-screen antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
