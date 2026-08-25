/** @format */

import localFont from "next/font/local";

export const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/GoogleSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GoogleSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const scienceGothic = localFont({
  src: [
    {
      path: "../public/fonts/ScienceGothic_Condensed-Light.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ScienceGothic_Condensed-ExtraLight.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-science-gothic",
  display: "swap",
});
