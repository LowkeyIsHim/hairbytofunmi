import { X } from 'lucide-react';
import Image from 'next/image';
import WhatsAppButton from '../Common/WhatsAppButton';

export default function LightboxModal({ image, onClose, whatsappNumber }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-violet/80 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-cream-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-deep-violet/70 text-cream-white hover:bg-deep-violet transition duration-300"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>

        {/* Image Container */}
        <div className="relative w-full md:w-2/3 aspect-square md:aspect-[4/5] flex-shrink-0">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
          />
        </div>

        {/* Details Container */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-serif font-bold text-deep-violet mb-4">{image.name}</h3>
            <p className="text-sm text-deep-violet/80 italic">
              "This is an example style from the portfolio. Book now to create your own bespoke look!"
            </p>
          </div>
          
          <div className="mt-6">
            <WhatsAppButton 
              styleName={image.name} 
              whatsappNumber={whatsappNumber} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
