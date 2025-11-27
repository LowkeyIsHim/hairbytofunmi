import Link from "next/link";
import { Mail, Phone, Clock, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif mb-4">Get In Touch</h1>
        <p className="text-gray-500">Ready for your transformation? Contact me directly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-900">
                    <Phone size={20}/>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">WhatsApp</p>
                    <a href="https://wa.me/2349021280216" className="text-lg font-medium">+234 902 128 0216</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-900">
                    <Mail size={20}/>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Email</p>
                    <a href="mailto:kofoworoladickson@gmail.com" className="text-lg font-medium">kofoworoladickson@gmail.com</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-900">
                    <Clock size={20}/>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Working Hours</p>
                    <p className="text-lg font-medium">Mon - Sat: 9AM – 7PM</p>
                </div>
            </div>

             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">TikTok</p>
                    <a href="https://www.tiktok.com/@hairbytofunmi_21?_r=1&_t=ZS-91ig71qDCE5" target="_blank" className="text-lg font-medium">@hairbytofunmi_21</a>
                </div>
            </div>
        </div>

        <div className="bg-brand-50 p-8 rounded-sm">
            <h3 className="font-serif text-2xl mb-4">Note</h3>
            <p className="text-gray-700 leading-relaxed">
                Bookings are confirmed only after a deposit. Please use the WhatsApp link to check availability for your preferred date. No physical location is displayed; address will be provided upon booking confirmation.
            </p>
        </div>
      </div>
    </div>
  );
}
