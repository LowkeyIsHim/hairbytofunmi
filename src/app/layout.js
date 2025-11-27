import { Inter, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext'; // Import the Context Provider

// Initialize custom fonts for a luxury aesthetic
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lato = Lato({ 
    subsets: ['latin'], 
    weight: ['300', '400', '700', '900'],
    variable: '--font-lato' 
});
const playfairDisplay = Playfair_Display({ 
    subsets: ['latin'], 
    weight: ['400', '700', '900'],
    variable: '--font-playfair' 
});

// Placeholder components for the structure
const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-brand-cream/95 dark:bg-brand-dark/95 shadow-lg backdrop-blur-sm flex items-center justify-between px-6 md:px-12 transition-colors duration-300">
        <h1 className={`${playfairDisplay.variable} font-serif text-3xl text-brand-dark dark:text-brand-cream tracking-tight`}>
            HairByTofunmi
        </h1>
        <div className="flex space-x-6 text-brand-dark dark:text-brand-cream">
            <a href="/" className="hover:text-brand-gold transition-colors">Home</a>
            <a href="/services" className="hover:text-brand-gold transition-colors">Services</a>
            <a href="/contact" className="hover:text-brand-gold transition-colors">Book</a>
        </div>
    </nav>
);

const Footer = () => (
    <footer className="w-full bg-brand-dark text-brand-cream py-10 mt-20">
        <div className="container mx-auto px-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} HairByTofunmi. All Rights Reserved.</p>
            <p className="mt-2 text-gray-400">Luxury Protective Styling.</p>
        </div>
    </footer>
);


export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${lato.variable} ${playfairDisplay.variable}`}>
            <body className="antialiased min-h-screen pt-20">
                {/* CRITICAL FIX: Wrap the entire application in the AuthContextProvider.
                  This ensures all children (including page.js) have access to the 
                  user and database context before attempting to render/fetch data.
                */}
                <AuthContextProvider> 
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </AuthContextProvider>
            </body>
        </html>
    );
}

export const metadata = {
    title: 'HairByTofunmi | Luxury Protective Styling',
    description: 'Bespoke braiding and protective styles in a premium setting.',
};
