// src/components/WhatsAppButton.js
export default function WhatsAppButton({phone = '2349021280216', service}) {
  const message = encodeURIComponent(
    `Hi Tofunmi 👋\nI'd like to book *${service || 'a service'}*.\nName:\nPreferred date:\nPreferred time:\nNotes / reference image:`
  )
  const href = `https://wa.me/${phone}?text=${message}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block px-5 py-3 rounded-full bg-gradient-to-r from-rose1 to-rose2 text-black font-semibold shadow-lg"
    >
      Book on WhatsApp
    </a>
  )
}
