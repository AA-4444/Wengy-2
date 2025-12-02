import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    name: "Tsugroomella",
    year: "2024",
    category: "BEAUTY & GROOMING",
    instagram: "https://www.instagram.com/tsugroomella?igsh=MXI2bWNscmpoNmNqNg==",
  },
  {
    name: "Style in Georgia",
    year: "2024",
    category: "FASHION & LIFESTYLE",
    instagram: "https://www.instagram.com/styleingeorgia?igsh=MW1qemR1Z3k0MzFudQ==",
  },
  {
    name: "Vent Service",
    year: "2024",
    category: "SERVICE BUSINESS",
    instagram: "https://www.instagram.com/vent.service_ge?igsh=MWlsbWwxc2x4bDB1Yw==",
  },
  {
    name: "Diana Kvariani",
    year: "2024",
    category: "FASHION BRAND",
    instagram: "https://www.instagram.com/diana_kvariani_official?igsh=OTZuMGYzcW85emkw",
  },
  {
    name: "The Park",
    year: "2024",
    category: "HOSPITALITY",
    instagram: "https://www.instagram.com/the.park.tbilisi?igsh=MXc0aXF1MzM5b3RpMg==",
  },
  {
    name: "Auto export",
    year: "2024",
    category: "AUTOMOTIVE",
    instagram: "https://www.instagram.com/autoexport.ge?igsh=cjVpYmdhMDlsOHU4",
  },
  {
    name: "City wall clean",
    year: "2025",
    category: "URBAN SERVICES",
    instagram: "https://www.instagram.com/citywallclean?igsh=ZXMzbHZrbTAxeHZw",
  },
  {
    name: "Balance House",
    year: "2025",
    category: "ARCHITECTURE & REAL ESTATE",
    instagram: "https://www.instagram.com/balance.houses?igsh=MTI2N3c1ZnJuejN5cw==",
  },
  {
    name: "Tsre.co",
    year: "2025",
    category: "REAL ESTATE",
    instagram: "https://www.instagram.com/tsre.co?igsh=MXEybmx6bnV3amV6Zw==",
  },
  {
    name: "Suptad Clean",
    year: "2025",
    category: "CLEANING SERVICES",
    instagram: "https://www.instagram.com/suptad.clean?igsh=MXM1MmI3MGdvajc4cQ==",
  },
  {
    name: "Ava 100",
    year: "2025",
    category: "RETAIL & FMCG",
    instagram: "https://www.instagram.com/ava100.ua?igsh=MTR5OWIyeW42YTBuYw==",
  },
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

const ProjectItem = ({
  project,
  index,
}: {
  project: {
    name: string;
    year: string;
    category: string;
    instagram: string;
  };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const xOpposite = useTransform(x, (v) => -v);

  return (
    <motion.div
      ref={ref}
      className="group border-t border-border py-8 cursor-pointer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center gap-4">
        {/* Название → кликабельный линк на Instagram */}
        <motion.a
          href={project.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-5xl md:text-7xl font-light group-hover:text-primary transition-colors duration-300"
          style={{ x: index % 2 === 0 ? x : xOpposite }}
        >
          {project.name}
        </motion.a>

        <div className="text-right shrink-0">
          <div className="text-2xl font-light">{project.year}</div>
          <div className="text-lg text-muted-foreground">
            {project.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
