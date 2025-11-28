"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Placeholder data with enhanced descriptions
const placeholderStyles = [
  { 
    id: 'p1', 
    name: 'The Butterfly Locs', 
    price: 12000, 
    imageUrl: 'https://files.catbox.moe/307vwv.jpeg', 
    description: 'Distressed texture meets effortless elegance. Lightweight and versatile.' 
  },
  { 
    id: 'p2', 
    name: 'Bespoke Knotless', 
    price: 7000, 
    imageUrl: 'https://files.catbox.moe/751jcs.jpeg', 
    description: 'Tension-free installation designed for scalp health and natural flow.' 
  },
  { 
    id: 'p3', 
    name: 'Parisian Curls', 
    price: 10000, 
    imageUrl: 'https://files.catbox.moe/hegokr.jpeg', 
    description: 'Voluminous, silky curls braided to perfection for a glamorous finish.' 
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for Full Screen Modal

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeatured(data.length > 0 ? data : placeholderStyles);
      } catch (error) {
        console.error("Error fetching featured styles", error);
        setFeatured(placeholderStyles);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full bg-brand-cream">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Luxury Hair Styling" 
            fill 
            priority
            className="object-cover opacity-90 animate-slow-zoom" // Adds slow movement
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/60 to-transparent md:via-brand-cream/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-gold"></div>
              <span className="text-brand-dark uppercase tracking-[0.3em] text-xs font-bold">
                Premium Hair Artistry
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl text-brand-dark leading-[0.95] mb-8"
            >
              Define Your <br />
              <span className="italic font-serif text-brand-gold">Elegance.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg text-brand-charcoal/80 mb-10 max-w-md font-light leading-relaxed"
            >
              Experience bespoke styling where precision meets luxury. 
              We don't just do hair; we craft your crown.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/services" className="btn-primary group">
                <span className="relative z-10 uppercase text-xs tracking-[0.2em]">Reserve Appointment</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-brand-gold/20"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURED COLLECTION --- */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl text-brand-dark mb-4">The Collection</h2>
              <p className="text-brand-charcoal/60 font-light max-w-sm">
                Curated styles for the modern woman. Click any image to view details.
              </p>
            </div>
            <Link href="/services" className="hidden md:block text-brand-dark border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors uppercase text-xs tracking-widest">
              View Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featured.map((style, index) => (
              <motion.div 
                key={style.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(style)} // Trigger Modal
              >
                {/* Image Wrapper */}
                <div className="relative h-[500px] w-full overflow-hidden mb-6 shadow-lg">
                  <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-dark">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </div>
                  </div>
                </div>

                {/* Card Text Info */}
                <div className="flex justify-between items-start border-t border-brand-dark/10 pt-4">
                  <div>
                    <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors">{style.name}</h3>
                    <p className="text-sm text-brand-charcoal/60 mt-1 max-w-[250px]">{style.description || "Premium protective styling."}</p>
                  </div>
                  <span className="text-lg font-medium text-brand-dark">₦{style.price?.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>

           {/* Mobile Only Link */}
           <div className="mt-12 text-center md:hidden">
            <Link href="/services" className="btn-primary w-full">
               View All Styles
            </Link>
           </div>
        </div>
      </section>

      {/* --- IMAGE MODAL (FULL SCREEN) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)} // Click outside to close
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors z-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-[80vh] flex flex-col md:flex-row bg-brand-cream rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
            >
              {/* Modal Image */}
              <div className="relative w-full md:w-2/3 h-2/3 md:h-full">
                <Image 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.name} 
                    fill 
                    className="object-cover"
                />
              </div>
              
              {/* Modal Details */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-white">
                <h3 className="text-4xl font-serif text-brand-dark mb-2">{selectedImage.name}</h3>
                <div className="w-12 h-[2px] bg-brand-gold mb-6"></div>
                
                <p className="text-brand-charcoal mb-8 leading-relaxed">
                    {selectedImage.description || "Handcrafted with precision and care to ensure longevity and natural beauty. This style includes wash, prep, and finishing oil treatment."}
                </p>
                
                <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Starting at</span>
                    <span className="text-3xl font-medium text-brand-dark">₦{selectedImage.price?.toLocaleString()}</span>
                </div>

                <Link href="/services" className="btn-primary text-center">
                    Book This Look
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TEXTURE/DIVIDER SECTION --- */}
      <section className="py-20 bg-brand-dark text-brand-cream text-center px-4">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight italic">
                "Beauty is an attitude. We just provide the crown."
            </h2>
        </div>
      </section>

    </div>
  );
}
