import { getSiteUrl } from "@/lib/site";
import { personalInfo } from "@/lib/data";
import { BRAND } from "@/lib/brand";

export function JsonLd() {
  const siteUrl = getSiteUrl();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name.en,
    alternateName: personalInfo.name.zh,
    url: siteUrl,
    email: personalInfo.email,
    jobTitle: BRAND.title,
    description: BRAND.tagline.en,
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
      personalInfo.facebook,
    ],
    knowsAbout: [
      "Enterprise Infrastructure",
      "Network Architecture",
      "AI Agents",
      "RAG Systems",
      "Solution Architecture",
      "Digital Transformation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${personalInfo.name.en} — ${BRAND.title}`,
    url: siteUrl,
    description: BRAND.valueProposition.en,
    inLanguage: ["en", "zh-CN"],
    author: {
      "@type": "Person",
      name: personalInfo.name.en,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
