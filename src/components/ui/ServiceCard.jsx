// src/components/ui/ServiceCard.jsx
'use client';

import Image from 'next/image';
import WhatsAppButton from '../shared/WhatsAppButton';
import { motion } from 'framer-motion';

export default function ServiceCard({ style }) {
  const { name, description, price, image_url } = style;

  // Format price to Nigerian Naira (₦)
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <Image 
          src={image_url || 'https://via.placeholder.com/600x600/b76e79/ffffff?text=Style+Image'}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false} // Only highest priority for 1-2 images on home
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-deep-violet mb-2">{name}</h3>
        <p className="text-rose-gold text-lg font-semibold mb-3">{formattedPrice}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <WhatsAppButton styleName={name} className="w-full" />
      </div>
    </motion.div>
  );
}
