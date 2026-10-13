"use client";

import { createContext, useContext, useState } from "react";
import { images, remoteSrc, type ImageKey } from "@/content/images";

/** Which photos exist in public/images, worked out on the server. */
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
  const local = useContext(PhotoContext);
  const [failed, setFailed] = useState(false);
  const img = images[name];
  const isLocal = local.has(img.file);
  const src = isLocal ? `/images/${img.file}` : remoteSrc(img);
  const srcSet = isLocal
    ? undefined
    : [480, 800, 1200, img.width].filter((w, i, a) => w <= img.width && a.indexOf(w) === i).map((w) => `${remoteSrc(img, w)} ${w}w`).join(", ");
  return (
    <div
      className={`photo ${className}`}
      style={{ ["--tone" as string]: img.tone }}
      role={failed && !decorative ? "img" : undefined}
      aria-label={failed && !decorative ? img.alt : undefined}
    >
      {!failed && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={decorative ? "" : img.alt}
          width={img.width}
          height={img.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function PhotoProvider({ files, children }: { files: string[]; children: React.ReactNode }) {
  return <PhotoContext.Provider value={new Set(files)}>{children}</PhotoContext.Provider>;
}
