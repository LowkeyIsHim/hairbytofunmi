// src/components/Navbar.js (Conceptual Upgrade)
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext'; // Assuming you have a useAuth hook

const Navbar = () => {
  const { user, logout } = useAuth(); // Example usage
  // You might want to define --navbar-height in globals.css based on this component's height
  return (
    <nav className="fixed top-0 left-0 w-full bg-brand-cream/90 dark:bg-brand-dark/90 backdrop-blur-sm z-50 shadow-md transition-colors duration-300 ease-in-out py-4 md:py-6">
      <div className="page-container flex justify-between items-center">
        {/* Logo - integrate your generated animated logo here */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace with your actual logo component or image */}
          <div className="w-10 h-10">
            {/* Example: <Image src="/path/to/your/animated-logo.gif" alt="HairByTofunmi Logo" width={40} height={40} /> */}
            {/* For now, text placeholder, but imagine the elegant gold logo */}
            <span className="text-brand-gold text-2xl font-serif font-bold">HBT</span>
          </div>
          <span className="hidden md:inline text-xl font-serif text-brand-dark dark:text-brand-cream tracking-wide">HairByTofunmi</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 md:space-x-10 font-sans text-brand-dark dark:text-brand-cream text-lg">
          <li><Link href="/services" className="hover:text-brand-gold transition-colors duration-200">Services</Link></li>
          <li><Link href="/portfolio" className="hover:text-brand-gold transition-colors duration-200">Portfolio</Link></li>
          <li><Link href="/about" className="hover:text-brand-gold transition-colors duration-200">About</Link></li>
          <li><Link href="/contact" className="hover:text-brand-gold transition-colors duration-200">Contact</Link></li>
          {user ? (
            <li><button onClick={logout} className="hover:text-brand-gold transition-colors duration-200">Logout</button></li>
          ) : (
            <li><Link href="/admin/login" className="hover:text-brand-gold transition-colors duration-200">Login</Link></li>
          )}
        </ul>

        {/* Mobile menu toggle (if you have one) */}
        {/* ... */}
      </div>
    </nav>
  );
};

export default Navbar;
