import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { PinkBadge } from "./PinkBadge";
import { WaveDivider } from "./WaveDivider";

function AnimatedLetter({ 
  src, 
  index, 
  scrollYProgress 
}: { 
  src: string; 
  index: number; 
  scrollYProgress: MotionValue<number>;
}) {
  const isN = index === 1;
  const isM = index === 3;
  const isO = index === 4;

  // N字母 (index 1) 恢复原有比例，M字母 (index 3) 稍微放大
  let widthClass = "w-20 sm:w-28 md:w-48 lg:w-64";
  if (isN) widthClass = "w-auto";
  if (isM) widthClass = "w-24 sm:w-32 md:w-56 lg:w-72";
  
  // O字母 (index 4) 往后移一点 (z-index更小，且稍微向右偏移)
  const zIndex = isO ? 5 : 10 + index;
  const marginClass = isO ? "ml-2 sm:ml-4 md:ml-8" : "";

  // 绑定滚动下坠效果
  const startScroll = index * 0.04; 
  const endScroll = startScroll + 0.4;

  const y = useTransform(scrollYProgress, [startScroll, endScroll], [0, 1000]);
  const rotate = useTransform(scrollYProgress, [startScroll, endScroll], [0, index % 2 === 0 ? 45 : -45]);
  const opacity = useTransform(scrollYProgress, [endScroll - 0.15, endScroll], [1, 0]);

  return (
    <motion.div
      className={`relative flex-shrink-0 drop-shadow-2xl pointer-events-none ${widthClass} ${marginClass}`}
      style={{ zIndex, y, rotate, opacity }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 0 }}
        animate={{ 
          opacity: 1, 
          y: [0, index % 2 === 0 ? -10 : 10, 0],
          rotate: [0, index % 2 === 0 ? 4 : -4, 0, index % 2 === 0 ? -4 : 4, 0],
          scale: 1
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: index * 0.1 },
          scale: { duration: 0.8, delay: index * 0.1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
        }}
      >
        <img
          src={src}
          alt={`Letter ${index}`}
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain"
        />
        {isO && (
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 15 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
            className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 lg:-bottom-6 lg:-right-6 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 pointer-events-auto"
            style={{ zIndex: 50 }}
          >
            <PinkBadge />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] md:min-h-[150vh] flex flex-col items-center justify-start overflow-hidden bg-black" style={{ perspective: 1200 }}>
      {/* Aurora video background */}
      <video
        className="absolute inset-0 w-full h-full object-contain object-top opacity-50"
        src="https://qncdn.vzhangxin.com/gnemo/lalme/aurora-1774307058474.webm"
        autoPlay
        loop
        muted
        playsInline
        // @ts-ignore
        webkit-playsinline="true"
        style={{ zIndex: 0 }}
      />
      {/* Initial Viewport Wrapper */}
      <div className="w-full h-screen flex flex-col items-center justify-center relative shrink-0 pt-16">
        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 -mt-4 md:-mt-12">
        
        {/* Giant Text & Sphere */}
        <div className="relative flex items-center justify-center mt-20 md:mt-0 w-full">
          
          {/* Top Label / Hero Title */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 md:mb-10 z-20 whitespace-nowrap"
          >
            <div className="relative flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative font-display uppercase text-white text-[36px] md:text-[48px] lg:text-[64px] leading-none tracking-normal z-10 drop-shadow-sm"
              >
                PRODUCT
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.7 }}
                className="absolute top-0 md:-top-1 lg:-top-2 font-babylonica text-neon-green text-[48px] md:text-[72px] lg:text-[96px] leading-none tracking-normal drop-shadow-md z-20"
              >
                Designer
              </motion.span>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: textY }}
            className="flex items-center justify-center -space-x-4 sm:-space-x-6 md:-space-x-10 lg:-space-x-16 w-full"
          >
            {[
              "https://qncdn.vzhangxin.com/gnemo/lalme/g.png",
              "https://qncdn.vzhangxin.com/gnemo/lalme/n.png",
              "https://qncdn.vzhangxin.com/gnemo/lalme/e.png",
              "https://qncdn.vzhangxin.com/gnemo/lalme/m.png",
              "https://qncdn.vzhangxin.com/gnemo/lalme/o.png"
            ].map((src, index) => (
              <AnimatedLetter 
                key={index} 
                src={src} 
                index={index} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </motion.div>
        </div>

      </div>

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 w-full z-50">
        <WaveDivider color="text-[#F9F8F7]" position="bottom" />
      </div>
    </section>
  );
}
