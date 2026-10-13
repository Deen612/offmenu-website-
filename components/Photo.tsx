"use client";

import { createContext, useContext } from "react";
import { images, type ImageKey } from "@/content/images";

/** Which photos exist in public/images, worked out on the server at build time. */
export const PhotoContext = createContext<ReadonlySet<string>>(new Set());

export function Photo({
  name,
  className = "",
  eager = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  decorative = false,
}: {
  name: ImageKey;
  className?: string;
  eager?: boolean;
  sizes?: string;
  decorative?: boolean;
}) {
  const available = useContext(PhotoContext);
  const img = images[name];
  const has = available.has(img.file);
  return (
    <div
      className={`photo ${className}`}
      style={{ ["--tone" as string]: img.tone }}
      role={has || decorative ? undefined : "img"}
      aria-label={has || decorative ? undefined : img.alt}
    >
      {has && (
        <img
          src={`/images/${img.file}`}
          alt={decorative ? "" : img.alt}
          width={img.width}
          height={img.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          sizes={sizes}
        />
      )}
    </div>
  );
}

export function PhotoProvider({ files, children }: { files: string[]; children: React.ReactNode }) {
  return <PhotoContext.Provider value={new Set(files)}>{children}</PhotoContext.Provider>;
}
