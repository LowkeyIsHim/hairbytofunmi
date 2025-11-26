import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-30 border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-3" aria-label="HairByTofunmi home">
            <img src="/favicon.svg" alt="HairByTofunmi logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-semibold leading-tight">HairByTofunmi</h1>
              <p className="text-xs text-gray-500">Elegance • Style • Care</p>
            </div>
          </a>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex gap-6 items-center">
          <Link href="/services"><a className="hover:text-brand-600">Services</a></Link>
          <Link href="/portfolio"><a className="hover:text-brand-600">Portfolio</a></Link>
          <Link href="/about"><a className="hover:text-brand-600">About</a></Link>
          <Link href="/contact"><a className="hover:text-brand-600">Contact</a></Link>
          <Link href="/admin/login"><a className="px-3 py-2 bg-brand-500 text-white rounded-md shadow-sm hover:opacity-95">Admin</a></Link>
        </nav>

        <div className="md:hidden">
          <details className="relative">
            <summary className="px-3 py-2 rounded-md bg-white border">Menu</summary>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-3">
              <Link href="/services"><a className="block py-2">Services</a></Link>
              <Link href="/portfolio"><a className="block py-2">Portfolio</a></Link>
              <Link href="/about"><a className="block py-2">About</a></Link>
              <Link href="/contact"><a className="block py-2">Contact</a></Link>
              <Link href="/admin/login"><a className="block py-2">Admin</a></Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
