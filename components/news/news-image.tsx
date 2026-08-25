"use client";

import Image from "next/image";
import { useState } from "react";

type NewsImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

const FALLBACK = "/logo.png";

export function NewsImage({ src, alt, className, sizes, priority, fill = true }: NewsImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK);
  const isExternal = /^https?:\/\//i.test(currentSrc);

  if (isExternal) {
    // External images are intentionally kept outside next/image so static export does not require remote host configuration.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={currentSrc} alt={alt} className={className} onError={() => setCurrentSrc(FALLBACK)} />;
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      onError={() => setCurrentSrc(FALLBACK)}
      className={className}
      unoptimized
    />
  );
}
