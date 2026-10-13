import type { Metadata, Viewport } from "next";
import "@fontsource-variable/schibsted-grotesk/index.css";
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-500.css";
import "./globals.css";
import { copy } from "@/content/copy";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.socialTitle,
    description: copy.meta.socialDescription,
    type: "website",
    siteName: "Off Menu",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.socialTitle,
    description: copy.meta.socialDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
