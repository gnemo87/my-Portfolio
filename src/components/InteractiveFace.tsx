import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface InteractiveFaceProps {
  className?: string;
  faceColor?: string;
  eyeColor?: string;
  mouthColor?: string;
  staticLook?: { x: number; y: number };
}

export function InteractiveFace({ 
  className = "", 
  faceColor = "radial-gradient(circle at 35% 35%, #8b7fff 0%, #5544ff 50%, #2a1e99 100%)",
  eyeColor = "text-brutal-black",
  mouthColor = "bg-brutal-black",
  staticLook
}: InteractiveFaceProps) {
  const mouseX = useMotionValue(staticLook ? staticLook.x : 0);
  const mouseY = useMotionValue(staticLook ? staticLook.y : 0);

  useEffect(() => {
    if (staticLook) return; // Don't track mouse if static look is provided

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, staticLook]);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const faceX = useTransform(smoothX, [-1, 1], ["-20%", "20%"]);
  const faceY = useTransform(smoothY, [-1, 1], ["-20%", "20%"]);
  const faceRotateX = useTransform(smoothY, [-1, 1], [35, -35]);
  const faceRotateY = useTransform(smoothX, [-1, 1], [-35, 35]);
  
  const distance = useTransform(() => {
    const x = smoothX.get();
    const y = smoothY.get();
    return Math.sqrt(x * x + y * y);
  });
  
  const mouthScaleY = useTransform(distance, [0, 1], [1, 2.5]);
  const mouthScaleX = useTransform(distance, [0, 1], [1, 1.1]);

  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      <div className="absolute inset-0 rounded-full shadow-2xl" style={{ background: faceColor, boxShadow: "inset -10px -10px 40px rgba(0,0,0,0.3), 10px 20px 40px rgba(0,0,0,0.4)" }} />
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{ transform: "translateZ(0)" }}>
        <motion.div 
          className="absolute inset-0"
          style={{ x: faceX, y: faceY, rotateX: faceRotateX, rotateY: faceRotateY, transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-full" style={{ transform: "translateZ(60px)" }}>
          {/* Left Eye */}
          <div className="absolute top-[35%] left-[25%] w-[25%] h-[25%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full" style={{ transform: "translateZ(20px)" }}>
              <motion.svg viewBox="0 0 100 100" className={`w-full h-full fill-current ${eyeColor}`} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}>
                <g transform="translate(50 50)">
                  <rect x="-10" y="-45" width="20" height="90" rx="5" />
                  <rect x="-10" y="-45" width="20" height="90" rx="5" transform="rotate(60)" />
                  <rect x="-10" y="-45" width="20" height="90" rx="5" transform="rotate(120)" />
                </g>
              </motion.svg>
            </div>
          </div>
          {/* Right Eye */}
          <div className="absolute top-[35%] right-[25%] w-[25%] h-[25%] translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full" style={{ transform: "translateZ(20px)" }}>
              <motion.svg viewBox="0 0 100 100" className={`w-full h-full fill-current ${eyeColor}`} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }}>
                <g transform="translate(50 50)">
                  <rect x="-10" y="-45" width="20" height="90" rx="5" />
                  <rect x="-10" y="-45" width="20" height="90" rx="5" transform="rotate(60)" />
                  <rect x="-10" y="-45" width="20" height="90" rx="5" transform="rotate(120)" />
                </g>
              </motion.svg>
            </div>
          </div>
          {/* Mouth */}
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2">
            <div style={{ transform: "translateZ(40px)" }}>
              <motion.div className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full origin-center ${mouthColor}`} style={{ scaleY: mouthScaleY, scaleX: mouthScaleX }} />
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
