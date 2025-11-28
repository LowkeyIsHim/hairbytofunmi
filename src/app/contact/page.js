// src/app/contact/page.js (Upgraded VVIP Contact Hub)

import Link from "next/link";
import { Mail, Phone, Clock, Instagram, MapPin, Send } from "lucide-react";

export default function Contact() {
  const CONTACT_INFO = {
    WHATSAPP: "+234 902 128 0216",
    EMAIL: "kofoworoladickson@gmail.com",
    TIKTOK: "@hairbytofunmi_21",
    TIKTOK_URL: "https://www.tiktok.com/@hairbytofunmi_21?_r=1&_t=ZS-91ig71qDCE5",
    HOURS: "Mon - Sat: 9AM – 7PM",
  };
    
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-brand-cream dark:bg-brand-dark transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-4 text-brand-dark dark:text-brand-cream">Get In Touch</h1>
            <p className="text-brand-charcoal/80 dark:text-brand-cream/70 max-w-2xl mx-auto text-lg font-light">
                Ready for your transformation? Connect with us via our VVIP channels.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Details Column */}
          <div className="space-y-8">
              
              {/* WhatsApp */}
              <div className="flex items-center gap-4 border-b border-brand-gold/20 pb-4">
                  <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
                      <Phone size={24}/>
                  </div>
                  <div>
                      <p className="text-sm text-brand-gold uppercase tracking-widest">WhatsApp (Primary)</p>
                      <a href={`https://wa.me/${CONTACT_INFO.WHATSAPP.replace(/\s/g, '')}`} className="text-xl font-medium text-brand-dark dark:text-brand-cream hover:text-brand-gold transition-colors">{CONTACT_INFO.WHATSAPP}</a>
                  </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 border-b border-brand-gold/20 pb-4">
                  <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
                      <Mail size={24}/>
                  </div>
                  <div>
                      <p className="text-sm text-brand-gold uppercase tracking-widest">Email</p>
                      <a href={`mailto:${CONTACT_INFO.EMAIL}`} className="text-xl font-medium text-brand-dark dark:text-brand-cream hover:text-brand-gold transition-colors">{CONTACT_INFO.EMAIL}</a>
                  </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4 border-b border-brand-gold/20 pb-4">
                  <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
                      <Clock size={24}/>
                  </div>
                  <div>
                      <p className="text-sm text-brand-gold uppercase tracking-widest">Working Hours</p>
                      <p className="text-xl font-medium text-brand-dark dark:text-brand-cream">{CONTACT_INFO.HOURS}</p>
                  </div>
              </div>

              {/* TikTok */}
              <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  </div>
                  <div>
                      <p className="text-sm text-brand-gold uppercase tracking-widest">TikTok</p>
                      <a href={CONTACT_INFO.TIKTOK_URL} target="_blank" className="text-xl font-medium text-brand-dark dark:text-brand-cream hover:text-brand-gold transition-colors">{CONTACT_INFO.TIKTOK}</a>
                  </div>
              </div>
          </div>

          {/* Note & Location Column (Map Placeholder) */}
          <div className="bg-brand-cream dark:bg-brand-dark p-8 rounded-sm border border-brand-gold/20">
              <h3 className="font-serif text-3xl mb-4 text-brand-dark dark:text-brand-gold">Location & Booking Policy</h3>
              <div className="flex items-center gap-3 mb-6 text-brand-charcoal dark:text-brand-cream/80">
                  <MapPin size={20}/>
                  <p className="uppercase tracking-widest text-sm">Lagos, Nigeria (Address provided upon confirmation)</p>
              </div>
              <p className="text-brand-charcoal/80 dark:text-brand-cream/80 leading-relaxed mb-8">
                  Bookings are confirmed only after a **non-refundable deposit**. Please use the WhatsApp link for all availability inquiries. This ensures a dedicated, private, and flawless VVIP experience.
              </p>
              
              <Link href={`https://wa.me/${CONTACT_INFO.WHATSAPP.replace(/\s/g, '')}`} className="btn-primary group !bg-brand-dark dark:!bg-brand-gold w-full py-3 flex items-center justify-center gap-2">
                 <Phone size={16}/> Start Booking Process
                 <div className="btn-primary-wipe bg-brand-gold dark:bg-brand-dark"></div>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
