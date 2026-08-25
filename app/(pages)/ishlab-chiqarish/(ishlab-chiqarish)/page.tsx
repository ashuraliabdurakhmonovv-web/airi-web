/** @format */

import type { Metadata } from "next";
import { pageMetadata } from "@/config/seo";
import App from "./provider";

export const metadata: Metadata = pageMetadata({
  title: "Ishlab chiqarish — amaliy sun'iy intellekt yechimlari",
  description:
    "AIRI ishlab chiqarish bo'linmasi: amaliy sun'iy intellekt mahsulotlari, raqamli platformalar, buyurtma loyihalar va ularni yaratgan jamoa.",
  path: "/ishlab-chiqarish",
});

export default function HomePage() {
  return <App />;
}