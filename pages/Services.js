import Head from 'next/head';
import { supabase } from '../supabase/client';
import ServiceCard from '../components/ServiceCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Services({ styles }) {
  return (
    <>
      <Head>
        <title>HairByTofunmi | Services</title>
        <meta name="description" content="Explore our elegant hair styles and book via WhatsApp." />
        <meta property="og:title" content="HairByTofunmi | Services" />
        <meta property="og:description" content="Explore our elegant hair styles and book via WhatsApp." />
        <meta property="og:image" content="/favicon.svg" />
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map(style => <ServiceCard key={style.id} style={style} />)}
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from('hair_styles').select('*');
  return { props: { styles: data || [] } };
}
