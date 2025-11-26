import { HairStyle, CONTACT_INFO } from '@/lib/initialData';
import { MessageCircle } from 'lucide-react';

export default function StyleCard({ style }: { style: HairStyle }) {
  
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(style.price);

  const whatsappMessage = encodeURIComponent(`Hello Tofunmi, I would like to book an appointment for the ${style.name} style.`);
  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
      <div className="relative h-64 overflow-hidden bg-stone-200">
        <img 
          src={style.image} 
          alt={style.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x800/CFB998/1C1917?text=HairByTofunmi";
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {style.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">{style.name}</h3>
        <p className="text-primary font-bold text-lg mb-4">{formattedPrice}</p>
        
        <div className="mt-auto">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-primary hover:text-stone-900 transition-colors duration-300 font-medium"
          >
            <MessageCircle size={18} />
            <span>Book this Style</span>
          </a>
        </div>
      </div>
    </div>
  );
}
