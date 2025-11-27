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
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${playfair.variable} ${lato.variable} flex flex-col`}>
        <AuthContextProvider>
          <Navbar />
          {/* Added flex-grow and padding-top to compensate for the fixed Navbar height (defined in globals.css) */}
          <main className="flex-grow pt-[var(--navbar-height)]"> 
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
