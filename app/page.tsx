"use client";
import Link from 'next/link'; 
import { useData } from "@/context/DataContext";
import StyleCard from "@/components/StyleCard";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const { styles, contact } = useData();
  const featuredStyles = styles.filter(s => s.featured).slice(0, 3);

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="relative bg-stone-900 py-24 lg:py-40 px-4 overflow-hidden shadow-inner"
      >
        <div className="absolute inset-0 bg-dark/90 opacity-80" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ y: 30 }} 
            animate={{ y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium mb-3 block">Premium Hair Artistry</span>
            <h1 className="font-serif text-5xl md:text-7xl mb-4 leading-tight text-white">
              Elegance in <span className="text-primary italic font-bold">Every Strand</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-xl mx-auto leading-relaxed mb-10">
              Transforming hair dreams into reality with elegance, style, and care.
            </p>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="inline-flex items-center gap-3 bg-primary text-dark px-10 py-4 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white transition-all transform hover:scale-105 shadow-xl">
              <MessageCircle size={20} /> Book Your Transformation
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Styles Section */}
      <section id="featured" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest font-bold text-sm">Signature Looks</span>
          <h2 className="font-serif text-4xl mt-2 text-dark">Featured Portfolio</h2>
          <p className="text-stone-500 max-w-xl mx-auto mt-2">A selection of our most requested and celebrated styles, handcrafted to perfection.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredStyles.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
        <div className="text-center mt-12">
             <Link href="/portfolio" className="inline-block border border-dark text-dark px-8 py-3 rounded-full font-medium hover:bg-dark hover:text-white transition-colors">
                View All Styles
            </Link>
        </div>
      </section>
      
      <hr className="max-w-7xl mx-auto border-t border-primary/30" />
      
      {/* About Section (The stylist's approach) */}
      <AboutSection />
    </div>
  );
}
