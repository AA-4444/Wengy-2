import { motion } from "framer-motion";

export const CappenContact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center py-32 px-6 relative">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-[10vw] leading-[0.9] font-light mb-12">
          LET'S WORK
          <br />
          <span className="text-primary">TOGETHER</span>
        </h2>

        <motion.a
          href="mailto:hello@agency.com"
          className="inline-block text-4xl md:text-5xl font-light border-b-2 border-current hover:text-primary hover:border-primary transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          contact@wengy.co
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-12 w-full max-w-7xl px-6 flex justify-between items-center text-sm font-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div>© 2024 AGENCY</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
          <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
        </div>
      </motion.div>
    </section>
  );
};
