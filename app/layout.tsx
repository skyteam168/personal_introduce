import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { ScrollToTop } from "@/components/ScrollToTop";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { BRAND } from "@/lib/brand";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const title = `${personalInfo.name.en} — ${BRAND.title}`;
const description = BRAND.valueProposition.en;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${personalInfo.name.en}`,
  },
  description,
  keywords: [
    "Enterprise AI Solutions Architect",
    "AI Infrastructure",
    "Enterprise Infrastructure",
    "Network Architecture",
    "AI Agent",
    "RAG",
    "Solution Architecture",
    "Digital Transformation",
    "Xiaowei Yang",
    "杨晓伟",
  ],
  authors: [{ name: personalInfo.name.en, url: siteUrl }],
  creator: personalInfo.name.en,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: personalInfo.name.en,
    locale: "en_US",
    alternateLocale: ["zh_CN", "vi_VN"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@xiaoweiyang",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <JsonLd />
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
