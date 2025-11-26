import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import WhatsAppButton from '../Common/WhatsAppButton';

export default function StyleCard({ style, whatsappNumber }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-premium transition duration-500 hover:shadow-2xl hover:scale-[1.01] flex flex-col h-full">
      <div className="relative aspect-[4/5] w-full">
        {/* Image from URL with placeholder/error handling */}
        <Image
          src={style.image_url}
          alt={style.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 hover:scale-105"
          // Fallback if image fails to load
          onError={(e) => { e.target.src = '[https://picsum.photos/400/500?grayscale](https://picsum.photos/400/500?grayscale)'; e.target.srcset = ''; }} 
          priority={style.is_featured}
        />
        {style.is_featured && (
          <span className="absolute top-4 right-4 bg-soft-gold text-deep-violet text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-bold text-deep-violet mb-2">{style.name}</h3>
        <p className="text-xl font-bold text-muted-lavender mb-3">{formatPrice(style.price)}</p>
        <p className="text-deep-violet/80 text-sm flex-grow mb-4">{style.description}</p>
        
        <div className="mt-auto pt-3 border-t border-subtle-gray">
          <WhatsAppButton styleName={style.name} whatsappNumber={whatsappNumber} />
        </div>
      </div>
    </div>
  );
}
