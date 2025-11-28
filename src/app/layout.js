import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

const lato = Lato({ 
  weight: ['300', '400', '700'], 
  subsets: ["latin"], 
  variable: "--font-lato",
  display: 'swap',
});

export const metadata = {
  title: "HairByTofunmi | Premium Styling",
  description: "Bespoke hair styling and protective styles for the modern woman.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen antialiased bg-brand-cream text-brand-dark">
        <AuthContextProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                fontFamily: 'var(--font-lato)',
              }
            }}
          />
        </AuthContextProvider>
      </body>
    </html>
  );
}
