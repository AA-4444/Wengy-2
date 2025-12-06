import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode, Children, useMemo } from "react";

interface ScrollScenesProps {
  children: ReactNode;
}

interface SceneProps {
  children: ReactNode;
  index: number;
  total: number;
  scrollYProgress: any;
}

const Scene = ({ children, index, total, scrollYProgress }: SceneProps) => {
  const sceneStart = index / total;
  const sceneEnd = (index + 1) / total;

  // Calculate animation values outside of render
  const y = useTransform(
	scrollYProgress,
	index === 0 
	  ? [0, sceneEnd * 0.8, sceneEnd]
	  : [sceneStart - 0.05, sceneStart, sceneEnd * 0.9, sceneEnd],
	index === 0
	  ? ["0%", "0%", "-100%"]
	  : ["100%", "0%", "0%", "-100%"]
  );

  const scale = useTransform(
	scrollYProgress,
	index === 0
	  ? [0, sceneEnd * 0.8, sceneEnd]
	  : [sceneStart - 0.05, sceneStart, sceneEnd * 0.9, sceneEnd],
	index === 0
	  ? [1, 1, 0.95]
	  : [0.9, 1, 1, 0.95]
  );

  const opacity = useTransform(
	scrollYProgress,
	index === 0
	  ? [0, sceneEnd * 0.7, sceneEnd]
	  : [sceneStart - 0.02, sceneStart + 0.02, sceneEnd * 0.85, sceneEnd],
	index === 0
	  ? [1, 1, 0]
	  : [0, 1, 1, 0]
  );

  // Z-index: current scene should be on top
  const zIndex = useTransform(
	scrollYProgress,
	[sceneStart - 0.01, sceneStart, sceneEnd - 0.01, sceneEnd],
	[index, total - index, total - index, index]
  );

  return (
	<motion.div
	  style={{
		y,
		scale,
		opacity,
		zIndex: total - index,
	  }}
	  className="absolute inset-0 w-full h-full will-change-transform"
	>
	  <div className="w-full h-full">
		{children}
	  </div>
	</motion.div>
  );
};

export const ScrollScenes = ({ children }: ScrollScenesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArray = Children.toArray(children);
  const total = childArray.length;

  const { scrollYProgress } = useScroll({
	target: containerRef,
	offset: ["start start", "end end"],
  });

  return (
	<div 
	  ref={containerRef} 
	  style={{ height: `${total * 100}vh` }}
	  className="relative"
	>
	  <div className="sticky top-0 h-screen w-full overflow-hidden">
		{childArray.map((child, index) => (
		  <Scene
			key={index}
			index={index}
			total={total}
			scrollYProgress={scrollYProgress}
		  >
			{child}
		  </Scene>
		))}
	  </div>
	</div>
  );
};
