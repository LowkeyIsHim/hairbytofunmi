/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      // Supabase Storage public URL host will vary; allow by enabling external domains as needed
    ],
  },
}
module.exports = nextConfig
