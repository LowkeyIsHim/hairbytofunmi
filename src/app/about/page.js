// src/app/about/page.js (Upgraded VVIP Stylist Bio)

import Image from "next/image";
import { Diamond, CheckCircle, Sparkles } from "lucide-react";

export default function About() {
  const values = [
    { icon: Diamond, text: "Elegance" },
    { icon: CheckCircle, text: "Care" },
    { icon: Sparkles, text: "Perfection" },
  ];

  return (
    <div className="min-h-screen py-20 pt-28 px-6 bg-brand-cream dark:bg-brand-dark transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-brand-cream dark:bg-brand-dark shadow-2xl dark:shadow-black/50 p-0 flex flex-col md:flex-row items-stretch gap-0">
          
          {/* Left Column: Image & Visual */}
          <div className="w-full md:w-1/2 relative min-h-[400px]">
             {/* Placeholder for Headshot */}
             <Image 
                src="https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=2080&auto=format&fit=crop" 
                alt="Tofunmi, The Stylist" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
             />
             {/* Overlay for professionalism */}
             <div className="absolute inset-0 bg-brand-dark/10 dark:bg-brand-dark/30"></div>
          </div>
          
          {/* Right Column: Text & Bio */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h1 className="text-4xl font-serif mb-3 text-brand-dark dark:text-brand-cream">About The Stylist</h1>
            <div className="w-12 h-1 bg-brand-gold mb-8"></div>
            
            <p className="text-brand-charcoal dark:text-brand-cream/80 mb-6 leading-relaxed text-lg font-light">
              Welcome to **HairByTofunmi**. I am a passionate hair artist dedicated to making every woman feel **confident and beautiful**. 
              With years of experience in protective styling, I specialize in creating neat, painless, and durable hairstyles that safeguard your natural hair while delivering a **flawless, luxurious finish**.
            </p>
            
            <p className="text-brand-charcoal dark:text-brand-cream/80 mb-8 leading-relaxed text-lg font-light">
              My work is guided by the simple philosophy that **Elegance is non-negotiable**. Every strand is treated with meticulous care, ensuring your bespoke style is nothing short of perfection.
            </p>
            
            {/* Value Icons */}
            <div className="flex justify-between mt-6 mb-10">
                {values.map((val, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <val.icon className="h-8 w-8 text-brand-gold mb-2" strokeWidth={1.5}/>
                        <span className="text-sm uppercase tracking-widest text-brand-dark dark:text-brand-cream">{val.text}</span>
                    </div>
                ))}
            </div>

            {/* Signature Placeholder */}
             <div className="mt-8 text-brand-dark dark:text-brand-cream">
                <p className="font-serif italic text-2xl">— Tofunmi</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
