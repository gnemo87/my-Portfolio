import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedHeading } from "./AnimatedHeading";
import { PinkBadge } from "./PinkBadge";
import { WaveDivider } from "./WaveDivider";

const cardData = [
  {
    id: 'GNEMO',
    idLabel: '档案编号',
    title: '陶非',
    signature: 'Taofei',
    subtitle: '',
    list: [
      { label: '资深设计专家', value: '10年+ UI/UE设计经验（含7年管理岗），主导多款产品从0-1全流程设计，具备AIGC项目落地经验' },
      { label: '行业聚焦', value: '深耕社交类产品设计，精通用户增长与体验优化策略' },
      { label: '全链路能力', value: '品牌设计｜动态交互｜3D建模（Blender）｜手绘原画｜AI流程设计' },
      { label: '管理优势', value: '跨部门协作｜设计团队培训｜质量标准体系建设' },
    ],
    quote: "",
    footer: '欢迎自由职业合作机会。gnemo8686@gmail.com',
    bgColor: '#3B0764',
    textColor: 'text-[#EDE9FE]',
    accentColor: 'text-[#C4B5FD]',
    borderColor: 'border-[#6D28D9]'
  },
  {
    id: '01',
    idLabel: '经历编号',
    title: '设计专家',
    subtitle: '云账户技术（天津）有限公司北京分公司',
    list: [
      { label: '时间', value: '2021/05 - 2024/06' },
      { label: '标签', value: 'UI/UE设计, 3D设计, AIGC产品设计' },
    ],
    quote: '主导核心业务的体验设计与视觉升级，探索3D与AIGC技术在产品中的创新应用。',
    footer: '如有任何问题，请联系 gnemo8686@gmail.com',
    bgColor: '#0891B2',
    textColor: 'text-[#CFFAFE]',
    accentColor: 'text-[#22D3EE]',
    borderColor: 'border-[#0E7490]'
  },
  {
    id: '02',
    idLabel: '经历编号',
    title: 'UI美术总监',
    subtitle: '北京蓝亚盒子科技有限公司',
    list: [
      { label: '时间', value: '2019/12 - 2022/02' },
      { label: '标签', value: 'UI设计, 交互设计, 游戏UI' },
    ],
    quote: '全面负责公司产品的UI/UX设计及美术方向把控，带领团队完成多项核心业务的视觉升级与体验优化。',
    footer: '如有任何问题，请联系 gnemo8686@gmail.com',
    bgColor: '#4F46E5',
    textColor: 'text-[#E0E7FF]',
    accentColor: 'text-[#A5B4FC]',
    borderColor: 'border-[#4338CA]'
  },
  {
    id: '03',
    idLabel: '经历编号',
    title: 'UED经理',
    subtitle: '北京裂变科技有限公司',
    list: [
      { label: '时间', value: '2015/6 - 2019/12' },
      { label: '标签', value: 'UI设计, 交互设计, 礼物特效' },
    ],
    quote: '管理UED团队，主导多款核心产品的界面设计、交互原型制作及动效设计，显著提升了用户留存与活跃度。',
    footer: '如有任何问题，请联系 gnemo8686@gmail.com',
    bgColor: '#EA580C',
    textColor: 'text-[#FFF7ED]',
    accentColor: 'text-[#FB923C]',
    borderColor: 'border-[#C2410C]'
  },
  {
    id: '04',
    idLabel: '经历编号',
    title: '设计主管',
    subtitle: '柒贰零健康科技有限公司',
    list: [
      { label: '时间', value: '2014/4 - 2015/7' },
      { label: '标签', value: 'UI设计, 交互设计, 视觉设计' },
    ],
    quote: '负责健康类App的整体视觉风格设定与交互流程设计，优化产品使用体验。',
    footer: '如有任何问题，请联系 gnemo8686@gmail.com',
    bgColor: '#16A34A',
    textColor: 'text-[#F0FDF4]',
    accentColor: 'text-[#4ADE80]',
    borderColor: 'border-[#15803D]'
  },
  {
    id: '05',
    idLabel: '经历编号',
    title: '高级UI工程师',
    subtitle: '用友畅捷通信息技术',
    list: [
      { label: '时间', value: '2009/7 - 2014/4' },
      { label: '标签', value: 'UI设计, 交互设计, 视觉设计' },
    ],
    quote: '参与企业级SaaS产品的界面设计与规范制定，确保多端产品视觉与交互的一致性。',
    footer: '如有任何问题，请联系 gnemo8686@gmail.com',
    bgColor: '#DB2777',
    textColor: 'text-[#FDF2F8]',
    accentColor: 'text-[#F472B6]',
    borderColor: 'border-[#BE185D]'
  }
];

