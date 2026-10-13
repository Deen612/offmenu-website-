"use client";

import { useState } from "react";
import { images, type ImageKey } from "@/content/images";

export function Photo({
  name,
  className = "",
  eager = false,
  decorative = false,
  position,
}: {
  name: ImageKey;
  className?: string;
  eager?: boolean;
  sizes?: string;
  decorative?: boolean;
  /** CSS object-position, for choosing which part of a tall photo stays in a wide crop. */
  position?: string;
}) {
  const [failed, setFailed] = useState(false);
  const img = images[name];
  return (
    <div
      className={`photo ${className}`}
      style={{ ["--tone" as string]: img.tone }}
      role={failed && !decorative ? "img" : undefined}
      aria-label={failed && !decorative ? img.alt : undefined}
    >
      {!failed && (
        <img
          src={img.src}
          alt={decorative ? "" : img.alt}
          width={img.width}
          height={img.height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
