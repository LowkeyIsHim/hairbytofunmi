"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, CheckCircle, Diamond, Sparkles, Star } from "lucide-react"; // Added icons for new sections

// VVIP Contact Details (Used for immediate CTAs)
const WHATSAPP_NUMBER = "+2349021280216";

// Placeholder data with enhanced descriptions
const placeholderStyles = [
  { 
    id: 'p1', 
    name: 'The Butterfly Locs', 
    price: 12000, 
    imageUrl: 'https://files.catbox.moe/307vwv.jpeg', 
    description: 'Distressed texture meets effortless elegance. Lightweight and versatile.' 
  },
  { 
    id: 'p2', 
    name: 'Bespoke Knotless', 
    price: 7000, 
    imageUrl: 'https://files.catbox.moe/751jcs.jpeg', 
    description: 'Tension-free installation designed for scalp health and natural flow.' 
  },
  { 
    id: 'p3', 
    name: 'Parisian Curls', 
    price: 10000, 
    imageUrl: 'https://files.catbox.moe/hegokr.jpeg', 
    description: 'Voluminous, silky curls braided to perfection for a glamorous finish.' 
  },
];

const commitmentPoints = [
  { icon: Diamond, title: "Premium Products", description: "Only luxury, salon-grade hair care products are used." },
  { icon: CheckCircle, title: "Precision Craftsmanship", description: "Every style is executed with meticulous attention to detail and care." },
  { icon: Sparkles, title: "Exclusive Experience", description: "Private appointments and a tailored styling consultation." },
];

