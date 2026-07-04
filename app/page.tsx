import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { BlogHighlights } from "@/components/BlogHighlights";
import { Certificates } from "@/components/Certificates";
import { Now } from "@/components/Now";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { db } from "@/lib/db";
import { getPublishedPosts } from "@/lib/blog/queries";

export default async function Home() {
  let blogPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  if (db) {
    try {
      blogPosts = await getPublishedPosts();
    } catch {
      blogPosts = [];
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <FeaturedProjects />
        <ArchitectureSection />
        <Experience />
        <Skills />
        <BlogHighlights posts={blogPosts} />
        <Certificates />
        <Now />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </>
  );
}
