export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappHref = phone ? `https://wa.me/${phone}` : '#'
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:flex md:justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold">HairByTofunmi</h3>
          <p className="text-sm text-gray-600 mt-1">Transforming hair dreams into reality with elegance, style, and care.</p>
          <div className="mt-3 flex gap-3">
            <a href={whatsappHref} aria-label="WhatsApp" className="text-green-600">WhatsApp</a>
            <a href="#" aria-label="TikTok" className="text-pink-600">TikTok</a>
            <a href="mailto:stylist@example.com" aria-label="Email" className="text-gray-600">Email</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium">Working hours</h4>
          <p className="text-sm text-gray-600">9:00 AM — 7:00 PM</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} HairByTofunmi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
