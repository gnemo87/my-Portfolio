import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface WaveDividerProps {
  color: string;
  direction?: "left" | "right";
  position?: "top" | "bottom";
}

export function WaveDivider({ color, direction = "left", position = "bottom" }: WaveDividerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
  );

  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0, 1.05]
  );

  return (
    <div 
      ref={ref} 
      className={`absolute left-0 w-full overflow-hidden leading-none h-16 md:h-28 z-20 pointer-events-none ${position === "bottom" ? "bottom-0" : "top-0"}`}
    >
      <motion.div style={{ x, scaleY }} className={`absolute ${position === "bottom" ? "bottom-0 origin-bottom" : "top-0 origin-top"} left-0 w-[200%] h-full flex items-end`}>
        <svg className={`w-full h-full shrink-0 ${color} ${position === "top" ? "rotate-180" : ""}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            d="M0,50 C75,120 75,-10 150,50 C225,120 225,-10 300,50 C375,120 375,-10 450,50 C525,120 525,-10 600,50 C675,120 675,-10 750,50 C825,120 825,-10 900,50 C975,120 975,-10 1050,50 C1125,120 1125,-10 1200,50 L1200,120 L0,120 Z"
          />
        </svg>
        <svg className={`w-full h-full shrink-0 -ml-[1px] ${color} ${position === "top" ? "rotate-180" : ""}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            d="M0,40 C150,120 150,0 300,40 C450,120 450,0 600,40 C750,120 750,0 900,40 C1050,120 1050,0 1200,40 L1200,120 L0,120 Z"
          />
        </svg>
      </motion.div>
    </div>
  );
}
