import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import { getSettings } from '@/lib/supabase';
import MetaTags from '@/components/Common/MetaTags';
import './global.css';

// Configure fonts
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair', 
  display: 'swap',
});

// Configure static metadata for SEO
export const metadata = {
  title: 'HairByTofunmi | Premium Hairstylist for Elegant Protective Styles',
  description: 'Transforming hair dreams into reality with elegance, style, and care. Specializing in Butterfly Locs, Knotless Braids, and Passion Twists. Book your next beautiful look via WhatsApp.',
};

export default async function RootLayout({ children }) {
  // Fetch settings for header/footer (Server Component)
  const settings = await getSettings();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        {/* Custom MetaTags component for better control over dynamic tags */}
        <MetaTags />
        <link href="[https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&display=swap](https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&display=swap)" rel="stylesheet" />
      </head>
      <body className="bg-cream-white text-deep-violet min-h-screen flex flex-col font-sans antialiased">
        <Header settings={settings} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
