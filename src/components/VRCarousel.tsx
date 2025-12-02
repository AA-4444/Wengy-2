import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ava from "@/assets/project1.png";
import citywall from "@/assets/project2.png";
import vrLights from "@/assets/vr-lights.jpg";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

const items: CarouselItem[] = [
  { id: 1, title: "ava100", image: ava },
  { id: 2, title: "city-wall", image: citywall },
  { id: 3, title: "LIGHTS", image: vrLights },
];

export const VRCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useState(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  });

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      goToNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      goToPrevious();
    }
  };

  const getCardPosition = (index: number) => {
    let diff = index - currentIndex;

    // Normalize the difference to be between -1 and 1 for smooth circular motion
    if (diff > items.length / 2) {
      diff -= items.length;
    } else if (diff < -items.length / 2) {
      diff += items.length;
    }

    // Adjust spacing for mobile
    const angle = diff * 45;
    const translateX = diff * (isMobile ? 250 : 400);
    const translateZ = -Math.abs(diff) * (isMobile ? 150 : 200);
    const rotateY = -angle;
    const scale = 1 - Math.abs(diff) * 0.2;
    const opacity = 1 - Math.abs(diff) * 0.3;
    const zIndex = 30 - Math.abs(diff) * 10;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: Math.max(0, zIndex),
      opacity: Math.max(0.3, opacity),
    };
  };

  return (
    <section
      className={`relative md:min-h-screen w-full overflow-hidden bg-black ${
        isMobile ? "" : "cursor-none"
      }`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >      
    {/* Custom cursor - desktop only */}
      {!isMobile && isHovering && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-50 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>
      )}

      <div
        className="
          relative z-10
          flex flex-col items-center
          px-4 py-12
          md:py-20
          md:min-h-screen md:justify-center
        "
      >
      <div className="mb-12 text-center">
        <h2 className="text-[6vw] font-light mb-4">
          OUR CASES
        </h2>
        <p className="text-xl text-muted-foreground font-light">
          Immersive cases & digital experiences
        </p>
      </div>

        {/* Carousel Container */}
        <div
          className="relative w-full max-w-[90vw] h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
          style={{
            perspective: isMobile ? "1000px" : "1500px",
            perspectiveOrigin: "center center",
          }}
        >
          {/* NEW: счетчик в правом верхнем углу, как в VRTeamCarousel */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 text-2xl md:text-4xl font-light tabular-nums text-white z-40">
            {(currentIndex + 1).toString().padStart(2, "0")} /{" "}
            {items.length.toString().padStart(2, "0")}
          </div>

          <div
            className="absolute w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              const position = getCardPosition(index);
              const isActive = index === currentIndex;

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) ${position.transform}`,
                    zIndex: position.zIndex,
                    opacity: position.opacity,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="relative w-[280px] h-[180px] sm:w-[400px] sm:h-[240px] md:w-[500px] md:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group"
                    onMouseEnter={() =>
                      !isMobile && isActive && setIsHovering(true)
                    }
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                      <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-wider drop-shadow-2xl text-center">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       {/* Navigation */}
       <div className="flex gap-4 md:gap-6 mt-8 md:mt-14 z-40 cursor-pointer">
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