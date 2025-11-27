import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioCard from '../components/PortfolioCard';
import { supabase } from '../supabase/client';

export default function Portfolio({ styles }) {
  return (
    <>
      <Head>
        <title>HairByTofunmi | Portfolio</title>
        <meta name="description" content="Explore our hair style portfolio and book via WhatsApp." />
        <meta property="og:title" content="HairByTofunmi | Portfolio" />
        <meta property="og:description" content="Explore our hair style portfolio and book via WhatsApp." />
        <meta property="og:image" content="/favicon.svg" />
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map(style => (
          <PortfolioCard key={style.id} image={style.image} styleName={style.name} />
        ))}
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from('hair_styles').select('*');
  return { props: { styles: data || [] } };
}
