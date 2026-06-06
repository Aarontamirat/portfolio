import "./globals.css";
import { Electrolize, VT323 } from "next/font/google";
import BootOverlay from "@/components/BootOverlay";
import AppShell from "@/components/AppShell";
import Navbar from "@/components/Navbar";
import FallingStar from "@/components/FallingStar";
import MouseSnake from "@/components/MouseTrail";
import CyberScrollbar from "@/components/ui/CyberScrollbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const display = Electrolize({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const mono = VT323({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});

export const metadata = {
  title: "Aaron | Full-Stack Developer",
  description: "AARON's portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} relative`}>
      <body>
        <BootOverlay />
        <Navbar />
        {/* <FallingStar /> */}
        <MouseSnake />
        <AppShell>{children}</AppShell>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
