import { FaWhatsapp, FaTiktok, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-secondary py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
        <p>Working Hours: 9:00 AM — 7:00 PM</p>
        <div className="flex justify-center space-x-4">
          <a href="https://wa.me/234XXXXXXXXXX" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          <a href="https://www.tiktok.com/@yourusername" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="mailto:email@example.com" aria-label="Email"><FaEnvelope /></a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} HairByTofunmi. All rights reserved.</p>
      </div>
    </footer>
  );
}
