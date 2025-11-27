"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Next Image for optimization

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Fetch up to 3 featured styles
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        setFeatured(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching featured styles:", error);
      }
    };
    fetchFeatured();
  }, []);

  // Framer Motion variant for style cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full">
      {/* Hero Section: Magazine Style */}
      <section className="relative h-[90vh] flex items-center justify-center bg-brand-cream overflow-hidden px-4">
        {/* Background Image with Cream Overlay for Softness */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1620956900220-4e082f50a8d6?q=80&w=1974&auto=format&fit=crop" 
            alt="HairByTofunmi Hero Background" 
            fill 
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-cream opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto py-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="text-6xl md:text-8xl font-serif text-brand-dark mb-4 tracking-tight leading-snug"
          >
            Elegance in Every Strand
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-brand-mauve mb-10 font-light italic"
          >
            "Transforming hair dreams into reality with elegance, style, and care. Specializing in braids, twists, curls, and more."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Using the global primary button style */}
            <Link href="/services" className="btn-primary">
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Styles */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-16 text-brand-dark">Signature Looks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((style, index) => (
            <motion.div 
              key={style.id} 
              className="group relative h-96 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
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
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              
              {/* Overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <Link href="/services" className="text-white border border-white px-6 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-brand-dark transition-colors">
                    View & Book
                 </Link>
              </div>

              {/* Permanent Style Title */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="font-serif text-2xl text-white drop-shadow-md">{style.name}</h3>
                <p className="text-brand-champagne font-bold text-sm">₦{style.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA to All Services */}
        <div className="text-center mt-16">
            <Link href="/services" className="text-brand-mauve font-semibold hover:text-brand-dark underline decoration-1 underline-offset-4 tracking-wider">
                View All 9+ Services →
            </Link>
        </div>
      </section>
    </div>
  );
}
