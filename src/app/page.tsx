import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CVAccess from "@/components/CVAccess";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <CVAccess />
    </main>
  );
}
