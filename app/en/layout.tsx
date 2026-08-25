/** @format */

import type { Metadata } from "next";
import RootShell from "../_root/root-shell";
import { rootMetadata } from "../_root/root-metadata";

/**
 * Inglizcha daraxtning ROOT layouti — `<html lang="en">`.
 * Mantiq `app/ru/layout.tsx` bilan bir xil: `RootShell` `EnProvider` ni
 * tanlaydi va u inglizcha lug'atni STATIK import qiladi.
 */
export const metadata: Metadata = rootMetadata("en");

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell locale="en">{children}</RootShell>;
}
