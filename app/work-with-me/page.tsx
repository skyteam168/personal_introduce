import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkWithMePageContent } from "@/components/work-with-me/WorkWithMePageContent";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work With Me — Consulting & Delivery",
  description:
    "Enterprise engagements: network architecture design, overseas datacenter build-out, digital platforms, AI implementation, and on-site support.",
  alternates: { canonical: `${getSiteUrl()}/work-with-me` },
};

export default function WorkWithMePage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkWithMePageContent />
      </main>
      <Footer />
    </>
  );
}
