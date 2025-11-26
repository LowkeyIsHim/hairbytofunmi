import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';

export default function AboutSection({ fullPage = false }: { fullPage?: boolean }) {
  const { contact } = useData();

  const titleClass = fullPage ? "text-5xl" : "text-4xl";
  const sectionClass = fullPage ? "py-16" : "py-8";
  
  return (
    <section className={`max-w-7xl mx-auto px-4 ${sectionClass} ${fullPage ? 'border-b border-primary/30' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className={`${fullPage ? 'order-1' : 'order-2'}`}>
          <span className="text-primary uppercase tracking-widest font-bold text-sm">Our Philosophy</span>
          <h2 className={`font-serif ${titleClass} mt-2 text-dark mb-6`}>
            Artistry, <span className="italic font-normal text-primary">Care</span>, and Confidence.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
            {contact.bio}
          </p>
        </div>
        
        {/* Placeholder Image for visual appeal */}
        <div className={`${fullPage ? 'order-2' : 'order-1'} bg-stone-300 h-96 rounded-xl shadow-xl overflow-hidden`}>
           <img 
            src="https://images.unsplash.com/photo-1549419163-f9ce8803513b?auto=format&fit=crop&w=800"
            alt="Hair stylist working in a salon"
            className="w-full h-full object-cover"
           />
        </div>
      </motion.div>
    </section>
  );
}
