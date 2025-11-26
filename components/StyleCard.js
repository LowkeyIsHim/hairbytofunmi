import Image from 'next/image'

export default function StyleCard({ style, onBook, onOpen }) {
  const alt = style.name || 'Hairstyle'
  const price = style.price ? `₦${style.price.toLocaleString()}` : ''

  return (
    <article className="card p-4 rounded-xl hover:shadow-lg transition-shadow duration-200">
      <div className="relative rounded-lg overflow-hidden h-56">
        <img
          src={style.image_url || '/default-style.jpg'}
          alt={alt}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{style.name}</h3>
        {price && <p className="text-sm text-brand-700 mt-1">{price}</p>}
        <p className="text-sm text-gray-600 mt-2">{style.description}</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onBook(style)}
            className="px-3 py-2 rounded-md bg-gradient-to-r from-brand-400 to-brand-600 text-white shadow-sm"
            aria-label={`Book ${style.name} on WhatsApp`}
          >
            Book on WhatsApp
          </button>
          <button
            onClick={() => onOpen(style)}
            className="px-3 py-2 rounded-md border"
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}
