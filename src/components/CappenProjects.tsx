import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { name: "City Wall Clean", year: "2024", category: "OK" },
  { name: "Style in Georgia", year: "2024", category: "E-COMMERCE" },
  { name: "Google (no)", year: "2023", category: "HEALTHCARE" },
  { name: "Apple (no)", year: "2023", category: "ENTERTAINMENT" },
];

export const CappenProjects = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-[6vw] font-light mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          SELECTED WORK
        </motion.h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectItem key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      className="group border-t border-border py-8 cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <motion.h3
          className="text-5xl md:text-7xl font-light group-hover:text-primary transition-colors duration-300"
          style={{ x: index % 2 === 0 ? x : useTransform(x, v => -v) }}
        >
          {project.name}
        </motion.h3>

        <div className="text-right">
          <div className="text-2xl font-light">{project.year}</div>
          <div className="text-lg text-muted-foreground">{project.category}</div>
        </div>
      </div>
    </motion.div>
  );
};
