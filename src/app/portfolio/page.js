// src/app/portfolio/page.js (Upgraded VVIP Gallery)

"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, X } from "lucide-react";

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const snap = await getDocs(collection(db, "styles"));
      setImages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchImages();
  }, []);

  // Standard WhatsApp Booking Handler for Portfolio
  const handleBooking = (styleName) => {
    const url = `https://wa.me/2349021280216?text=${encodeURIComponent(`I love this style from your portfolio: ${styleName}.`)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 pb-12 px-6 bg-brand-cream dark:bg-brand-dark min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
            <h1 className="text-5xl font-serif text-brand-dark dark:text-brand-cream mb-4">The Portfolio</h1>
            <p className="text-brand-charcoal/80 dark:text-brand-cream/70 max-w-2xl mx-auto text-lg font-light">
                A showcase of refined technique, dedication to art, and beautiful transformations.
            </p>
        </div>
      
        {/* Masonry-ish Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <motion.div 
                key={img.id} 
                className="break-inside-avoid cursor-pointer group shadow-md dark:shadow-none" 
                onClick={() => setSelectedImg(img)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
              <div className="relative w-full aspect-auto overflow-hidden rounded-sm">
                <Image 
                    src={img.imageUrl} 
                    alt={img.name} 
                    width={500}
                    height={700}
                    className="w-full h-auto rounded-sm transition-transform duration-500 group-hover:scale-[1.03] group-hover:opacity-90" 
                    loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      
      {/* Lightbox Modal */}
      <AnimatePresence>
      {selectedImg && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
            <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-brand-cream dark:bg-brand-dark max-w-3xl w-full rounded-sm relative shadow-2xl overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image */}
                <div className="relative h-[65vh] w-full">
                    <Image 
                        src={selectedImg.imageUrl} 
                        alt={selectedImg.name} 
                        fill
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover"
                    />
                </div>
                
                {/* Details Footer */}
                <div className="p-6 text-center">
                    <h3 className="font-serif text-3xl text-brand-dark dark:text-brand-cream mb-4">{selectedImg.name}</h3>
                    
                    <button 
                        onClick={() => handleBooking(selectedImg.name)}
                        className="btn-primary group !bg-brand-dark dark:!bg-brand-gold w-full max-w-xs mx-auto py-3 flex items-center justify-center gap-2"
                    >
                        <Phone size={16}/> Book This VVIP Look
                        <div className="btn-primary-wipe bg-brand-gold dark:bg-brand-dark"></div>
                    </button>
                </div>
                
                {/* Close Button */}
                <button 
                    className="absolute top-4 right-4 text-brand-cream bg-brand-dark/50 hover:bg-brand-gold hover:text-brand-dark rounded-full p-2 transition-colors z-10" 
                    onClick={() => setSelectedImg(null)}
                >
                    <X size={20}/>
                </button>
            </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
