import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaWhatsapp, FaTiktok, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const whatsappUrl = `https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent("Hi Tofunmi, I want to book a hair style!")}`;

  return (
    <>
      <Head>
        <title>HairByTofunmi | Contact</title>
        <meta name="description" content="Contact Tofunmi via WhatsApp, TikTok, or Email." />
        <meta property="og:title" content="HairByTofunmi | Contact" />
        <meta property="og:description" content="Contact Tofunmi via WhatsApp, TikTok, or Email." />
        <meta property="og:image" content="/favicon.svg" />
      </Head>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-10 space-y-6 text-center">
        <h1 className="text-3xl font-heading">Contact</h1>
        <p>Working Hours: 9:00 AM — 7:00 PM</p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          <a href="https://www.tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          <a href="mailto:email@example.com"><FaEnvelope /></a>
        </div>
      </main>
      <Footer />
    </>
  );
}
