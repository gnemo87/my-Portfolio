import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { PinkBadge } from "./PinkBadge";
import { WaveDivider } from "./WaveDivider";

function AnimatedLetter({ 
  src, 
  index, 
  scrollYProgress,
  // mobileHeight: controls visual size on mobile via fixed px height
  mobileHeight = "h-36",
  // desktopWidthClass: controls size on md+ via width
  desktopWidthClass = "md:w-48 lg:w-64",
}: { 
  src: string; 
  index: number; 
  scrollYProgress: MotionValue<number>;
  mobileHeight?: string;
  desktopWidthClass?: string;
}) {
  const isO = index === 4;
  const zIndex = isO ? 5 : 10 + index;

  const startScroll = index * 0.04;
  const endScroll = startScroll + 0.4;
  const y = useTransform(scrollYProgress, [startScroll, endScroll], [0, 1000]);
  const rotate = useTransform(scrollYProgress, [startScroll, endScroll], [0, index % 2 === 0 ? 45 : -45]);
  const opacity = useTransform(scrollYProgress, [endScroll - 0.15, endScroll], [1, 0]);

  return (
    <motion.div
      // Mobile: height-driven (w-auto lets width follow image ratio)
      // Desktop: width-driven (md:h-auto resets the fixed height)
      className={`relative flex-shrink-0 drop-shadow-2xl pointer-events-none w-auto ${mobileHeight} md:h-auto ${desktopWidthClass}`}
      style={{ zIndex, y, rotate, opacity }}
    >
      <motion.div
        className="w-full h-full"
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
        {/* Mobile: h-full w-auto keeps image within the fixed-height container */}
        {/* Desktop: w-full h-auto fills the fixed-width container */}
        <img
          src={src}
          alt={`Letter ${index}`}
          referrerPolicy="no-referrer"
          className="h-full w-auto md:w-full md:h-auto object-contain"
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

// Per-letter mobile heights calibrated to compensate for different PNG whitespace/padding
// so all letters appear the same visual size on screen
const desktopLetterConfig = [
  { src: "https://qncdn.vzhangxin.com/gnemo/lalme/g.png", desktopWidthClass: "md:w-48 lg:w-64", mobileHeight: "h-[220px]" },
  { src: "https://qncdn.vzhangxin.com/gnemo/lalme/n.png", desktopWidthClass: "md:w-auto",        mobileHeight: "h-[220px]" },
  { src: "https://qncdn.vzhangxin.com/gnemo/lalme/e.png", desktopWidthClass: "md:w-48 lg:w-64", mobileHeight: "h-[220px]" },
  { src: "https://qncdn.vzhangxin.com/gnemo/lalme/m.png", desktopWidthClass: "md:w-56 lg:w-72", mobileHeight: "h-[220px]" },
  { src: "https://qncdn.vzhangxin.com/gnemo/lalme/o.png", desktopWidthClass: "md:w-48 lg:w-64", mobileHeight: "h-[220px]" },
];

// Kept for reference
const MOBILE_LETTER_HEIGHT = "h-[165px]";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] md:min-h-[150vh] flex flex-col items-center justify-start overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
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

      {/* ─── MOBILE layout (hidden on md+) ─── */}
      <div className="flex md:hidden flex-col items-center justify-center w-full h-screen relative z-10 pt-20 pb-10">
        {/* Title */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative flex flex-col items-center justify-center mb-6 z-20 whitespace-nowrap"
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative font-display uppercase text-white text-[36px] leading-none tracking-normal z-10 drop-shadow-sm"
          >
            PRODUCT
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.7 }}
            className="absolute top-0 font-babylonica text-neon-green text-[48px] leading-none tracking-normal drop-shadow-md z-20"
          >
            Designer
          </motion.span>
        </motion.div>

        {/* Letters: scattered diagonal, per-letter heights compensate for PNG padding */}
        <motion.div style={{ y: textY }} className="flex flex-col w-full px-2">
          {/* G — center-right */}
          <div className="ml-[22%]">
            <AnimatedLetter src={desktopLetterConfig[0].src} index={0} scrollYProgress={scrollYProgress} mobileHeight={desktopLetterConfig[0].mobileHeight} desktopWidthClass={desktopLetterConfig[0].desktopWidthClass} />
          </div>
          {/* N — far left, overlapping G */}
          <div className="ml-0 -mt-[18%]">
            <AnimatedLetter src={desktopLetterConfig[1].src} index={1} scrollYProgress={scrollYProgress} mobileHeight={desktopLetterConfig[1].mobileHeight} desktopWidthClass={desktopLetterConfig[1].desktopWidthClass} />
          </div>
          {/* E — center-left */}
          <div className="ml-[16%] -mt-[16%]">
            <AnimatedLetter src={desktopLetterConfig[2].src} index={2} scrollYProgress={scrollYProgress} mobileHeight={desktopLetterConfig[2].mobileHeight} desktopWidthClass={desktopLetterConfig[2].desktopWidthClass} />
          </div>
          {/* M — center-right, overlapping E */}
          <div className="ml-[32%] -mt-[18%]">
            <AnimatedLetter src={desktopLetterConfig[3].src} index={3} scrollYProgress={scrollYProgress} mobileHeight={desktopLetterConfig[3].mobileHeight} desktopWidthClass={desktopLetterConfig[3].desktopWidthClass} />
          </div>
          {/* O — far left */}
          <div className="ml-[2%] -mt-[16%]">
            <AnimatedLetter src={desktopLetterConfig[4].src} index={4} scrollYProgress={scrollYProgress} mobileHeight={desktopLetterConfig[4].mobileHeight} desktopWidthClass={desktopLetterConfig[4].desktopWidthClass} />
          </div>
        </motion.div>
      </div>

      {/* ─── DESKTOP layout (hidden on mobile) ─── */}
      <div className="hidden md:flex w-full h-screen flex-col items-center justify-center relative shrink-0 pt-16">
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 -mt-12">
          <div className="relative flex items-center justify-center w-full">
            {/* Title floating above */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-10 z-20 whitespace-nowrap"
            >
              <div className="relative flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="relative font-display uppercase text-white text-[48px] lg:text-[64px] leading-none tracking-normal z-10 drop-shadow-sm"
                >
                  PRODUCT
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.7 }}
                  className="absolute -top-1 lg:-top-2 font-babylonica text-neon-green text-[72px] lg:text-[96px] leading-none tracking-normal drop-shadow-md z-20"
                >
                  Designer
                </motion.span>
              </div>
            </motion.div>

            {/* Letters: horizontal row */}
            <motion.div
              style={{ y: textY }}
              className="flex items-center justify-center -space-x-10 lg:-space-x-16 w-full"
            >
              {desktopLetterConfig.map(({ src, desktopWidthClass }, index) => (
                <AnimatedLetter
                  key={index}
                  src={src}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  mobileHeight={MOBILE_LETTER_HEIGHT}
                  desktopWidthClass={desktopWidthClass}
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
