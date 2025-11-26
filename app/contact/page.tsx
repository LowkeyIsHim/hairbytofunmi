"use client";
import { useData } from '@/context/DataContext';
import { Mail, Clock, MessageCircle, Link2 } from 'lucide-react';
import AboutSection from '@/components/AboutSection';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { contact } = useData();
  const tiktokHandle = contact.tiktok.split('/').pop()?.replace('?_r=1&_t=ZS-91ig71qDCE5', '');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        
        {/* About Section */}
        <div id="about" className="mb-20">
            <AboutSection fullPage={true} />
        </div>

        {/* Contact Information */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest font-bold text-sm">Connect</span>
          <h1 className="font-serif text-5xl mt-2 text-dark">Get in Touch</h1>
          <p className="text-stone-500 max-w-2xl mx-auto mt-3">We look forward to transforming your hair dreams. All booking enquiries are handled promptly via WhatsApp.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 bg-white p-8 rounded-xl shadow-xl border border-stone-100">
            {/* WhatsApp */}
            <a 
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                className="flex flex-col items-center p-6 bg-secondary rounded-lg hover:bg-primary/20 transition-colors group"
            >
                <MessageCircle size={36} className="text-dark group-hover:text-primary mb-3 transition-colors" />
                <h3 className="font-serif text-xl font-bold text-dark">WhatsApp</h3>
                <p className="text-stone-500 text-sm">{contact.whatsapp}</p>
                <span className="text-xs text-primary mt-2 font-bold">Preferred Booking Method</span>
            </a>
            
            {/* Email */}
            <a 
                href={`mailto:${contact.email}`}
                className="flex flex-col items-center p-6 bg-secondary rounded-lg hover:bg-primary/20 transition-colors group"
            >
                <Mail size={36} className="text-dark group-hover:text-primary mb-3 transition-colors" />
                <h3 className="font-serif text-xl font-bold text-dark">Email</h3>
                <p className="text-stone-500 text-sm">{contact.email}</p>
                <span className="text-xs text-primary mt-2 font-bold">General Inquiries</span>
            </a>
            
            {/* Hours & Social */}
            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg">
                <Clock size={36} className="text-dark mb-3" />
                <h3 className="font-serif text-xl font-bold text-dark">Working Hours</h3>
                <p className="text-stone-500 text-sm mb-3">{contact.hours}</p>
                
                <a href={contact.tiktok} target="_blank" className="flex items-center gap-2 text-dark hover:text-primary transition-colors">
                    <Link2 size={16} />
                    <span className="text-sm font-medium">TikTok: @{tiktokHandle}</span>
                </a>
            </div>
        </div>

      </motion.div>
    </div>
  );
}
