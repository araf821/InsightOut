/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
