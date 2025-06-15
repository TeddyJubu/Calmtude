import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="container flex-grow flex flex-col items-center justify-center text-center animate-fade-in gap-32 sm:gap-48 py-12 sm:py-24">
      <div className="flex flex-col items-center gap-9">
        <h1 className="font-heading font-extrabold lowercase leading-none text-primary text-[19vw] sm:text-[20vw] md:text-[15vw] lg:text-[14rem]">
          calmtude
        </h1>
        <div className="flex flex-col items-center gap-2">
          <Button asChild className="rounded-2xl px-6 py-4 h-auto">
            <Link to="/grounding-tool" className="text-2xl font-medium uppercase">
              calm down
              <Waves className="ml-2.5 h-6 w-6" />
            </Link>
          </Button>
          <p className="text-sm text-primary/80 font-normal">
            Anxious? Stressed? Click calm down ↑
          </p>
        </div>
      </div>
      <p className="text-lg text-muted-foreground font-light max-w-md">
        A quiet space to find your calm, understand your feelings, and practice self-compassion.
      </p>
    </div>;
};
export default Index;