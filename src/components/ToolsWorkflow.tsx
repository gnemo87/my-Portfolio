import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedHeading } from "./AnimatedHeading";

const iconBase = "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons";

const toolList = [
  { name: "Figma",         slug: "figma" },
  { name: "After Effects", slug: "adobeaftereffects" },
  { name: "Photoshop",     slug: "adobephotoshop" },
  { name: "Illustrator",   slug: "adobeillustrator" },
  { name: "Sketch",        slug: "sketch" },
  { name: "Cinema 4D",     slug: "cinema4d" },
  { name: "Spline",        slug: "spline" },
  { name: "ProtoPie",      slug: "protopie" },
  { name: "Blender",       slug: "blender" },
];

function ToolIcon({ slug, name }: { slug: string; name: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center mx-12 opacity-55 hover:opacity-100 transition-opacity duration-300">
      <img
        src={`${iconBase}/${slug}.svg`}
        alt={name}
        className="w-full h-full object-contain"
        style={{ filter: "brightness(0)" }}
        onError={() => setVisible(false)}
      />
    </div>
  );
}

export function ToolsWorkflow() {
  return (
    <section
      className="bg-[#EEEDE8] relative z-10 overflow-hidden flex flex-col justify-center"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Main content block — centered, same margins as About ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-20">

        {/* Title row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedHeading
              lines={["TOOLS &", "WORKFLOW"]}
              variant="scramble"
              className="font-display text-[12vw] lg:text-[140px] leading-[0.88] tracking-tighter text-[#0a0a0a] uppercase m-0"
              stagger={0.12}
            />
            {/* Chinese subtitle below English */}
            <p className="font-mengyuan font-bold text-[32px] tracking-[0.05em] text-[#0a0a0a]/40 mt-3 mb-0">
              工具与工作流
            </p>
          </motion.div>

          {/* Right description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[#0a0a0a]/50 font-sans text-sm md:text-[15px] leading-relaxed max-w-[260px] lg:mt-4 lg:text-right hidden md:block flex-shrink-0"
          >
            熟练掌握行业主流设计工具，覆盖 UI/UX、3D 建模、动态交互与 AI 辅助设计全链路工作流。
          </motion.p>
        </div>

        {/* Logo marquee — full width, outside the max-w wrapper */}
      </div>

      {/* ── Full-width scrolling icon marquee ── */}
      <div className="relative flex overflow-hidden mt-12 w-full z-10">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...toolList, ...toolList, ...toolList, ...toolList].map((tool, i) => (
            <ToolIcon key={`${tool.slug}-${i}`} slug={tool.slug} name={tool.name} />
          ))}
        </motion.div>
      </div>

      {/* ── Giant signature — absolute, fills the whole section ── */}
      <motion.span
        initial={{ opacity: 0, scale: 0.7, rotate: -14 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.3 }}
        className="absolute font-babylonica text-neon-green pointer-events-none select-none"
        style={{
          fontSize: "clamp(180px, 38vw, 560px)",
          fontStyle: "italic",
          lineHeight: 1,
          top: "15%",
          left: "0%",
          zIndex: 5,
          textShadow: "0 8px 60px rgba(204,255,0,0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Design
      </motion.span>
    </section>
  );
}
