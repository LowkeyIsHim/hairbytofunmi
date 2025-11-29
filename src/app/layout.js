import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
      {/* Apply the base font variables globally.
        ThemeContext handles applying the 'dark' class to the root <html> tag. 
      */}
      <body className={`
        min-h-screen antialiased 
        ${playfair.variable} ${lato.variable} 
        font-lato 
        bg-brand-cream dark:bg-brand-dark 
        text-brand-dark dark:text-brand-cream
      `}>
        <ThemeProvider> 
          <AuthContextProvider>
            <Navbar />
            <main className="pt-24 min-h-screen"> 
              {/* Added pt-24 to main content to account for fixed navbar height */}
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
