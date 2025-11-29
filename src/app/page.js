"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, CheckCircle, Diamond, Sparkles, Star, X } from "lucide-react"; // Added X for modal close button

// VVIP Contact Details (Used for immediate CTAs)
const WHATSAPP_NUMBER = "+2349021280216";

// --- Function to generate the custom WhatsApp URL ---
const getWhatsAppUrl = (styleName, price) => {
    const message = encodeURIComponent(
        `Hello HairByTofunmi, I would like to book the exclusive "${styleName}" style, priced at ₦${price.toLocaleString()}. Please reserve my private appointment. Thank you!`
    );
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}?text=${message}`;
};

// **UPGRADED** Placeholder data with enhanced, premium descriptions and write-ups
const placeholderStyles = [
  { 
    id: 'p1', 
    name: 'Silk Press Mastery', 
    price: 15000, 
    imageUrl: 'https://files.catbox.moe/g244d2.jpeg', // Changed image for a different look
    description: 'Achieve bone-straight perfection with luminous shine. A tension-free silk press that lasts, prioritizing hair health and exquisite flow.' 
  },
  { 
    id: 'p2', 
    name: 'The Bespoke Knotless', 
    price: 25000, 
    imageUrl: 'https://files.catbox.moe/751jcs.jpeg', 
    description: 'Tension-free, featherlight installation designed for scalp integrity. Each braid is meticulously sized and arranged for a seamless, natural transition.' 
  },
  { 
    id: 'p3', 
    name: 'Goddess Locs Elixir', 
    price: 35000, 
    imageUrl: 'https://files.catbox.moe/hegokr.jpeg', 
    description: 'A fusion of protective styling and bohemian luxury. Handcrafted, voluminous locs that embody effortless beauty and eternal elegance. Long-lasting artistry.' 
  },
];

// **UPGRADED** Commitment points
const commitmentPoints = [
  { icon: Diamond, title: "Uncompromising Quality", description: "Only luxury, high-end products and human hair extensions are selected for your service." },
  { icon: CheckCircle, title: "Private Suite Experience", description: "Enjoy a tailored, one-on-one styling consultation in a tranquil, exclusive setting." },
  { icon: Sparkles, title: "Signature Longevity", description: "Precision craftsmanship ensures your style retains its definition, vibrancy, and longevity." },
];

// **UPGRADED** Testimonials
const testimonials = [
    { text: "Beyond a hairstyle, it's an investment in confidence. The private appointment felt truly exclusive and the result was flawless.", author: "A. Williams, Executive Consultant" },
    { text: "My Goddess Locs are wearable art. The quality and attention to detail Tofunmi provides are simply unmatched.", author: "K. Eze, Creative Director" },
    { text: "Professional, punctual, and the silk press was the shiniest and healthiest I've ever experienced.", author: "S. Johnson, Entrepreneur" },
];


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 
  
  // FIX: Added a loading state to prevent potential render issues before data/placeholders load
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "styles"), where("featured", "==", true), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeatured(data.length > 0 ? data : placeholderStyles);
      } catch (error) {
        // Fallback to placeholder data on error
        console.error("Error fetching featured styles", error);
        setFeatured(placeholderStyles);
      } finally {
        setIsLoading(false); // Set loading to false once fetch or fallback is complete
      }
    };
    fetchFeatured();
  }, []);

  // Use a temporary testimonial key for smooth transition effect
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Auto-switch testimonials every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Display loading skeleton or nothing if still loading
  if (isLoading) {
    // You might add a full-screen loading spinner here for a better UX
    return <div className="min-h-screen flex items-center justify-center text-xl text-brand-gold">Loading Excellence...</div>; 
  }

  // --- Component return starts here ---
  return (
    <div className="w-full">
      
      {/* --- 1. HERO SECTION: HIGH-IMPACT VISUALS --- */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-end pb-24">
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1621250325150-1c4b7b2521b4?q=80&w=1974&auto=format&fit=crop" 
            alt="Luxury Hair Styling" 
            fill 
            priority
            className="object-cover opacity-90 dark:opacity-75 transition-opacity animate-slow-zoom" 
          />
          {/* Cinematic Gradient Overlay - Stronger bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent transition-colors"></div>
        </div>

        {/* Hero Content - Focused on Typography & Gold Accent */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl text-left">
            
            {/* Sub-headline/Pre-title */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="h-[2px] w-16 bg-brand-gold"></div>
              <span className="text-brand-cream uppercase tracking-[0.3em] text-sm font-lato font-light">
                The Private Suite Experience
              </span>
            </motion.div>

            {/* Main Headline - Largest and most impactful */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-playfair text-7xl md:text-8xl lg:text-[10rem] text-brand-cream leading-[0.9] mb-8"
            >
              Mastering <br />
              <span className="text-gradient-gold font-extrabold">Your Crown.</span>
            </motion.h1>

            {/* Introductory Paragraph */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl text-brand-cream/80 mb-12 max-w-lg font-lato leading-relaxed pl-1"
            >
              Experience bespoke styling where precision meets luxury. 
              **We don't just do hair; we craft your signature.**
            </motion.p>

            {/* CTAs - Using the globally defined button style for consistency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group"
            >
              {/* PRIMARY CTA: WhatsApp Link - Premium Gold Button */}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary btn-primary-base w-fit"
              >
                 <span className="btn-primary-wipe"></span>
                <span className="btn-primary-content flex items-center gap-2 text-sm">
                    <Phone size={16}/> Book Private Consultation
                </span>
              </a>
              
              {/* SECONDARY CTA: Service Menu Link - Subtle Cream Underline */}
              <Link href="/services" 
                    className="
                      text-brand-cream 
                      uppercase text-sm tracking-widest 
                      border-b border-brand-cream/50
                      pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors
                      py-2 sm:py-0 font-lato
                    "
              >
                View Signature Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. VVIP COMMITMENT: ELEGANT DIVIDED GRID --- */}
      <section className="py-28 px-6 bg-brand-cream dark:bg-brand-dark">
        <div className="container mx-auto">
            <h2 className="text-center text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-16">
                The Difference is **Artistry**
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-brand-charcoal/10 dark:divide-brand-cream/10 border-t border-b border-brand-charcoal/10 dark:border-brand-cream/10">
                {commitmentPoints.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="py-12 px-8 flex flex-col items-center text-center transition-colors hover:bg-brand-cream/50 dark:hover:bg-brand-dark/50" 
                    >
                        <point.icon className="h-10 w-10 text-brand-gold mx-auto mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl font-playfair text-brand-dark dark:text-brand-cream mb-3">{point.title}</h3>
                        <p className="text-sm text-brand-charcoal dark:text-brand-cream/70 leading-relaxed max-w-xs font-lato">{point.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 3. FEATURED COLLECTION: ELEVATED CARDS (Moved to third position for impact) --- */}
      <section className="py-32 px-6 bg-brand-cream dark:bg-brand-dark">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-4">The Signature Collection</h2>
              <p className="text-brand-charcoal dark:text-brand-cream/70 font-lato max-w-lg text-lg">
                Styles curated for the modern elite. Click any image to reserve your look.
              </p>
            </div>
            <Link href="/services" className="hidden md:block text-brand-dark dark:text-brand-cream border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors uppercase text-sm tracking-widest font-lato">
              View Full Menu
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featured.map((style, index) => (
              <motion.div 
                key={style.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative" 
              >
                {/* Image Wrapper (Remains clickable for modal) */}
                <div 
                    className="relative h-[450px] w-full overflow-hidden shadow-2xl dark:shadow-none cursor-pointer border border-brand-charcoal/10 dark:border-brand-cream/10"
                    // IMPORTANT: Ensure setSelectedImage is called with the full style object
                    onClick={() => setSelectedImage(style)} 
                >
                  <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-brand-gold/90 p-4 rounded-full shadow-xl">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#121212" className="w-6 h-6">
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
                            <p className="text-sm text-brand-charcoal dark:text-brand-cream/70 mt-2 max-w-[250px] font-lato">{style.description || "Premium protective styling."}</p>
                        </div>
                        {/* Price in Gold */}
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
                            <Phone size={16}/> Reserve Your Appointment
                        </span>
                    </a>
                </div>
              </motion.div>
            ))}
          </div>

           {/* View Full Menu Link */}
           <div className="mt-20 text-center">
            <Link href="/services" 
                className="
                  text-brand-dark dark:text-brand-cream 
                  uppercase text-lg tracking-[0.2em] 
                  border-b-2 border-brand-gold 
                  pb-1 hover:text-brand-gold transition-colors font-bold font-lato
                "
            >
               View Full Signature Menu
            </Link>
           </div>
        </div>
      </section>
      
      {/* --- 4. TESTIMONIAL SLIDER: ELEGANT ROTATOR --- */}
      <section className="py-24 px-6 bg-brand-dark">
        <div className="container mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-gold fill-brand-gold" />
                ))}
            </div>
            <h2 className="text-base uppercase tracking-[0.3em] text-brand-gold/80 mb-12 font-lato">Unrivaled Client Satisfaction</h2>
            
            <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                    key={currentTestimonialIndex} // Key changes to force re-render/animation
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-4xl md:text-6xl font-playfair leading-tight italic text-brand-cream mb-8">
                        &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
                    </p>
                    <footer className="text-lg uppercase tracking-wider text-brand-gold font-lato">
                        — {testimonials[currentTestimonialIndex].author}
                    </footer>
                </motion.blockquote>
            </AnimatePresence>
             <div className="mt-16">
                <Link href="/reviews" className="text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-cream transition-colors uppercase text-sm tracking-widest font-lato">
                    Read All Verified 5-Star Reviews
                </Link>
            </div>
        </div>
      </section>


      {/* --- 5. TEXTURE/DIVIDER SECTION - MORE IMPACTFUL --- */}
      <section className="py-24 bg-brand-cream text-brand-dark text-center px-4 transition-colors">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-playfair leading-tight italic text-gradient-gold">
                "Your confidence is our canvas. Let us craft your signature."
            </h2>
        </div>
      </section>

      {/* --- 6. IMAGE MODAL (FULL SCREEN) - Final Fixes and Polish --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
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
                    src={selectedImage.imageUrl || 'https://via.placeholder.com/800'} 
                    alt={selectedImage.name || 'Style Image'} 
                    fill 
                    className="object-cover"
                />
              </div>
              
              {/* Modal Details */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-brand-cream dark:bg-brand-dark transition-colors">
                <h3 className="text-5xl font-playfair text-brand-dark dark:text-brand-cream mb-2 transition-colors">{selectedImage.name}</h3>
                <div className="w-16 h-[3px] bg-brand-gold mb-6"></div>
                
                <p className="text-brand-charcoal dark:text-brand-cream/80 mb-8 leading-relaxed text-base font-lato transition-colors">
                    {selectedImage.description || "Handcrafted with precision and care to ensure longevity and natural beauty. This style includes personalized consultation, wash, prep, and finishing oil treatment."}
                </p>
                
                <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-sm text-brand-charcoal uppercase tracking-wide dark:text-brand-cream/70 font-lato">Exclusive Fee</span>
                    <span className="text-4xl font-playfair font-medium text-brand-gold transition-colors">₦{selectedImage.price?.toLocaleString() || 'P.O.A.'}</span>
                </div>

                {/* MODAL CTA: WhatsApp Link - Custom Message */}
                <a 
                    href={getWhatsAppUrl(selectedImage.name || 'Signature Style', selectedImage.price || 'P.O.A.')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary btn-primary-base w-full group" // Use global button style
                >
                    <span className="btn-primary-wipe"></span>
                    <span className="btn-primary-content flex items-center gap-2 justify-center text-sm">
                        <Phone size={16}/> Reserve Your Private Appointment
                    </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
