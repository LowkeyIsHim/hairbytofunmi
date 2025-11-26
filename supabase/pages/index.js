import Head from 'next/head';
import { supabase } from '../supabase/client';
import ServiceCard from '../components/ServiceCard';
import Hero from '../components/Hero';

export default function Home({ featuredStyles }) {
  return (
    <>
      <Head>
        <title>HairByTofunmi | Elegant Hair Styling</title>
        <meta name="description" content="Transforming hair dreams into reality with elegance, style, and care." />
        <meta property="og:title" content="HairByTofunmi | Elegant Hair Styling" />
        <meta property="og:description" content="Transforming hair dreams into reality with elegance, style, and care." />
        <meta property="og:image" content="/favicon.svg" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Hero />
      <section className="py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredStyles.map(style => <ServiceCard key={style.id} style={style} />)}
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from('hair_styles').select('*').limit(3);
  return { props: { featuredStyles: data || [] } };
}