// Placeholder Testimonial Data
const testimonials = [
    { text: "The bespoke knotless braids were flawless. Truly the most comfortable and longest-lasting style I've ever had.", author: "A. Williams" },
    { text: "Tofunmi doesn't just do hair; she creates art. The Parisian curls turned heads everywhere I went!", author: "K. Eze" },
    { text: "VVIP service from start to finish. Professional, punctual, and delivered perfect results.", author: "S. Johnson" },
];


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeatured(data.length > 0 ? data : placeholderStyles);
      } catch (error) {
        console.error("Error fetching featured styles", error);
        setFeatured(placeholderStyles);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full bg-brand-cream dark:bg-brand-dark transition-colors duration-500">
      
      {/* --- 1. HERO SECTION: Bolder Typography and WhatsApp CTA --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Luxury Hair Styling" 
            fill 
            priority
            className="object-cover opacity-80 dark:opacity-70 transition-opacity animate-slow-zoom" 
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/60 to-transparent dark:from-brand-dark/90 dark:via-brand-dark/70 transition-colors"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-brand-gold"></div>
              <span className="text-brand-dark dark:text-brand-cream uppercase tracking-[0.3em] text-xs font-bold">
                Premium Hair Artistry
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-9xl text-brand-dark dark:text-brand-cream leading-[0.9] mb-8 transition-colors" // BOLDER FONT SIZE
            >
              Define Your <br />
              <span className="italic font-serif text-gradient-gold">Elegance.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-brand-dark/80 dark:text-brand-cream/80 mb-12 max-w-lg font-light leading-relaxed transition-colors" // SLIGHTLY LARGER TEXT
            >
              Experience bespoke styling where precision meets luxury. 
              We don't just do hair; **we craft your crown.**
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* PRIMARY CTA: WhatsApp Link - High Contrast */}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary group !bg-brand-dark dark:!bg-brand-gold" 
              >
                <span className="relative z-10 uppercase text-xs tracking-[0.2em] flex items-center gap-2 text-brand-cream dark:text-brand-dark">
                    <Phone size={16}/> Book Via WhatsApp
                </span>
                {/* Gold Wipe Effect (reversing colors for high contrast) */}
                <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 bg-brand-gold dark:bg-brand-dark/80"></div>
              </a>
              
              {/* SECONDARY CTA: Service Menu Link */}
              <Link href="/services" 
                    className="
                      text-brand-dark dark:text-brand-cream 
                      uppercase text-xs tracking-widest 
                      border-b border-brand-gold 
                      pb-1 hover:text-brand-gold transition-colors
                      py-2 sm:py-0
                    "
              >
                View Service Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. NEW SECTION: WHY CHOOSE US (VVIP COMMITMENT) --- */}
      <section className="py-24 px-6 bg-brand-cream dark:bg-brand-dark transition-colors">
        <div className="container mx-auto">
            <h2 className="text-center text-3xl font-serif text-brand-dark dark:text-brand-cream mb-16">
                The **HairByTofunmi** Difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {commitmentPoints.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="p-6 border border-brand-dark/10 dark:border-brand-cream/10 rounded-sm hover:shadow-2xl hover:shadow-brand-gold/10 transition-shadow duration-500"
                    >
                        <point.icon className="h-10 w-10 text-brand-gold mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-serif text-brand-dark dark:text-brand-cream mb-3">{point.title}</h3>
                        <p className="text-sm text-brand-charcoal dark:text-brand-cream/70 leading-relaxed">{point.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 3. NEW SECTION: TESTIMONIAL SLIDER (Simple Placeholder) --- */}
      <section className="py-24 px-6 bg-brand-dark dark:bg-brand-dark transition-colors">
        <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-gold fill-brand-gold" />
                ))}
            </div>
            <h2 className="text-2xl uppercase tracking-widest text-brand-gold mb-12">Client Impressions</h2>
            
            <AnimatePresence mode="wait">
                {/* Simplified testimonial display for now. This should be a slider component later. */}
                <motion.blockquote
                    key={0} // Using a fixed key since it's a simple placeholder
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-4xl md:text-5xl font-serif leading-snug italic text-brand-cream mb-8">
                        &ldquo;{testimonials[0].text}&rdquo;
                    </p>
                    <footer className="text-lg uppercase tracking-wide text-brand-gold/80">
                        — {testimonials[0].author}
                    </footer>
                </motion.blockquote>
            </AnimatePresence>
             {/* Link to external reviews or full testimonial page */}
             <div className="mt-16">
                <Link href="/reviews" className="text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-cream transition-colors uppercase text-sm tracking-widest">
                    Read All 5-Star Reviews
                </Link>
            </div>
        </div>
      </section>


      {/* --- FEATURED COLLECTION ... (rest of the file remains the same) --- */}
      <section className="py-32 px-6 bg-brand-cream dark:bg-brand-dark transition-colors">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl text-brand-dark dark:text-brand-cream mb-4 transition-colors">The Collection</h2>
              <p className="text-brand-dark/60 dark:text-brand-cream/60 font-light max-w-sm transition-colors">
                Curated styles for the modern woman. Click any image to view details.
              </p>
            </div>
            <Link href="/services" className="hidden md:block text-brand-dark dark:text-brand-cream border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors uppercase text-xs tracking-widest">
              View Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featured.map((style, index) => (
              <motion.div 
                key={style.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(style)}
              >
                {/* Image Wrapper */}
                <div className="relative h-[500px] w-full overflow-hidden mb-6 shadow-xl dark:shadow-none">
                  <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-brand-dark/90 backdrop-blur-sm p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-dark dark:text-brand-cream">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </div>
                  </div>
                </div>

                {/* Card Text Info */}
                <div className="flex justify-between items-start border-t border-brand-dark/10 dark:border-brand-cream/10 pt-4 transition-colors">
                  <div>
                    <h3 className="text-2xl font-serif text-brand-dark dark:text-brand-cream group-hover:text-brand-gold transition-colors">{style.name}</h3>
                    <p className="text-sm text-brand-dark/60 dark:text-brand-cream/60 mt-1 max-w-[250px] transition-colors">{style.description || "Premium protective styling."}</p>
                  </div>
                  <span className="text-lg font-medium text-brand-dark dark:text-brand-cream transition-colors">₦{style.price?.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>

           {/* Mobile Only Link */}
           <div className="mt-12 text-center md:hidden">
            <Link href="/services" className="btn-primary w-full">
               View All Styles
            </Link>
           </div>
        </div>
      </section>
      {/* --- IMAGE MODAL (FULL SCREEN) --- (remains the same) */}

      {/* --- TEXTURE/DIVIDER SECTION (High Contrast) --- */}
      <section className="py-20 bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-center px-4 transition-colors">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight italic">
                "Beauty is an attitude. We just provide the crown."
            </h2>
        </div>
      </section>

    </div>
  );
}
