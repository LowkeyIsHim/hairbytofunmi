"use client";
import { useData } from "@/context/DataContext";
import StyleCard from "@/components/StyleCard";
import { motion } from "framer-motion";

export default function Home() {
  const { styles } = useData();

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white py-20 lg:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              Elegance in <span className="text-primary italic">Every Strand</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Transforming hair dreams into reality with elegance and style. 
              Specializing in braids, twists, curls, and more.
            </p>
            <a href="#gallery" className="inline-block bg-primary text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105">
              View Styles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest font-bold text-sm">Portfolio</span>
          <h2 className="font-serif text-4xl mt-2 text-stone-900">Curated Styles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style) => (
            <StyleCard key={style.id} style={style} />
          ))}
        </div>
      </section>
    </div>
  );
}
