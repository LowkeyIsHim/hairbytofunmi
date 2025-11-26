/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use app directory
  experimental: {
    appDir: true,
    serverActions: true,
  },
  // Configure image domains for the Image component security
  images: {
    // Since the admin uses external URLs, we must allow image sources.
    // picsum is included for the seed data/placeholders.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // IMPORTANT: Add the hostname(s) of where the stylist will host their images (e.g., Google Photos, Imgur, etc.)
      // Example: 
      // {
      //   protocol: 'https',
      //   hostname: 'my-photo-storage.com',
      // },
      {
        protocol: 'https',
        hostname: '**', // Broadly allow for easy administration, but secure this if possible
      }
    ],
  },
  // Ensure Tailwind CSS is configured
  compiler: {
    styledComponents: false,
  },
};

export default nextConfig;
