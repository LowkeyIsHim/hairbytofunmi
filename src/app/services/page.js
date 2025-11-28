// src/app/services/page.js (Upgraded VVIP Styles)

"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Image from "next/image"; // Use Next Image component
import { Phone, Star } from "lucide-react";

const WHATSAPP_NUMBER = "2349021280216";

export default function Services() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "styles"), (snapshot) => {
      setStyles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleBooking = (styleName) => {
    const text = `Hello HairByTofunmi, I want to book the style: ${styleName}. My name is ___, preferred date ___, time ___.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-28 pb-12 px-6 bg-brand-cream dark:bg-brand-dark min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-brand-gold fill-brand-gold"/>)}
            </div>
            <h1 className="text-5xl font-serif text-brand-dark dark:text-brand-cream mb-4">Our Bespoke Services</h1>
            <p className="text-brand-charcoal/80 dark:text-brand-cream/70 max-w-2xl mx-auto text-lg font-light">
                Discover your perfect look. Every service is a commitment to **quality, care, and flawless execution**.
            </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {styles.map((style, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={style.id} 
              // Card Styling for VVIP feel
              className="bg-brand-cream dark:bg-brand-dark border border-brand-dark/10 dark:border-brand-gold/30 shadow-lg dark:shadow-black/30 hover:shadow-2xl hover:shadow-brand-gold/20 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Price Tag Overlay */}
                <div className="absolute top-0 right-0 bg-brand-gold text-brand-dark p-3 font-bold text-lg uppercase tracking-wide">
                    ₦{style.price?.toLocaleString()}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-serif text-3xl text-brand-dark dark:text-brand-cream mb-3 group-hover:text-brand-gold transition-colors">{style.name}</h3>
                <p className="text-brand-charcoal dark:text-brand-cream/70 text-sm mb-6 flex-grow">{style.description}</p>
                
                <button 
                  onClick={() => handleBooking(style.name)}
                  className="w-full py-3 bg-brand-dark text-brand-cream dark:bg-brand-gold dark:text-brand-dark uppercase tracking-widest text-xs hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                >
                  <Phone size={16}/> Book This VVIP Look
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
