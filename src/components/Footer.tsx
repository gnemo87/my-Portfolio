import { motion } from "framer-motion";
import { AnimatedHeading } from "./AnimatedHeading";

export function Footer() {
  return (
    <footer id="contact" className="bg-neon-green pt-14 md:pt-20 lg:pt-28 pb-6 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 mb-10 md:mb-14">
          
          {/* Left: Heading + Contact info */}
          <div>
            <AnimatedHeading
              lines={["CONTACT ME"]}
              variant="drop"
              className="font-display text-[12vw] lg:text-[140px] leading-[0.95] tracking-tighter text-brutal-black uppercase m-0 mb-4"
              stagger={0.12}
            />
            <span className="text-[32px] font-bold font-mengyuan tracking-[0.05em] text-brutal-black/40 mb-6 block">联系我</span>

            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-0 md:divide-x md:divide-brutal-black/15">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:pr-12"
              >
                <span className="text-brutal-black/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">电子邮箱 / E-MAIL</span>
                <a href="mailto:gnemo8686@gmail.com" className="group">
                  <span className="font-display text-[5vw] md:text-[3vw] lg:text-[42px] leading-none tracking-tight uppercase text-brutal-black group-hover:text-brutal-black/70 transition-colors duration-300">
                    GNEMO8686@GMAIL.COM
                  </span>
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:pl-12"
              >
                <span className="text-brutal-black/40 text-[10px] tracking-[0.3em] uppercase font-sans block mb-2">手机 / PHONE</span>
                <a href="tel:18600897407" className="group">
                  <span className="font-display text-[5vw] md:text-[3vw] lg:text-[42px] leading-none tracking-tight text-brutal-black group-hover:text-brutal-black/70 transition-colors duration-300">
                    186 0089 7407
                  </span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right: Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex gap-16 md:gap-20 shrink-0"
          >
            <div className="flex flex-col gap-2">
              <a href="/#about" className="text-brutal-black font-sans text-sm font-medium hover:opacity-60 transition-opacity">个人资料</a>
              <a href="/#works" className="text-brutal-black font-sans text-sm font-medium hover:opacity-60 transition-opacity">精选作品</a>
              <a href="/#contact" className="text-brutal-black font-sans text-sm font-medium hover:opacity-60 transition-opacity">联系我</a>
            </div>
          </motion.div>
        </div>


        {/* Bottom bar */}
        <div className="flex items-center justify-between py-4">
          <p className="text-brutal-black/30 font-mono text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} GNEMO
          </p>
          <p className="text-brutal-black/30 font-mono text-[10px] uppercase tracking-[0.2em]">
            DESIGNED & BUILT BY GNEMO
          </p>
        </div>
      </div>
    </footer>
  );
}
