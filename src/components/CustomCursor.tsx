import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Outer ring follows with spring delay
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

  // Inner dot follows more quickly
  const dotX = useSpring(cursorX, { stiffness: 700, damping: 35, mass: 0.5 });
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 35, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = target.closest(
        'a, button, [role="button"], input, select, textarea'
      );
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isVisible, cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer ring — follows with delay */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        <motion.div
          className="rounded-full border-2 mix-blend-difference"
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            x: isHovering ? -32 : -16,
            y: isHovering ? -32 : -16,
            borderColor: isHovering ? "rgba(204,255,0,0.8)" : "rgba(255,255,255,0.6)",
            scale: isPressed ? 0.8 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          {/* Hover text */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[8px] font-mono uppercase tracking-[0.15em] text-white mix-blend-difference"
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            Click
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Inner dot — follows quickly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      >
        <motion.div
          className="rounded-full bg-white mix-blend-difference"
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            x: isHovering ? -3 : -4,
            y: isHovering ? -3 : -4,
            opacity: isVisible ? 1 : 0,
            scale: isPressed ? 0.5 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.div>
    </>
  );
}
