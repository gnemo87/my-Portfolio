import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { works } from "../data/works";
import { AnimatedHeading } from "./AnimatedHeading";

// Fan layout: rotation + x-offset + z-index for each of 3 cards
const fanConfig = [
  { rotate: -20, xOffset: -280, z: 2 }, // left — VOYAGE
  { rotate:   0, xOffset:    0, z: 3 }, // center-front — Pengzhua
  { rotate:  20, xOffset:  280, z: 1 }, // right — 7850
];

export function Works() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && duration > 0) {
      videoRef.current.currentTime = latest * duration;
    }
  });

  const displayWorks = works.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative z-10 overflow-hidden flex flex-col justify-center py-20 md:py-32"
      style={{ background: "#F2F0EA", minHeight: "100vh" }}
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://qncdn.vzhangxin.com/gnemo/V1-Draft.mp4"
        muted
        playsInline
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        style={{ zIndex: 0 }}
      />

      {/* ── Centered title ── */}
      <div className="flex flex-col items-center px-4 relative z-[2]">
        <AnimatedHeading
          lines={["SELECTED", "WORKS"]}
          variant="blur-in"
          className="font-display text-[13vw] lg:text-[150px] leading-[0.88] tracking-tighter text-[#0a0a0a] uppercase m-0 text-center"
        />
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-mengyuan font-bold text-[28px] tracking-[0.05em] text-[#0a0a0a]/35 mt-3"
        >
          精选作品
        </motion.span>
      </div>

      {/* ── Mobile: vertical card list (hidden on md+) ── */}
      <div className="flex flex-col items-center gap-5 md:hidden relative z-[2] px-5 mt-10 pb-4">
        {displayWorks.map((work, idx) => (
          <motion.div
            key={work.id}
            className="w-full cursor-pointer select-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 + idx * 0.12 }}
            onClick={() => navigate(`/work/${work.id}`)}
          >
            <div
              className="w-full relative overflow-hidden shadow-2xl"
              style={{ borderRadius: "20px", height: "220px" }}
            >
              <img
                src={work.image}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="bg-neon-green text-[#0a0a0a] font-sans font-black text-[9px] tracking-[0.15em] uppercase px-2 py-0.5">
                  {work.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-white uppercase text-[18px] leading-tight tracking-tight m-0 mb-2 drop-shadow">
                  {work.title}
                </p>
                <div className="flex flex-wrap gap-1">
                  {work.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-white/50 font-mono text-[9px] tracking-widest uppercase border border-white/20 px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Desktop: Fan card container (hidden on mobile) ── */}
      <div
        className="hidden md:flex relative w-full items-end justify-center -mt-6 z-[2]"
        style={{ height: "clamp(300px, 35vh, 480px)" }}
      >
        {displayWorks.map((work, idx) => {
          const config = fanConfig[idx];
          const isHovered = hoveredIdx === idx;
          const anyHovered = hoveredIdx !== null;

          let pushX = 0;
          if (anyHovered && !isHovered && hoveredIdx !== null) {
            pushX = idx < hoveredIdx ? -60 : 60;
          }

          return (
            <motion.div
              key={work.id}
              className="absolute cursor-pointer select-none"
              style={{
                width: "clamp(280px, 28vw, 400px)",
                height: "clamp(180px, 18vw, 260px)",
                bottom: "10px",
                left: "50%",
                originX: "50%",
                originY: "100%",
                zIndex: isHovered ? 50 : config.z,
              }}
              initial={{
                x: "calc(-50% + 0px)",
                rotate: 0,
                opacity: 0,
                scale: 0.88,
              }}
              whileInView={{
                x: `calc(-50% + ${config.xOffset + pushX}px)`,
                rotate: isHovered ? config.rotate * 0.3 : config.rotate,
                opacity: 1,
                scale: isHovered ? 1.08 : 1,
                y: isHovered ? -30 : 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.1 + idx * 0.15,
                opacity: { duration: 0.3, delay: 0.1 + idx * 0.12 },
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => navigate(`/work/${work.id}`)}
            >
              <div
                className="w-full h-full relative overflow-hidden shadow-2xl"
                style={{ borderRadius: "20px" }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-neon-green text-[#0a0a0a] font-sans font-black text-[9px] tracking-[0.15em] uppercase px-2 py-0.5">
                    {work.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-white uppercase text-[clamp(14px,1.5vw,20px)] leading-tight tracking-tight m-0 mb-2 drop-shadow">
                    {work.title}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {work.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-white/50 font-mono text-[9px] tracking-widest uppercase border border-white/20 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom padding ── */}
      <div className="pb-16" />
    </section>
  );
}
