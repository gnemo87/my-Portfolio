import { motion } from "framer-motion";
import { useId } from "react";

interface PinkBadgeProps {
  className?: string;
  color?: string;
  textColor?: string;
}

export function PinkBadge({ 
  className = "", 
  color = "laser",
  textColor = "fill-brutal-black"
}: PinkBadgeProps) {
  const uid = useId();
  const gradientId = `laser-gradient-${uid.replace(/:/g, "")}`;
  const isLaser = color === "laser" || color === "text-neon-pink";


  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Scalloped SVG Background */}
      <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full ${!isLaser ? color + ' fill-current' : ''} animate-[spin_20s_linear_infinite]`}>
        {isLaser && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0080" />
              <stop offset="25%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#ffdf00" />
              <stop offset="75%" stopColor="#b200ff" />
              <stop offset="100%" stopColor="#ff0080" />
            </linearGradient>
          </defs>
        )}
        <path 
          fill={isLaser ? `url(#${gradientId})` : undefined}
          d="M50,4 C54.5,4 57.5,7.5 61.5,8.5 C65.5,9.5 69.5,7 73,9.5 C76.5,12 77,16.5 80,19.5 C83,22.5 87.5,23 90,26.5 C92.5,30 90,34 91,38 C92,42 95.5,45 95.5,49.5 C95.5,54 92,57 91,61 C90,65 92.5,69 90,72.5 C87.5,76 83,76.5 80,79.5 C77,82.5 76.5,87 73,89.5 C69.5,92 65.5,89.5 61.5,90.5 C57.5,91.5 54.5,95 50,95 C45.5,95 42.5,91.5 38.5,90.5 C34.5,89.5 30.5,92 27,89.5 C23.5,87 23,82.5 20,79.5 C17,76.5 12.5,76 10,72.5 C7.5,69 10,65 9,61 C8,57 4.5,54 4.5,49.5 C4.5,45 8,42 9,38 C10,34 7.5,30 10,26.5 C12.5,23 17,22.5 20,19.5 C23,16.5 23.5,12 27,9.5 C30.5,7 34.5,9.5 38.5,8.5 C42.5,7.5 45.5,4 50,4 Z" 
        />
      </svg>
      {/* Badge Text */}
      <div className={`relative z-10 flex flex-col items-center justify-center ${textColor.replace('fill-', 'text-')}`}>
        <span className="font-display text-base md:text-lg lg:text-xl uppercase tracking-tighter transform scale-y-125">PORTFOLIO</span>
      </div>
      {/* Circular Text (Approximation) */}
      <div className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse]">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path id="curve" d="M 16 50 A 34 34 0 1 1 84 50 A 34 34 0 1 1 16 50" fill="transparent" />
          <text className={`text-[6.5px] font-sans uppercase tracking-[0.16em] ${textColor} font-medium`}>
            <textPath href="#curve" startOffset="0%">
              PORTFOLIO - PORTFOLIO - PORTFOLIO - PORTFOLIO - 
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
