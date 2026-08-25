"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}