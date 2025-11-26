import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-heading text-accent">HairByTofunmi</a>
        </Link>
        <nav className="space-x-6 hidden md:flex">
          <Link href="/services"><a>Services</a></Link>
          <Link href="/portfolio"><a>Portfolio</a></Link>
          <Link href="/about"><a>About</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
        </nav>
      </div>
    </header>
  );
    }
