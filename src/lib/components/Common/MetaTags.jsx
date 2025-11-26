import Head from 'next/head';

export default function MetaTags({
  title = "HairByTofunmi | Transforming hair dreams into reality",
  description = "Premium hairstylist specializing in elegant and protective styles like Butterfly Locs, Knotless Braids, and Passion Twists. Book your next beautiful look via WhatsApp.",
  url = "[https://hairbytofunmi.vercel.app](https://hairbytofunmi.vercel.app)",
  image = "/og-image.jpg" // Placeholder
}) {
  return (
    <>
      {/* Basic SEO Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      {/* Open Graph / Social Sharing Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={url + image} />

      {/* Twitter Card Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={url + image} />
    </>
  );
}
