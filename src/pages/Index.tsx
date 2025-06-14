import { AffirmationCard } from "@/components/AffirmationCard";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="container flex-grow flex flex-col items-center justify-center text-center animate-fade-in">
      <h1 className="tracking-tight text-7xl font-extrabold">MIND ANCHOR</h1>
      <p className="max-w-2xl mt-4 text-lg text-muted-foreground">
        A quiet space to find your calm, understand your feelings, and practice self-compassion.
      </p>
      
      <div className="mt-8">
        <Button asChild size="lg">
          <Link to="/grounding-tool">
            <Waves className="mr-2 h-5 w-5" />
            Find Calm Now (SOS)
          </Link>
        </Button>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        <AffirmationCard />
      </div>
    </div>;
};
export default Index;