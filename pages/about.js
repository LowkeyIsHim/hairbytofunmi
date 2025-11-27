import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>HairByTofunmi | About</title>
        <meta name="description" content="Learn about Tofunmi and her elegant hair styling process." />
        <meta property="og:title" content="HairByTofunmi | About" />
        <meta property="og:description" content="Learn about Tofunmi and her elegant hair styling process." />
        <meta property="og:image" content="/favicon.svg" />
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-heading mb-4">About Tofunmi</h1>
        <p>
          Tofunmi is a professional hair stylist specializing in braids, twists, curls, and elegant styles that transform your look.
        </p>
        <p>
          Her process is simple: consultation → styling → finishing touches. Every style is done with care and premium attention to detail.
        </p>
        <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-500">
          Headshot Placeholder
        </div>
      </main>
      <Footer />
    </>
  );
}
