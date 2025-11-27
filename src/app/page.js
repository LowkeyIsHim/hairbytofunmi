"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
      const snapshot = await getDocs(q);
      setFeatured(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-brand-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-brand-dark mb-6"
          >
            Elegance in Every Strand
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-8 font-light"
          >
            Specializing in premium braids, twists, and curls. <br/>
            Transforming hair dreams into reality.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/services" className="bg-brand-dark text-white px-8 py-4 rounded-none uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors">
              Book Appointment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Styles */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Signature Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((style) => (
            <div key={style.id} className="group relative h-96 overflow-hidden shadow-lg">
              <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <Link href="/services" className="text-white border border-white px-6 py-2 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
                    View Style
                 </Link>
              </div>
              <div className="absolute bottom-0 left-0 bg-white/90 p-4 w-full">
                <h3 className="font-serif text-xl">{style.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link href="/services" className="text-brand-gold hover:text-brand-dark underline decoration-1 underline-offset-4">
                View All Services
            </Link>
        </div>
      </section>
    </div>
  );
}
