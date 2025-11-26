// src/components/Navbar.js
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar(){
  return (
    <nav className="w-full fixed top-0 z-40 backdrop-blur bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Image src="/hairbytofunmi-logo.svg" alt="Hairbytofunmi" width={160} height={48}/>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/services"><a className="text-rose1 font-medium">Services</a></Link>
            <Link href="/portfolio"><a className="text-ivory/90">Portfolio</a></Link>
            <Link href="#contact"><a className="text-ivory/70">Contact</a></Link>
            <a href="/admin" className="px-4 py-2 rounded-full bg-gradient-to-r from-rose1 to-rose2 text-black font-semibold shadow-lg">Admin</a>
          </div>

          <div className="md:hidden">
            <a href="#contact" className="px-3 py-2 rounded-full bg-rose1 text-black font-semibold">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
