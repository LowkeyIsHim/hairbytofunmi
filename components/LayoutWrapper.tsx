// components/LayoutWrapper.tsx

"use client";

import { DataProvider } from "@/context/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This component uses the DataProvider and other client components
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      {/* All components that use client-side hooks (like useData) or 
        need to be guarded by DataProvider's logic MUST go here.
        The DataProvider's 'if (!isMounted)' check protects these children.
      */}
      <Navbar />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </DataProvider>
  );
}
