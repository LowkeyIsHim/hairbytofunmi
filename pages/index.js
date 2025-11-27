import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { supabase } from '../supabase/client';
import ServiceCard from '../components/ServiceCard';

export default function Home({ featuredStyles }) {
  return (
    <>
      <Head>
        <title>HairByTofunmi | Transforming Hair Dreams</title>
        <meta name="description" content="Transforming hair dreams into reality with elegance, style, and care." />
        <meta property="og:title" content="HairByTofunmi | Transforming Hair Dreams" />
        <meta property="og:description" content="Transforming hair dreams into reality with elegance, style, and care." />
        <meta property="og:image" content="/favicon.svg" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-heading mb-6">Featured Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStyles.map(style => <ServiceCard key={style.id} style={style} />)}
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from('hair_styles').select('*').eq('featured', true);
  return { props: { featuredStyles: data || [] } };
}
