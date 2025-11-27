"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Use a placeholder for the actual style data if none is loaded yet
const placeholderStyles = [
    { id: 'p1', name: 'Signature Look', price: 9000, imageUrl: 'https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop', featured: true },
    { id: 'p2', name: 'Elegant Braids', price: 10000, imageUrl: 'https://images.unsplash.com/photo-1620956900220-4e082f50a8d6?q=80&w=1974&auto=format&fit=crop', featured: true },
    { id: 'p3', name: 'Custom Twists', price: 8000, imageUrl: 'https://images.unsplash.com/photo-1620956900220-4e082f50a8d6?q=80&w=1974&auto=format&fit=crop', featured: true },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // If data is empty, use placeholders to still show the design
        setFeatured(data.length > 0 ? data : placeholderStyles);
      } catch (error) {
        console.error("Error fetching featured styles, using placeholders:", error);
        setFeatured(placeholderStyles);
      }
    };
    fetchFeatured();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full">
      {/* HERO SECTION: High Contrast, Luxury Vibe */}
      <section className="relative h-[95vh] flex items-center justify-start bg-brand-cream overflow-hidden px-4">
        {/* Full-height image for contrast and texture */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Model with elegant protective hairstyle" 
            fill 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Subtle fade on the edge */}
          <div className="absolute inset-0 bg-gradient-to-l from-brand-cream/0 via-brand-cream/50 to-brand-cream"></div>
        </div>
        
        <div className="relative z-10 max-w-xl mx-auto md:ml-20 py-20 text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg uppercase tracking-[0.3em] text-brand-mauve mb-3 font-sans font-semibold"
          >
            The HairByTofunmi Experience
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif text-brand-dark mb-6 tracking-tighter leading-tight"
          >
            Crafting Your Crown
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl text-gray-700 mb-10 font-sans leading-relaxed"
          >
            Discover bespoke styling, meticulous care, and elegant protective styles. We redefine beauty with every strand.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link href="/services" className="btn-primary shadow-2xl">
              Book Your Transformation
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* FEATURED STYLES: Elegant Card Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-brand-cream">
        <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center mb-4 text-brand-dark"
        >
            The Signature Lookbook
        </motion.h2>
        <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto font-sans">
            A curated selection of our most requested and exclusive protective styles—handcrafted for elegance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((style, index) => (
            <motion.div 
              key={style.id} 
              className="group relative h-[420px] overflow-hidden rounded-sm bg-white shadow-xl transition-shadow duration-500 hover:shadow-2xl hover:scale-[1.01] border-b-4 border-brand-gold/0 hover:border-brand-gold/70"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image 
                src={style.imageUrl} 
                alt={style.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Premium Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 w-full bg-white/95 backdrop-blur-sm border-t-2 border-brand-champagne/50">
                <h3 className="font-serif text-2xl text-brand-dark">{style.name}</h3>
                <p className="text-brand-mauve font-bold text-lg mt-1">₦{style.price?.toLocaleString()}</p>
                <div className="mt-3">
                   <Link href="/services" className="text-brand-dark font-medium underline-offset-4 decoration-1 hover:text-brand-gold transition-colors">
                        Book Appointment →
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA to All Services */}
        <div className="text-center mt-16">
            <Link href="/services" className="text-brand-mauve font-semibold hover:text-brand-dark underline decoration-1 underline-offset-4 tracking-wider">
                Explore Full Lookbook and Pricing →
            </Link>
        </div>
      </section>
    </div>
  );
}
