import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const CappenContact = () => {
  const socials = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/wengy.marketing?igsh=YWs1Y2JqNGR6emZ2&utm_source=qr" },
    { label: "FACEBOOK", href: "https://www.facebook.com/share/1AE4rPhfPb/?mibextid=wwXIfr" },
    { label: "WHATSAPP", href: "https://wa.me/995599249806" },
  ];

  return (
   <section
     id="contact"
     className="
       relative min-h-screen bg-black text-white
       flex items-center justify-center
       px-6 md:px-16 lg:px-24
       pt-24 pb-32 md:py-24
       overflow-hidden
     "
   >
    
     
<motion.a
      href="mailto:wengy.agency@gmail.com"
      className="
        inline-block
        whitespace-nowrap     /* НЕ ДАЁМ ПЕРЕНОС */ 
        text-[5vw]            /* фикс для мобильных */
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
        font-black tracking-tight uppercase
        transition-colors duration-300
        hover:text-primary
      "
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      wengy.agency@gmail.com
    </motion.a>
      {/* ===== MOBILE ===== */}
      <div className="absolute inset-x-6 bottom-24 flex flex-col items-start gap-8 md:hidden">
        {/* LET’S CONNECT — mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="select-none text-left"
        >
          <h2 className="leading-[0.9] tracking-tight text-[18vw] font-black text-white/5">
            LET&apos;S
            <br />
            <span>CONNECT.</span>
          </h2>
        </motion.div>

        {/* Socials mobile */}
        <motion.div
          className="w-full max-w-sm flex flex-col gap-6 text-white text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {socials.map((item) => (
            <a key={item.label} href={item.href} className="group block w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm tracking-[0.25em] group-hover:text-neutral-200 transition-colors duration-300">
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="h-px w-full bg-white/40 group-hover:bg-white transition-colors duration-300" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ===== DESKTOP ===== */}
      <motion.div
        className="hidden md:block absolute left-6 md:left-16 bottom-24 md:bottom-28 select-none"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="leading-[0.85] tracking-tight text-[12vw] md:text-[8vw] font-black text-white/5">
          LET&apos;S
          <br />
          <span>CONNECT.</span>
        </h2>
      </motion.div>

      <motion.div
        className="
          hidden md:flex
          absolute
          right-6 md:right-10 lg:right-14
          bottom-20 md:bottom-24 lg:bottom-28
          w-[420px] md:w-[520px] lg:w-[580px]
          flex-col gap-8 md:gap-9
          text-white
        "
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        {socials.map((item) => (
          <a key={item.label} href={item.href} className="group block w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg md:text-xl tracking-[0.3em] group-hover:text-neutral-300 transition-colors duration-300">
                {item.label}
              </span>
              <ArrowRight
                className="
                  w-6 h-6 md:w-7 md:h-7
                  opacity-70
                  group-hover:opacity-100
                  group-hover:translate-x-1
                  transition-all duration-300
                "
              />
            </div>
            <div className="h-px w-full bg-white/40 group-hover:bg-white transition-colors duration-300" />
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute left-6 md:left-16 bottom-6 flex items-center gap-6 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <span>Legal stuff</span>
        <span className="h-px w-12 bg-white/30" />
        <span>© 2024 WENGY STUDIO</span>
      </motion.div>
    </section>
  );
};