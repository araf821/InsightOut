/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "cdn.buymeacoffee.com",
    ],
  },
};

module.exports = nextConfig;
