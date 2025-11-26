"use client";
import { useData } from "@/context/DataContext";
import StyleCard from "@/components/StyleCard";
import { motion } from "framer-motion";

export default function Home() {
  const { styles, contact } = useData();
  const recommendedStyles = styles.filter(s => s.recommended);

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <section className="relative bg-stone-900 py-24 lg:py-40 px-4 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-dark/90 opacity-80" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl mb-4 leading-tight text-white">
              Elegance in <span className="text-primary italic font-bold">Every Strand</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-xl mx-auto leading-relaxed mb-10">
              {contact.bio}
            </p>
            <a href="#gallery" className="inline-block bg-primary text-dark px-10 py-4 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white transition-all transform hover:scale-105 shadow-xl">
              Explore Our Signature Styles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Recommended Styles Section */}
      {recommendedStyles.length > 0 && (
         <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <span className="text-primary uppercase tracking-widest font-bold text-sm">Tofunmi's Favorites</span>
              <h2 className="font-serif text-4xl mt-2 text-dark">Signature Styles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedStyles.map((style) => (
                <StyleCard key={style.id} style={style} />
              ))}
            </div>
          </section>
      )}

      <hr className="max-w-7xl mx-auto border-t border-primary/30" />

      {/* Full Styles Gallery */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-dark uppercase tracking-widest font-bold text-sm">Full Portfolio</span>
          <h2 className="font-serif text-4xl mt-2 text-dark">All Available Styles</h2>
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
