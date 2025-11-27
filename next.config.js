/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com", 
      "plus.unsplash.com", 
      "i.pinimg.com", 
      "i.imgur.com"
    ], // Allow external images
  },
};

module.exports = nextConfig;
