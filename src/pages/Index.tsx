import { CappenNavbar } from "@/components/CappenNavbar";
import { CappenHero } from "@/components/CappenHero";
import { CappenSplit } from "@/components/CappenSplit";
import { CappenAbout } from "@/components/CappenAbout";
import { CappenServices } from "@/components/CappenServices";
import { CappenProjects } from "@/components/CappenProjects";
import { VRCarousel } from "@/components/VRCarousel";
import { VRTeamCarousel } from "@/components/VRTeamCarousel";
import { CappenFAQ } from "@/components/CappenFAQ";
import { CappenContact } from "@/components/CappenContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <CappenNavbar />

      <main>
        <CappenHero />
        <CappenSplit />
        <CappenAbout />
        <CappenServices />
        <CappenProjects />
        <VRCarousel />
        <VRTeamCarousel />
        <CappenFAQ />
        <CappenContact />
      </main>
    </div>
  );
};

export default Index;