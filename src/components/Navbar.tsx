import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }
    } else {
      // For cross-page navigation, we use window.location to ensure the hash scroll triggers correctly
      window.location.href = `/#${id}`;
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto mix-blend-exclusion">
        {/* Left Logo */}
        <a href="/" onClick={handleHomeClick} className="flex items-baseline gap-2 group">
          <span className="text-2xl md:text-3xl font-display uppercase tracking-tighter text-white leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
            GN<span className="italic pr-1">E</span>MO
          </span>
          <span className="hidden sm:inline text-3xl md:text-4xl font-serif italic font-light tracking-tight text-white/60 group-hover:text-white/90 transition-colors duration-300 leading-none">
            Portfolio
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="text-white text-[15px] font-sans tracking-widest hover:text-neon-green transition-colors"
          >
            个人资料
          </a>
          <a
            href="/#works"
            onClick={(e) => handleNavClick(e, "works")}
            className="text-white text-[15px] font-sans tracking-widest hover:text-neon-green transition-colors"
          >
            精选作品
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-6 py-2 rounded-full border border-white text-white text-[15px] font-sans tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            联系我
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 text-white"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-current block rounded-full origin-center" 
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-current block rounded-full" 
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="w-6 h-[2px] bg-current block rounded-full origin-center" 
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-zinc-950/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              href="/#about" 
              onClick={(e) => handleNavClick(e, "about")}
              className="text-2xl font-sans font-bold tracking-widest text-white hover:text-neon-green transition-colors"
            >
              个人资料
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              href="/#works" 
              onClick={(e) => handleNavClick(e, "works")}
              className="text-2xl font-sans font-bold tracking-widest text-white hover:text-neon-green transition-colors"
            >
              精选作品
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              href="/#contact" 
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-2xl font-sans font-bold tracking-widest text-neon-green hover:text-[#b3e600] transition-colors"
            >
              联系我
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
