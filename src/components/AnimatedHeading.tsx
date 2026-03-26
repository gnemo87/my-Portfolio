import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedHeading
 * Pass `lines` as an array of strings — each line is revealed with
 * an overflow-hidden slide-up effect, staggered word by word.
 *
 * variant options:
 *  "slide-up"   – words slide up from clip (default, classic editorial)
 *  "blur-in"    – entire heading fades + unblurs + scales from 110%
 *  "drop"       – words drop from above with spring bounce
 *  "scramble"   – fade + letter-spacing collapse
 */

interface Props {
  lines: string[];
  variant?: "slide-up" | "blur-in" | "drop" | "scramble";
  className?: string;
  delay?: number;
  stagger?: number;
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

// ── slide-up: each word masked and revealed from below ──
const slideUpWord = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── drop: words fall from top with spring ──
const dropWord = {
  hidden: { y: "-120%", opacity: 0, rotate: -3 },
  visible: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

// ── scramble: shrinks letter-spacing + fades in ──
const scrambleWord = {
  hidden: { opacity: 0, letterSpacing: "0.4em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    letterSpacing: "-0.02em",
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AnimatedHeading({
  lines,
  variant = "slide-up",
  className = "",
  delay = 0,
  stagger = 0.08,
}: Props) {
  // blur-in: whole block, no word split
  if (variant === "blur-in") {
    return (
      <motion.h2
        className={className}
        initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </motion.h2>
    );
  }

  const wordVariant = variant === "drop" ? dropWord : variant === "scramble" ? scrambleWord : slideUpWord;

  return (
    <motion.h2
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ transitionDelay: `${delay}s` } as React.CSSProperties}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden leading-[1.05]">
          {line.split(" ").map((word, wordIdx) => (
            <motion.span
              key={wordIdx}
              variants={wordVariant}
              className="inline-block mr-[0.25em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
