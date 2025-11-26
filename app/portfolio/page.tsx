"use client";
import { useData } from "@/context/DataContext";
import StyleCard from "@/components/StyleCard";
import { motion } from "framer-motion";

export default function StylesGallery() {
  const { styles } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary uppercase tracking-widest font-bold text-sm">The Artistry</span>
        <h1 className="font-serif text-5xl mt-2 text-dark">Our Style Portfolio</h1>
        <p className="text-stone-500 max-w-2xl mx-auto mt-3">Browse our full range of protective and elegant styles, each priced transparently and ready for your booking.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {styles.map((style) => (
          <StyleCard key={style.id} style={style} />
        ))}
      </div>
    </div>
  );
}
