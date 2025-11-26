// src/app/layout.jsx
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata = {
  title: {
    default: 'HairByTofunmi: Premium Hair Styling & Braids',
    template: '%s | HairByTofunmi',
  },
  description: 'Transforming hair dreams into reality with elegance, style, and care. Book your premium braids, twists, and curls appointment today.',
  openGraph: {
    title: 'HairByTofunmi: Premium Hair Styling & Braids',
    description: 'Transforming hair dreams into reality with elegance, style, and care.',
    url: 'https://www.hairbytofunmi.com', // Replace with actual domain
    siteName: 'HairByTofunmi',
    images: [
      {
        url: 'https://www.hairbytofunmi.com/og-image.jpg', // Placeholder, replace with actual image
        width: 1200,
        height: 630,
        alt: 'HairByTofunmi Premium Styling',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HairByTofunmi: Premium Hair Styling & Braids',
    description: 'Transforming hair dreams into reality with elegance, style, and care.',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen bg-off-white text-deep-violet font-sans antialiased">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
