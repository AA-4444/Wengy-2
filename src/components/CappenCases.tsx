import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const cases = [
  {
    id: 1,
    title: "NEONDOO",
    category: "Fintech Platform",
    year: "2024",
    description: "Revolutionary payment system for next-gen digital banking",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 2,
    title: "STELLAR",
    category: "E-Commerce",
    year: "2024",
    description: "Luxury marketplace redefining online shopping experience",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: 3,
    title: "QUANTUM",
    category: "Healthcare",
    year: "2023",
    description: "AI-powered health monitoring and telemedicine platform",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    id: 4,
    title: "NEXUS",
    category: "Entertainment",
    year: "2023",
    description: "Immersive streaming platform for next-gen content",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80"
  },
];

export const CappenCases = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-background">
      <motion.div 
        className="max-w-7xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-[6vw] font-light mb-4">
            CASE STUDIES
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Transforming visions into digital excellence
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {cases.map((caseItem, index) => (
              <CarouselItem key={caseItem.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-6">
                    <motion.img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-500" />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-3xl font-light group-hover:text-primary transition-colors duration-300">
                        {caseItem.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">{caseItem.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{caseItem.category}</p>
                    <p className="text-base font-light leading-relaxed">
                      {caseItem.description}
                    </p>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 bg-background border-foreground/20 hover:bg-foreground hover:text-background" />
            <CarouselNext className="static translate-y-0 bg-background border-foreground/20 hover:bg-foreground hover:text-background" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
};
