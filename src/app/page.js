"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// Importing all necessary icons
import { Phone, CheckCircle, Diamond, Sparkles, Star, X } from "lucide-react"; 

// VVIP Contact Details (Used for immediate CTAs)
const WHATSAPP_NUMBER = "+2349021280216";

// --- Function to generate the custom WhatsApp URL ---
const getWhatsAppUrl = (styleName, price) => {
    const message = encodeURIComponent(
        `Hello HairByTofunmi, I would like to book an appointment for the ${styleName} style, priced at ₦${price.toLocaleString()}. Please let me know your next availability. Thank you!`
    );
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}?text=${message}`;
};

// Placeholder data with enhanced, premium write-ups
const placeholderStyles = [
  { 
    id: 'p1', 
    name: 'The Butterfly Locs', 
    price: 18000, 
    imageUrl: 'https://files.catbox.moe/307vwv.jpeg', 
    description: 'An ethereal, lightweight installation featuring distressed texture and organic movement, designed for effortless elegance and lasting wear.' 
  },
  { 
    id: 'p2', 
    name: 'Bespoke Knotless Braids', 
    price: 15000, 
    imageUrl: 'https://files.catbox.moe/751jcs.jpeg', 
    description: 'Crafted for ultimate scalp comfort, these tension-free braids are installed with precision, ensuring natural flow and superior longevity.' 
  },
  { 
    id: 'p3', 
    name: 'Parisian Curls Signature', 
    price: 22000, 
    imageUrl: 'https://files.catbox.moe/hegokr.jpeg', 
    description: 'Voluminous, silky soft curls braided to perfection. A glamorous, high-definition finish that exudes Parisian chic and modern luxury.' 
  },
];

const commitmentPoints = [
  { icon: Diamond, title: "Exquisite Materials", description: "Sourced premium hair and only luxury, salon-grade care products are used for every service." },
  { icon: CheckCircle, title: "Artisan Craftsmanship", description: "Every strand is laid with meticulous precision and care by a highly experienced stylist." },
  { icon: Sparkles, title: "Tailored VVIP Experience", description: "Enjoy private, dedicated appointments and a styling consultation customized to your vision." },
];

const testimonials = [
    { text: "The bespoke knotless braids were flawless. Truly the most comfortable and longest-lasting style I've ever had.", author: "A. Williams" },
    { text: "Tofunmi doesn't just do hair; she creates art. The Parisian curls turned heads everywhere I went!", author: "K. Eze" },
    { text: "VVIP service from start to finish. Professional, punctual, and delivered perfect results.", author: "S. Johnson" },
];


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    // --- Firebase fetch logic remains the same, using placeholder if necessary ---
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

  // --- Component return starts here ---
  return (
    <div className="w-full bg-brand-cream dark:bg-brand-dark transition-colors duration-500">
      
      {/* --- 1. HERO SECTION: MAX IMPACT --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Luxury Hair Styling" 
            fill 
            priority
            className="object-cover opacity-85 dark:opacity-75 transition-opacity animate-slow-zoom" 
          />
          {/* Cinematic Gradient Overlay - Stronger Dark Mode for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/80 via-brand-cream/30 to-transparent dark:from-brand-dark/95 dark:via-brand-dark/50 transition-colors"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20">
          <div className="max-w-4xl">
            {/* Sub-headline */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[1.5px] w-16 bg-brand-gold"></div>
              <span className="text-brand-dark dark:text-brand-cream uppercase tracking-[0.3em] text-sm font-lato">
                The Crown You Deserve
              </span>
            </motion.div>

            {/* Main Headline - Largest Size */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-playfair text-7xl md:text-8xl lg:text-[10rem] text-brand-dark dark:text-brand-cream leading-[0.9] mb-8"
            >
              **Define Your** <br />
              <span className="text-gradient-gold font-extrabold">Elegance.</span>
            </motion.h1>

            {/* Introductory Paragraph - Premium Copy */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-brand-dark/90 dark:text-brand-cream/80 mb-12 max-w-lg font-lato leading-relaxed pl-1"
            >
              Experience bespoke styling where **precision meets luxury**. 
              We don't just do hair; we craft your signature crown with unparalleled care.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group" 
            >
              {/* PRIMARY CTA: WhatsApp Link - Using .btn-primary */}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary btn-primary-base w-fit" 
              >
                 <span className="btn-primary-wipe"></span>
                <span className="btn-primary-content flex items-center gap-2 text-sm">
                    <Phone size={16}/> Secure Your Appointment
                </span>
              </a>
              
              {/* SECONDARY CTA: Service Menu Link - Subtle */}
              <Link href="/services" 
                    className="
                      text-brand-dark dark:text-brand-cream 
                      uppercase text-sm tracking-widest 
                      border-b border-brand-charcoal/50 dark:border-brand-cream/50
                      pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors
                      py-2 sm:py-0 font-lato
                    "
              >
                View **Artisan** Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. VVIP COMMITMENT: REFINED STRUCTURE --- */}
      <section className="py-28 px-6 bg-brand-cream dark:bg-brand-dark">
        <div className="container mx-auto">
            <h2 className="text-center text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-16">
                The **HairByTofunmi** Guarantee
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-brand-charcoal/10 dark:divide-brand-cream/10 border-t border-b border-brand-charcoal/10 dark:border-brand-cream/10">
                {commitmentPoints.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="py-12 px-8 flex flex-col items-center text-center transition-colors" 
                    >
                        <point.icon className="h-10 w-10 text-brand-gold mx-auto mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl font-playfair text-brand-dark dark:text-brand-cream mb-3">{point.title}</h3>
                        <p className="text-sm text-brand-charcoal dark:text-brand-cream/70 leading-relaxed max-w-xs font-lato">{point.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 3. FEATURED COLLECTION: ELEVATED CARDS and HEADER --- */}
      <section className="py-32 px-6 bg-brand-cream dark:bg-brand-dark">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-4">Featured **Masterpieces**</h2>
              <p className="text-brand-dark/70 dark:text-brand-cream/70 font-lato max-w-lg text-lg">
                A selection of our most requested and meticulously crafted styles.
              </p>
            </div>
            <Link href="/services" className="hidden md:block text-brand-dark dark:text-brand-cream border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors uppercase text-sm tracking-widest font-lato">
              View All Creations
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
                className="group relative" 
              >
                {/* Image Wrapper */}
                <div 
                    className="relative h-[450px] w-full overflow-hidden shadow-xl cursor-pointer border-2 border-brand-charcoal/10 dark:border-brand-cream/10"
                    onClick={() => setSelectedImage(style)}
                >
                  <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-brand-gold/90 p-4 rounded-full shadow-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0A0A0A" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </div>
                  </div>
                </div>

                {/* Card Text Info & CTA Wrapper */}
                <div className="pt-8">
                    <div className="flex justify-between items-end pb-4">
                        <div>
                            <h3 className="text-3xl font-playfair text-brand-dark dark:text-brand-cream group-hover:text-brand-gold transition-colors">{style.name}</h3>
                            <p className="text-sm text-brand-charcoal dark:text-brand-cream/70 mt-2 max-w-[250px] font-lato">{style.description}</p>
                        </div>
                        <span className="text-2xl font-medium text-brand-gold">₦{style.price?.toLocaleString()}</span>
                    </div>

                    {/* Dedicated WhatsApp CTA Button */}
                    <a 
                        href={getWhatsAppUrl(style.name, style.price)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary btn-primary-base w-full group mt-4" 
                    >
                        <span className="btn-primary-wipe"></span>
                        <span className="btn-primary-content flex items-center gap-2 justify-center text-sm">
                            <Phone size={14}/> Book This **Masterpiece**
                        </span>
                    </a>
                </div>
              </motion.div>
            ))}
          </div>

           {/* View Full Menu Link (Mobile/Bottom) */}
           <div className="mt-20 text-center md:hidden">
            <Link href="/services" 
                className="
                  text-brand-dark dark:text-brand-cream 
                  uppercase text-lg tracking-[0.2em] 
                  border-b-2 border-brand-gold 
                  pb-1 hover:text-brand-gold transition-colors font-bold font-lato
                "
            >
               View All Creations
            </Link>
           </div>
        </div>
      </section>
      
      {/* --- 4. TESTIMONIAL SLIDER: HIGH CONTRAST --- */}
      <section className="py-24 px-6 bg-brand-dark text-brand-cream">
        <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-gold fill-brand-gold" />
                ))}
            </div>
            <h2 className="text-base uppercase tracking-[0.3em] text-brand-gold/80 mb-12 font-lato">Unrivaled Client Satisfaction</h2>
            
            <AnimatePresence mode="wait">
                <motion.blockquote
                    key={0}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-4xl md:text-6xl font-playfair leading-tight italic text-brand-cream mb-8">
                        &ldquo;{testimonials[0].text}&rdquo;
                    </p>
                    <footer className="text-lg uppercase tracking-wider text-brand-gold font-lato">
                        — {testimonials[0].author}
                    </footer>
                </motion.blockquote>
            </AnimatePresence>
             <div className="mt-16">
                <Link href="/reviews" className="text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-cream transition-colors uppercase text-sm tracking-widest font-lato">
                    Read All 5-Star Reviews
                </Link>
            </div>
        </div>
      </section>

      {/* --- 5. IMAGE MODAL (FULL SCREEN) - CORRECTED & UPGRADED --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button - Now correctly using X icon */}
            <button className="absolute top-6 right-6 text-brand-cream hover:text-brand-gold transition-colors z-50 p-2">
                <X size={40} strokeWidth={1.5} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-6xl w-full h-[85vh] flex flex-col md:flex-row bg-brand-cream dark:bg-brand-dark rounded-lg overflow-hidden shadow-2xl transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative w-full md:w-2/3 h-2/3 md:h-full">
                <Image 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.name} 
                    fill 
                    className="object-cover"
                />
              </div>
              
              {/* Modal Details */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-brand-cream dark:bg-brand-dark transition-colors">
                <h3 className="text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-2">{selectedImage.name}</h3>
                <div className="w-16 h-[3px] bg-brand-gold mb-6"></div>
                
                <p className="text-brand-dark/80 dark:text-brand-cream/80 mb-8 leading-relaxed text-base font-lato">
                    Handcrafted with **Artisan Precision**. This exclusive style includes a personalized consultation, wash, prep, and our signature finishing oil treatment.
                </p>
                
                <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-sm text-brand-charcoal uppercase tracking-wide dark:text-brand-cream/70 font-lato">Starting at</span>
                    <span className="text-4xl font-playfair font-medium text-brand-gold">₦{selectedImage.price?.toLocaleString()}</span>
                </div>

                {/* MODAL CTA: WhatsApp Link - Custom Message */}
                <a 
                    href={getWhatsAppUrl(selectedImage.name, selectedImage.price)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary btn-primary-base w-full group" 
                >
                    <span className="btn-primary-wipe"></span>
                    <span className="btn-primary-content flex items-center gap-2 justify-center text-sm">
                        <Phone size={16}/> Book This Look Now
                    </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 6. FINAL CTA BANNER --- */}
      <section className="py-24 bg-brand-dark text-brand-cream text-center px-4">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-playfair leading-tight italic text-gradient-gold mb-8">
                Ready to define your signature style?
            </h2>
             <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary btn-primary-base w-fit mx-auto group mt-8" 
            >
                 <span className="btn-primary-wipe"></span>
                <span className="btn-primary-content flex items-center gap-2 text-sm">
                    <Sparkles size={16}/> Start Your Transformation
                </span>
            </a>
        </div>
      </section>

    </div>
  );
}
