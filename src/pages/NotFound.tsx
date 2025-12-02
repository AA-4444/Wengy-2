import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
}

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          vx: 0,
          vy: 0,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 1,
        });
      }
      particlesRef.current = particles;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 2;
          particle.vy -= Math.sin(angle) * force * 2;
        }

        const baseDistX = particle.baseX - particle.x;
        const baseDistY = particle.baseY - particle.y;
        particle.vx += baseDistX * 0.02;
        particle.vy += baseDistY * 0.02;

        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "#000000" }}
      />

      <div className="text-center z-10 px-6">
        {/* 404 Number */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[20vw] md:text-[15vw] font-light leading-none text-white">
            {["4", "0", "4"].map((digit, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {digit}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          className="mb-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-2xl md:text-4xl font-light text-white">
            PAGE NOT FOUND
          </p>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-md mx-auto">
            Looks like this page never made it past concept stage.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            onClick={() => navigate(-1)}
            className="
              group
              flex items-center justify-center
              rounded-full
              border border-white
              bg-transparent
              text-white
              px-8 py-3
              text-xs sm:text-sm md:text-base
              tracking-[0.3em]
              uppercase
              hover:bg-white hover:text-black
              transition-all duration-300
            "
          >
            <ArrowLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" />
            GO BACK
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="
              group
              flex items-center justify-center
              rounded-full
              border border-white
              bg-transparent
              text-white
              px-8 py-3
              text-xs sm:text-sm md:text-base
              tracking-[0.3em]
              uppercase
              hover:bg-white hover:text-black
              transition-all duration-300
            "
          >
            <Home className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
            HOME PAGE
          </Button>
        </motion.div>

       
      </div>
    </div>
  );
};

export default NotFound;