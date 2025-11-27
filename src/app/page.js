"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Use a placeholder for the actual style data if none is loaded yet
const placeholderStyles = [
    { id: 'p1', name: 'Butterfly Locs', price: 12000, imageUrl: 'https://files.catbox.moe/307vwv.jpeg', featured: true, description: "Intricate, flowing locs for a dramatic and protective look." },
    { id: 'p2', name: 'Knotless Braids', price: 7000, imageUrl: 'https://files.catbox.moe/751jcs.jpeg', featured: true, description: "Smooth, pain-free braiding technique for natural comfort and style." },
    { id: 'p3', name: 'French Curls Braid', price: 10000, imageUrl: 'https://files.catbox.moe/hegokr.jpeg', featured: true, description: "Elegant fusion of protective braiding and romantic, soft curls." },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full">
      {/* HERO SECTION: High Contrast, Dramatic Luxury Vibe */}
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-start bg-brand-cream dark:bg-brand-dark overflow-hidden">
        
        {/* Full-height image for contrast and texture (Right Side) */}
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
        
        {/* Content Block (Left Side) - Maximum whitespace, deep typography */}
        <div className="relative z-10 max-w-xl mx-auto md:ml-16 lg:ml-24 py-20 text-left px-6 md:px-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl uppercase tracking-[0.4em] text-brand-mauve dark:text-brand-cream/60 mb-4 font-sans font-medium"
          >
            The Art of Refinement
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
            // Large, impactful Playfair heading
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
      <section className="page-container bg-brand-cream dark:bg-brand-dark">
        <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            // Using the globally defined .section-heading class
            className="section-heading"
        >
            The Signature Lookbook
        </motion.h2>
        <p className="section-description">
            A curated selection of our most requested and exclusive protective styles—handcrafted for timeless elegance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featured.map((style, index) => (
            <motion.div 
              key={style.id} 
              // Using the globally defined .card-premium class
              className="card-premium h-[480px] overflow-hidden" // Increased card height for impact
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-2/3 w-full">
                <Image 
                  src={style.imageUrl} 
                  alt={style.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              {/* Premium Title Block - Separated from image for cleaner presentation */}
              <div className="p-6 h-1/3 flex flex-col justify-between">
                <div>
                    <h3 className="font-serif text-3xl text-brand-dark dark:text-brand-cream mb-1">{style.name}</h3>
                    <p className="text-brand-gold font-bold text-xl mt-1 tracking-wide">
                        ₦{style.price?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{style.description}</p>
                </div>
                
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
        <h2 className="text-4xl font-serif text-brand-dark dark:text-brand-cream mb-4">The HairByTofunmi Promise</h2>
        <p className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
            Excellence is not a luxury, but our standard. Experience the difference of personalized service and artistic dedication.
        </p>
        {/* Add a testimonial slider or a three-column value proposition section here */}
      </section>
    </div>
  );
                }
