"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes('/admin')) return null;

  return (
    <footer className="bg-brand-50 border-t border-brand-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-serif text-2xl mb-4 text-brand-dark">HairByTofunmi</p>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Transforming hair dreams into reality with elegance, style, and care.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500 tracking-wide">
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/contact">Contact</Link>
        </div>
        <p className="text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} HairByTofunmi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
