import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamMember1 from "@/assets/team-member-1.png";
import teamMember2 from "@/assets/team-member-2.png";
import teamMember3 from "@/assets/team-member-3.png";
import teamMember4 from "@/assets/oleksii.png";


interface TeamMember {
  id: number;
  name: string;
  surname: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: "Vaso", surname: "Berulava", role: "SEO", image: teamMember3 },
  { id: 2, name: "Katia", surname: "Tsymbal", role: "Kto-to", image: teamMember2 },
  { id: 3, name: "Alexi", surname: "Kto-to", role: "SEO-2", image: teamMember3 },
  { id: 4, name: "Sofia", surname: "Matuhkina", role: "UI/UX Designer", image: teamMember4 },
  { id: 5, name: "Oleksii", surname: "Zarytskyi", role: "Software Developer", image: teamMember4 },
  { id: 6, name: "Anatolii", surname: "Grigorzhevsky", role: "Software Developer", image: teamMember1 }
];

export const VRTeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  // Calculate visible members (current + neighbors)
  const getVisibleMembers = () => {
    const prev = currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1;
    const next = currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleMembers();

  return (
   <section className="relative md:min-h-screen w-full overflow-hidden bg-black">
   <div className="relative z-10 flex flex-col items-center px-4 py-20 md:py-32">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[8vw] md:text-[6vw] font-light mb-4">
            MEET THE TEAM
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            The creative minds behind the magic
          </p>
        </motion.div>

        {/* Counter */}
        <div className="absolute top-8 right-4 md:top-12 md:right-8 text-2xl md:text-4xl font-light tabular-nums text-white z-40">
          {(currentIndex + 1).toString().padStart(2, "0")} /{" "}
          {teamMembers.length.toString().padStart(2, "0")}
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center mb-12"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {visibleIndices.map((index, position) => {
                const member = teamMembers[index];
                const isCenter = position === 1;
                const offset = (position - 1) * 300; // -300, 0, 300

                return (
                  <motion.div
                    key={member.id}
                    className="absolute"
                    initial={{ 
                      x: offset > 0 ? 400 : offset < 0 ? -400 : 0,
                      scale: isCenter ? 1 : 0.7,
                      opacity: isCenter ? 1 : 0.3,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                    }}
                    animate={{ 
                      x: offset,
                      scale: isCenter ? 1 : 0.7,
                      opacity: isCenter ? 1 : 0.3,
                      filter: isCenter ? "blur(0px)" : "blur(4px)",
                    }}
                    exit={{ 
                      x: offset < 0 ? -400 : 400,
                      scale: 0.7,
                      opacity: 0,
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ 
                      zIndex: isCenter ? 20 : 10,
                    }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Avatar Circle */}
                      <motion.div
                        className="relative group"
                        whileHover={isCenter ? { scale: 1.05 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                          <img
                            src={member.image}
                            alt={`${member.name} ${member.surname}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Hover Overlay */}
                        {isCenter && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>

                      {/* Member Info */}
                      {isCenter && (
                        <motion.div
                          className="mt-8 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <h3 className="text-3xl md:text-5xl font-light mb-2">
                            {member.name}{" "}
                            <span className="font-normal">{member.surname}</span>
                          </h3>
                          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                            {member.role}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 z-40">
         <button
           onClick={goToPrevious}
           className="
             flex items-center justify-center
             rounded-full w-14 h-14 md:w-16 md:h-16
             bg-transparent
             border border-white
             hover:bg-white/10
             transition-all duration-300 cursor-pointer active:scale-95
           "
         >
           <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
         </button>
         
         <button
           onClick={goToNext}
           className="
             flex items-center justify-center
             rounded-full w-14 h-14 md:w-16 md:h-16
             bg-transparent
             border border-white
             hover:bg-white/10
             transition-all duration-300 cursor-pointer active:scale-95
           "
         >
           <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
         </button>
        </div>
      </div>
    </section>
  );
};
