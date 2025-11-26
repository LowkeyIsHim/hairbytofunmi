'use client';
import Image from 'next/image';
import { useState } from 'react';
import LightboxModal from './LightboxModal';

export default function PortfolioGrid({ styles, whatsappNumber }) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const images = styles.map(style => ({
    id: style.id,
    url: style.image_url,
    alt: style.name,
    name: style.name,
  }));

  const openModal = (image) => {
    setSelectedStyle(image);
  };

  const closeModal = () => {
    setSelectedStyle(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {images.map((image, index) => (
          <div 
            key={image.id}
            onClick={() => openModal(image)}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md transition duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-110"
              onError={(e) => { e.target.src = '[https://picsum.photos/300?grayscale](https://picsum.photos/300?grayscale)'; e.target.srcset = ''; }}
              priority={index < 8}
            />
            {/* Elegant overlay */}
            <div className="absolute inset-0 bg-deep-violet/30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <span className="text-cream-white text-lg font-bold font-serif px-4 py-2 border-2 border-cream-white/70 rounded-lg">
                View & Book
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedStyle && (
        <LightboxModal
          image={selectedStyle}
          onClose={closeModal}
          whatsappNumber={whatsappNumber}
        />
      )}
    </>
  );
}
