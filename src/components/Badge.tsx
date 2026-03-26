import { motion } from "framer-motion";

interface BadgeProps {
  className?: string;
  text?: string;
  bgColor?: string;
  textColor?: string;
  rotate?: number;
}

export function Badge({ 
  className = "", 
  text = "CREATIVE", 
  bgColor = "bg-neon-pink", 
  textColor = "text-white",
  rotate = -45
}: BadgeProps) {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: rotate }}
      animate={{ scale: 1, rotate: rotate }}
      transition={{ type: "spring", delay: 0.8, bounce: 0.5 }}
      className={`absolute z-20 ${className}`}
    >
      <div className={`${bgColor} ${textColor} px-6 py-3 rounded-full font-sans font-bold text-sm md:text-base tracking-widest shadow-xl border-2 border-white/20 whitespace-nowrap`}>
        {text}
      </div>
    </motion.div>
  );
}
