import { HairStyle } from '@/lib/constants';
import { useData } from '@/context/DataContext';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StyleCard({ style }: { style: HairStyle }) {
  const { contact } = useData();
  
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(style.price);

  const whatsappMessage = encodeURIComponent(`Hello Tofunmi, I am interested in booking the ${style.name} style (Price: ${formattedPrice}). What is your next availability?`);
  const whatsappLink = `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-100 flex flex-col"
    >
      <div className="relative h-72 overflow-hidden bg-stone-100">
        <img 
          src={style.image} 
          alt={style.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x800/CFB998/1C1917?text=HairByTofunmi";
          }}
        />
        {style.featured && (
          <div className="absolute top-3 left-3 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            Featured ✨
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl font-bold text-dark mb-1">{style.name}</h3>
        <p className="text-primary font-bold text-xl mb-4 tracking-wide">{formattedPrice}</p>
        
        <div className="mt-auto">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-dark text-white py-3 rounded-lg hover:bg-primary hover:text-dark transition-colors duration-300 font-medium shadow-md"
          >
            <MessageCircle size={18} />
            <span>Book {style.name}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