export function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Safari detection
  const isSafari = useMemo(() => {
    if (typeof window === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  // Character image style per browser
  const charImgStyle = isSafari
    ? { position: "absolute" as const, left: "320px", bottom: "-220px", width: "310px", height: "auto", zIndex: 9999 }
    : { position: "absolute" as const, left: "120px", bottom: "-100px", width: "500px", height: "auto", zIndex: 9999 };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const { scrollYProgress: sequenceScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Sync video playback with scroll
  useMotionValueEvent(sequenceScrollProgress, "change", (latest) => {
    if (videoRef.current && videoDuration > 0) {
      videoRef.current.currentTime = latest * videoDuration;
    }
  });


  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 lg:py-64 relative z-10 overflow-hidden">

      {/* Background video — same as Works */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
        src="https://qncdn.vzhangxin.com/gnemo/V1-Draft.mp4"
        muted
        playsInline
        onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
        style={{ zIndex: 0 }}
      />
      {/* Main content layout */}  
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 relative">
          
          {/* Character Image */}
          <img
            src="https://qncdn.vzhangxin.com/gnemo/benren.png"
            alt="Character"
            className="hidden lg:block pointer-events-none select-none absolute z-[9999]"
            style={{ left: "300px", top: "-100px" }}
          />

          {/* Left Side: Huge Typography & Controls */}
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center relative z-10">
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[32px] font-bold font-mengyuan tracking-[0.05em] text-[#1A0B2E]/50 mb-3"
            >
              个人资料
            </motion.p>
            <AnimatedHeading
              lines={["PERSONAL", "PROFILE"]}
              variant="slide-up"
              className="font-display text-[12vw] lg:text-[140px] leading-[0.95] tracking-tighter text-[#1A0B2E] uppercase m-0"
              stagger={0.1}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4 mt-12"
            >
              <button 
                onClick={prevCard}
                className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center hover:scale-105 transition-transform duration-300 z-50"
              >
                <ArrowLeft className="w-6 h-6 text-[#1A0B2E]" />
              </button>
              <button 
                onClick={nextCard}
                className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center hover:scale-105 transition-transform duration-300 z-50"
              >
                <ArrowRight className="w-6 h-6 text-[#1A0B2E]" />
              </button>
            </motion.div>
          </div>

          {/* Right Side: Stacked Cards */}
          <div ref={containerRef} className="w-full lg:w-1/2 relative min-h-[600px] flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
            
            {cardData.map((card, index) => {
              const relativeIndex = (index - currentIndex + cardData.length) % cardData.length;
              
              const isFront = relativeIndex === 0;
              
              // Fan out based on scroll progress (0 to 1)
              const xOffset = scrollProgress * relativeIndex * -35; 
              const yOffset = scrollProgress * relativeIndex * -40;
              const rotateOffset = scrollProgress * relativeIndex * -3;
              const targetScale = 1 - relativeIndex * 0.04;
              const scaleOffset = 1 - scrollProgress * (1 - targetScale);
              const zIndex = 50 - relativeIndex;
              const opacity = 1;

              return (
                <motion.div
                  key={card.id}
                  animate={{ 
                    x: xOffset, 
                    y: yOffset, 
                    rotate: rotateOffset, 
                    scale: scaleOffset, 
                    opacity: opacity,
                    zIndex: zIndex
                  }}
                  whileHover={!isFront ? { x: xOffset - 15, y: yOffset - 10, rotate: rotateOffset - 2 } : {}}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  onClick={() => !isFront && setCurrentIndex(index)}
                  className={`absolute w-[95%] sm:w-[90%] max-w-[420px] h-[560px] rounded-[2rem] p-6 md:p-8 flex flex-col shadow-2xl origin-bottom-right ${!isFront ? 'cursor-pointer' : ''}`}
                  style={{ 
                    backgroundColor: card.bgColor,
                    right: '0%',
                    bottom: '20px'
                  }}
                >
                  <div className="flex flex-col h-full text-left">
                    {/* Top Section */}
                    <div className="flex-grow">
                      {/* Meta / ID - Tiny, tracked, uppercase */}
                      <p className={`${card.textColor} opacity-50 text-[10px] tracking-[0.2em] uppercase font-sans mb-6`}>
                        {card.idLabel} // {card.id}
                      </p>

                      {/* Title & Subtitle - High contrast, tight leading */}
                      <div className="relative inline-block self-start mb-4">
                        <h3 className={`font-sans font-black text-4xl md:text-5xl ${card.accentColor} uppercase tracking-tight leading-[0.9] relative z-10`}>
                          {card.title}
                        </h3>
                        {card.signature && (
                          <span className="absolute top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 font-babylonica text-5xl md:text-6xl text-neon-green transform -rotate-12 pointer-events-none whitespace-nowrap z-20 drop-shadow-md">
                            {card.signature}
                          </span>
                        )}
                      </div>
                      
                      {card.subtitle && (
                        <p className={`${card.textColor} text-sm md:text-base font-sans font-light leading-relaxed opacity-90 max-w-[90%] mb-6`}>
                          {card.subtitle}
                        </p>
                      )}

                      {/* Minimalist List - Grid aligned */}
                      <div className="flex flex-col gap-y-4 w-full mt-8">
                        {card.list.map((item, i) => (
                          <div key={i} className="grid grid-cols-[85px_1fr] md:grid-cols-[95px_1fr] gap-4 items-start">
                            <span className={`${card.textColor} opacity-50 text-[10px] tracking-[0.1em] uppercase font-medium mt-1 leading-tight`}>
                              {item.label}
                            </span>
                            <span className={`${card.textColor} text-xs md:text-sm font-medium leading-relaxed`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section - Clean, left-aligned, no cursive */}
                    <div className="mt-auto pt-6">
                      {/* A single crisp accent line */}
                      <div className={`w-10 border-t-2 ${card.borderColor} mb-4`} />
                      
                      {card.quote && (
                        <p className={`${card.textColor} text-xs md:text-sm font-sans font-light leading-relaxed mb-4 opacity-80 max-w-[95%]`}>
                          {card.quote}
                        </p>
                      )}
                      <p className={`${card.textColor} opacity-40 text-[9px] tracking-wider uppercase font-sans`}>
                        {card.footer}
                      </p>
                    </div>
                  </div>

                  {/* Rainbow laser badge on bottom-left corner, only on front card */}
                  {isFront && (
                    <div className="absolute -bottom-6 -left-6 w-28 h-28 z-50" style={{ transform: "rotate(-20deg)" }}>
                      <PinkBadge color="laser" textColor="fill-brutal-black" />
                    </div>
                  )}
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
