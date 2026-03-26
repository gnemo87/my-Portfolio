/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Works } from "./components/Works";
import { ToolsWorkflow } from "./components/ToolsWorkflow";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { WorkDetail } from "./components/WorkDetail";

function ParallaxSection({ 
  children, 
  speed = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  speed?: number; 
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ParallaxSection speed={-0.15}>
          <About />
        </ParallaxSection>
        <ParallaxSection speed={-0.1}>
          <ToolsWorkflow />
        </ParallaxSection>
        <ParallaxSection speed={-0.12}>
          <Works />
        </ParallaxSection>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brutal-black text-white selection:bg-neon-pink selection:text-white">
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:id" element={<WorkDetail />} />
      </Routes>
    </div>
  );
}
