
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
      {/* 1. Apply font variables and base classes here */}
      <body className={`min-h-screen antialiased ${playfair.variable} ${lato.variable}`}>
        {/* 2. FIX: AuthContextProvider MUST wrap all child components that need its state */}
        <AuthContextProvider>
          {/* 3. The main content starts here */}
          <Navbar />
          {/* Ensure main has min-h-screen to push footer down */}
          <main>
            {children}
          </main>
          <Footer />
          
          {/* Toaster should be inside the body and usually outside the main layout components */}
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
