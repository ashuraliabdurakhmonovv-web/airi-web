/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Shared hosting (Arsenal) uchun: har bir route `<route>/index.html` bo'lib
  // chiqadi, shuning uchun URL to'g'ridan-to'g'ri kiritilganda yoki F5 bosilganda
  // Apache uni server sozlamasisiz ochadi.
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.expresscomputer.in",
      },
      {
        protocol: "https",
        hostname: "server.airi.uz",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "buxdu.uz",
      },
      {
        protocol: "https",
        hostname: "www.samdu.uz",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    qualities: [25, 50, 75, 85, 100],
  },
};

export default nextConfig;
