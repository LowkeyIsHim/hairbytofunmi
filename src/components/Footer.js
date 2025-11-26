// src/components/Footer.js
export default function Footer(){
  return (
    <footer className="mt-12 border-t border-rose1/12 pt-8 pb-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <p className="text-ivory/80">© {new Date().getFullYear()} Hairbytofunmi — Luxury Hair Artistry</p>
        <p className="mt-2 text-ivory/60">Contact — <a className="text-rose1" href="mailto:kofoworoladickson@gmail.com">kofoworoladickson@gmail.com</a> • WhatsApp: <a className="text-rose1" href="https://wa.me/2349021280216">+234 902 128 0216</a></p>
      </div>
    </footer>
  )
}
