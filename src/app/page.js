"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Fetch up to 3 featured styles
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        setFeatured(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        // Log errors but don't break the UI
        console.error("Error fetching featured styles:", error);
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
      {/* HERO SECTION: High-End Magazine Style */}
      <section className="relative h-[95vh] flex items-end justify-center bg-brand-cream overflow-hidden px-4 pb-16">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1620956900220-4e082f50a8d6?q=80&w=1974&auto=format&fit=crop" 
            alt="Elegantly Styled Hair" 
            fill 
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-cream/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="text-6xl md:text-8xl font-serif text-brand-dark mb-4 tracking-tight leading-snug drop-shadow-md"
          >
            The Art of Elevated Style
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-brand-mauve mb-10 font-light italic drop-shadow-sm"
          >
            "Where precision meets elegance. Discover bespoke styling that honors your crown."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/services" className="btn-primary shadow-lg">
              View Lookbook & Book Now
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
            Featured Collections
        </motion.h2>
        <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">
            A curated selection of our most requested and exclusive protective styles.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((style, index) => (
            <motion.div 
              key={style.id} 
              className="group relative h-[420px] overflow-hidden rounded-sm border border-gray-100 bg-white shadow-xl transition-shadow duration-500 hover:shadow-2xl"
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
              
              {/* Premium Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 w-full bg-white/95 backdrop-blur-sm border-t border-brand-champagne/50">
                <h3 className="font-serif text-2xl text-brand-dark">{style.name}</h3>
                <p className="text-brand-mauve font-bold text-lg mt-1">₦{style.price.toLocaleString()}</p>
                <div className="mt-3">
                   <Link href="/services" className="text-brand-dark font-medium underline-offset-4 decoration-1 hover:text-brand-champagne">
                        Book Now →
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA to All Services */}
        <div className="text-center mt-16">
            <Link href="/services" className="text-brand-mauve font-semibold hover:text-brand-dark underline decoration-1 underline-offset-4 tracking-wider">
                View All Styles and Lookbook →
            </Link>
        </div>
      </section>
    </div>
  );
}
