import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Xiaowei Yang — AI Infrastructure Engineer",
  description:
    "Building AI Infrastructure for the Next Generation. 9+ years in Enterprise IT, AI Automation and Digital Transformation.",
  keywords: [
    "AI Infrastructure",
    "AI Agent",
    "Python",
    "FastAPI",
    "Linux",
    "Cloud",
    "杨晓伟",
    "Xiaowei Yang",
  ],
  authors: [{ name: "Xiaowei Yang" }],
  openGraph: {
    title: "Xiaowei Yang — AI Infrastructure Engineer",
    description:
      "Building AI Infrastructure for the Next Generation.",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xiaowei Yang — AI Infrastructure Engineer",
    description:
      "Building AI Infrastructure for the Next Generation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
