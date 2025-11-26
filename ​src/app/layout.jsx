import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { getSettings } from '@/lib/data';

export const metadata = {
  title: {
    default: 'HairByTofunmi - Transforming Hair Dreams',
    template: '%s | HairByTofunmi',
  },
  description: 'Premium hair styling services specializing in braids, twists, and elegant protective styles. Book your transformation today.',
  robots: 'index, follow',
  openGraph: {
    title: 'HairByTofunmi - Elegant Hair Styling',
    description: 'Book your next luxurious hair transformation.',
    url: 'https://hairbytofunmi.com',
    siteName: 'HairByTofunmi',
    images: [
      {
        url: '/site-logo.svg', // Assuming a high-res logo in public folder
        width: 800,
        height: 600,
        alt: 'HairByTofunmi Logo',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar settings={settings} />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
