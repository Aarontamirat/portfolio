import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CVAccess from "@/components/CVAccess";
import FirewallBreach from "@/components/FirewallBreach";
import MemoryDump from "@/components/MemoryDump";
import SignalNoise from "@/components/SignalNoise";
import CVDownload from "@/components/CVDownload";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      {/* <FirewallBreach /> */}
      {/* <MemoryDump /> */}
      {/* <SignalNoise /> */}
      <About />
      <Skills />
      <Projects />
      <Contact />
      {/* <CVAccess /> */}
      <CVDownload />
    </main>
  );
}
