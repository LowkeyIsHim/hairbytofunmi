"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function Services() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "styles"), (snapshot) => {
      setStyles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleBooking = (styleName) => {
    const phone = "2349021280216";
    const text = `Hello HairByTofunmi, I want to book the style: ${styleName}. My name is ___, preferred date ___, time ___.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif text-center mb-4">Our Services</h1>
      <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
        Browse our curated list of styles. Prices may vary based on length and volume.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {styles.map((style, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={style.id} 
            className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="h-64 w-full overflow-hidden bg-gray-100">
              <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-2xl text-brand-dark">{style.name}</h3>
                <span className="text-brand-gold font-bold text-lg">₦{style.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{style.description}</p>
              <button 
                onClick={() => handleBooking(style.name)}
                className="w-full py-3 bg-brand-dark text-white uppercase tracking-widest text-xs hover:bg-brand-gold transition-colors"
              >
                Book on WhatsApp
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
