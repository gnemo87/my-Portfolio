import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { works } from "../data/works";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workIndex = works.findIndex((w) => w.id === id);
  const work = workIndex !== -1 ? works[workIndex] : null;

  // Prev / Next works (loop around)
  const prevWork = works[(workIndex - 1 + works.length) % works.length];
  const nextWork = works[(workIndex + 1) % works.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleBack = () => {
    // Navigate to home and scroll to works section
    window.location.href = "/#works";
  };

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brutal-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">未找到作品</h1>
          <button 
            onClick={() => navigate("/")}
            className="text-neon-pink hover:text-white transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-black text-white relative">
      {/* Faint dot background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="fixed top-28 left-4 md:left-8 z-40 flex items-center gap-2 text-white mix-blend-difference hover:text-neon-pink transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-pink transition-colors bg-black/20 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-mono text-sm uppercase tracking-widest hidden md:block">返回</span>
        </button>

        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
           <motion.div 
             layoutId={`meta-${work.id}`} 
             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
             className="flex items-center justify-center gap-4 mb-6"
           >
              <span className={`text-sm font-mono uppercase tracking-widest ${work.colorClass}`}>
                {work.category}
              </span>
              <span className="text-sm font-mono uppercase tracking-widest text-gray-500">
                {work.date}
              </span>
            </motion.div>
            
            <motion.h1 
              layoutId={`title-${work.id}`} 
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-8xl uppercase tracking-wide text-white mb-8 leading-[0.9]"
            >
              {work.title}
            </motion.h1>
        </div>

        {/* Images for Detail */}
        {work.detailImages && (
          <div className="w-full flex flex-col items-center pb-20 px-4">
            {work.detailImages.map((item, index) => {
              const isVideo = item.endsWith(".mp4");
              const commonProps = {
                key: index,
                className: "w-full max-w-[1200px] h-auto block mb-0",
                initial: { opacity: 0, y: 100 },
                animate: { opacity: 1, y: 0 },
                transition: { 
                  duration: 1, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + (index * 0.1) 
                }
              };

              if (isVideo) {
                return (
                  <motion.video
                    {...commonProps}
                    src={item}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                );
              }

              return (
                <motion.img 
                  {...commonProps}
                  src={item} 
                  alt={`${work.title} detail ${index + 1}`} 
                  referrerPolicy="no-referrer"
                />
              );
            })}
          </div>
        )}

        {/* ── Prev / Next Navigation ── */}
        <div className="w-full max-w-[1200px] mx-auto px-4 pb-24">
          <div className="border-t border-white/10 pt-12 flex items-center justify-between">
            {/* Previous */}
            <button
              onClick={() => navigate(`/work/${prevWork.id}`)}
              className="group flex items-center gap-3 text-left min-w-0 max-w-[42%]"
            >
              <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-green group-hover:bg-neon-green/10 transition-all">
                <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-neon-green transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">上一个</p>
                <p className="text-white font-display text-lg md:text-xl uppercase tracking-tight group-hover:text-neon-green transition-colors truncate">
                  {prevWork.title}
                </p>
              </div>
            </button>

            {/* Next */}
            <button
              onClick={() => navigate(`/work/${nextWork.id}`)}
              className="group flex items-center gap-3 text-right min-w-0 max-w-[42%]"
            >
              <div className="min-w-0 text-right">
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">下一个</p>
                <p className="text-white font-display text-lg md:text-xl uppercase tracking-tight group-hover:text-neon-green transition-colors truncate">
                  {nextWork.title}
                </p>
              </div>
              <div className="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-green group-hover:bg-neon-green/10 transition-all">
                <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-neon-green transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
