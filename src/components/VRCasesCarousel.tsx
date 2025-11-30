import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Html, useTexture } from "@react-three/drei";

const cases = [
  {
    id: 1,
    title: "NEONDOO",
    category: "Fintech Platform",
    year: "2024",
    description: "Revolutionary payment system",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 2,
    title: "STELLAR",
    category: "E-Commerce",
    year: "2024",
    description: "Luxury marketplace experience",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: 3,
    title: "QUANTUM",
    category: "Healthcare",
    year: "2023",
    description: "AI-powered health platform",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
  },
  {
    id: 4,
    title: "NEXUS",
    category: "Entertainment",
    year: "2023",
    description: "Immersive streaming platform",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80"
  },
];

function CaseCard({ position, rotation, caseData, index, activeIndex }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      caseData.image,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
        setTextureLoaded(true);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }, [caseData.image]);

  useFrame(() => {
    if (meshRef.current) {
      const isActive = index === activeIndex;
      const targetScale = isActive ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  if (!textureLoaded || !texture) {
    return (
      <mesh ref={meshRef} position={position} rotation={rotation} frustumCulled={false}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
      </mesh>
    );
  }

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} frustumCulled={false}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial 
        map={texture} 
        side={THREE.DoubleSide}
        depthWrite={true}
        depthTest={true}
      />
      <Html
        position={[0, -2.5, 0]}
        center
        distanceFactor={8}
        style={{
          width: '300px',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div className="text-white">
          <h3 className="text-2xl font-light mb-1">{caseData.title}</h3>
          <p className="text-sm text-gray-400">{caseData.category}</p>
          <p className="text-xs text-gray-500">{caseData.year}</p>
        </div>
      </Html>
    </mesh>
  );
}

function CarouselScene({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotation = -(activeIndex * (Math.PI * 2)) / cases.length;
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1;
    }
  });

  const radius = 5;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      <directionalLight position={[0, -10, 0]} intensity={0.3} />
      
      <group ref={groupRef}>
        {cases.map((caseData, index) => {
          const angle = (index / cases.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <CaseCard
              key={caseData.id}
              position={[x, 0, z]}
              rotation={[0, -angle, 0]}
              caseData={caseData}
              index={index}
              activeIndex={activeIndex}
            />
          );
        })}
      </group>
    </>
  );
}

export const VRCasesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cases.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-[6vw] font-light mb-4">CASE STUDIES</h2>
          <p className="text-xl text-muted-foreground font-light">
            Transforming visions into digital excellence
          </p>
        </motion.div>

        <div className="relative w-full h-[600px] bg-black/20 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <CarouselScene activeIndex={activeIndex} />
          </Canvas>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center"
            >
              →
            </button>
          </div>

          <div className="absolute top-8 right-8 text-4xl font-light tabular-nums">
            {(activeIndex + 1).toString().padStart(2, '0')} / {cases.length.toString().padStart(2, '0')}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-3xl font-light mb-2">{cases[activeIndex].title}</h3>
          <p className="text-lg text-muted-foreground">{cases[activeIndex].description}</p>
        </motion.div>
      </div>
    </section>
  );
};
