/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from the URLs provided by the admin (Supabase CDN and others)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all external image URLs for flexibility
      },
      {
        protocol: 'http',
        hostname: '**', // Allow http for local testing if needed
      },
    ],
  },
};

export default nextConfig;
