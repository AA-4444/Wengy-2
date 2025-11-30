import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const team = [
  {
    name: "Vaso Berulava",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
  },
  {
    name: "Aleksii Ktoto",
    role: "CEO 2",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Katie Katie",
    role: "Kto to",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80"
  },
  {
    name: "Sofia Matuhkina",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
  },
  {
    name: "Ania Ktoto",
    role: "Video Video",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
  },
];

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type TeamCardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  member: TeamMember;
  index: number;
  activeIndex: number;
};

function TeamCard({ position, rotation, member, index, activeIndex }: TeamCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      member.image,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
        setTextureLoaded(true);
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }, [member.image]);

  useFrame(() => {
    if (meshRef.current) {
      const isActive = index === activeIndex;
      const targetScale = isActive ? 1.3 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  if (!textureLoaded || !texture) {
    return (
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        frustumCulled={false}
      >
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
      </mesh>
    );
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      frustumCulled={false}
    >
      <planeGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        depthWrite={true}
        depthTest={true}
      />
      <Html
        position={[0, -2.2, 0]}
        center
        distanceFactor={6}
        style={{
          width: "250px",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div className="text-white">
          <h3 className="text-xl font-light mb-1">{member.name}</h3>
          <p className="text-sm text-gray-400">{member.role}</p>
        </div>
      </Html>
    </mesh>
  );
}

function TeamCarouselScene({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.5;

  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = -(activeIndex * (Math.PI * 2)) / team.length;
      groupRef.current.rotation.y +=
        (targetRotation - groupRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 8, 8]} intensity={1} />
      <directionalLight position={[-8, 8, -8]} intensity={0.5} />
      <directionalLight position={[0, -8, 0]} intensity={0.3} />

      <group ref={groupRef}>
        {team.map((member, index) => {
          const angle = (index / team.length) * Math.PI * 2;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <TeamCard
              key={member.name}
              position={[x, 0, z]}
              // ВАЖНО: поворачиваем карточку к центру круга
              rotation={[0, angle + Math.PI, 0]}
              member={member}
              index={index}
              activeIndex={activeIndex}
            />
          );
        })}
      </group>
    </>
  );
}

export const VRTeamCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % team.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + team.length) % team.length);
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
        <h2 className="text-[6vw] font-light mb-4">THE TEAM</h2>
        <p className="text-xl text-muted-foreground font-light">
          Passionate minds crafting digital experiences
        </p>
        </motion.div>

        <div className="relative w-full h-[600px] bg-black/20 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
            <TeamCarouselScene activeIndex={activeIndex} />
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
            {(activeIndex + 1).toString().padStart(2, "0")} /{" "}
            {team.length.toString().padStart(2, "0")}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-3xl font-light mb-2">
            {team[activeIndex].name}
          </h3>
          <p className="text-lg text-muted-foreground">
            {team[activeIndex].role}
          </p>
        </motion.div>
      </div>
    </section>
  );
};