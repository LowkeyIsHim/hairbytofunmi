// src/components/LayoutWrapper.js

"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes('/admin');

  return (
    <>
      {/* Conditionally render Navbar/Footer based on the route */}
      {!isAdminRoute && <Navbar />}
      
      <main>
        {children}
      </main>
      
      {!isAdminRoute && <Footer />}

      {/* Toaster is usually fine everywhere */}
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
