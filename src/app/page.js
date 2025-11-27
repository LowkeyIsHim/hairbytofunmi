"use client";
import { useEffect, useState } from "react";
// Assuming db is correctly initialized and paths are resolved
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Placeholder data structure remains the same
const placeholderStyles = [
    { id: 'p1', name: 'Butterfly Locs', price: 12000, imageUrl: 'https://files.catbox.moe/307vwv.jpeg', featured: true },
    { id: 'p2', name: 'Knotless Braids', price: 7000, imageUrl: 'https://files.catbox.moe/751jcs.jpeg', featured: true },
    { id: 'p3', name: 'French Curls Braid', price: 10000, imageUrl: 'https://files.catbox.moe/hegokr.jpeg', featured: true },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // NOTE: Ensure db is correctly initialized via "@/lib/firebase"
        if (!db) {
             console.error("Firestore DB not initialized.");
             setFeatured(placeholderStyles);
             return;
        }
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

  // Framer Motion variants for subtle entry
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full">
      {/* HERO SECTION: MODERN, HIGH-IMPACT LAYOUT */}
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-start bg-brand-cream overflow-hidden">
        
        {/* Full-height, fixed-ratio Image for contrast and texture (Right Side) */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Model with elegant protective hairstyle" 
            fill 
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Enhanced Gradient for a smoother, luxurious transition */}
          <div className="absolute inset-0 bg-gradient-to-l from-brand-cream/0 via-brand-cream/70 to-brand-cream dark:from-brand-dark/0 dark:via-brand-dark/70 dark:to-brand-dark"></div>
        </div>
        
        {/* Content Block (Left Side) - Generous padding and maximum whitespace */}
        <div className="relative z-10 max-w-xl mx-auto md:ml-16 lg:ml-24 py-20 text-left px-4 md:px-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl uppercase tracking-[0.4em] text-brand-mauve mb-4 font-sans font-medium"
          >
            The HairByTofunmi Experience
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            // Larger, more impactful font size using Playfair Display (from globals.css h1 styling)
            className="text-7xl md:text-8xl font-serif text-brand-dark dark:text-brand-cream mb-6 tracking-tight leading-none"
          >
            Crafting Your Crown
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 font-sans leading-relaxed max-w-lg"
          >
            Discover bespoke styling, meticulous care, and elegant protective styles. We redefine beauty with every strand.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {/* Using the globally defined .btn-primary class */}
            <Link href="/services" className="btn-primary shadow-2xl">
              Book Your Transformation
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* FEATURED STYLES: ELEGANT CARD GRID */}
      {/* Using .page-container for consistent, generous padding */}
      <section className="page-container bg-brand-cream dark:bg-brand-dark min-h-[50vh]">
        <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            // Using the globally defined .section-heading class
            className="section-heading text-brand-dark dark:text-brand-cream"
        >
            The Signature Lookbook
        </motion.h2>
        <p className="section-description text-gray-600 dark:text-gray-400">
            A curated selection of our most requested and exclusive protective styles—handcrafted for timeless elegance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featured.map((style, index) => (
            <motion.div 
              key={style.id} 
              // Using the globally defined .card-premium class
              className="card-premium h-[450px] overflow-hidden group"
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
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              
              {/* Premium Title Overlay - Adjusted for better contrast and depth */}
              <div className="absolute bottom-0 left-0 right-0 p-6 w-full bg-white/95 dark:bg-brand-dark/95 backdrop-blur-sm shadow-2xl transition-all duration-300">
                <h3 className="font-serif text-3xl text-brand-dark dark:text-brand-cream mb-1">{style.name}</h3>
                <p className="text-brand-gold font-bold text-xl mt-1 tracking-wide">
                    ₦{style.price?.toLocaleString()}
                </p>
                <div className="mt-4">
                   <Link href="/services" className="text-brand-mauve dark:text-brand-cream/70 font-semibold text-lg hover:text-brand-gold transition-colors duration-200">
                        View Details →
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA to All Services - Elevated secondary button */}
        <div className="text-center mt-20">
            <Link href="/services" className="btn-secondary">
                View All Styles & Pricing
            </Link>
        </div>
      </section>
      
      {/* Divider */}
      <div className="divider-gold"></div>

      {/* Testimonials/Mission Section Placeholder */}
      <section className="page-container py-20 text-center">
        <h2 className="text-4xl font-serif text-brand-dark dark:text-brand-cream mb-4">Our Commitment to You</h2>
        <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
            Experience the difference of personalized service and artistic excellence.
        </p>
        {/* Add a testimonial slider or a three-column value proposition section here */}
      </section>
    </div>
  );
}
