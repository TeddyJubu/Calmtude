
import { useState } from "react";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DeepCalmBreathingPage = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="flex-grow flex flex-col items-center justify-center animate-fade-in bg-[#F7ECDB] text-[#5a5a5a] w-full p-4">
      <div className="w-full max-w-md mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Deep Calm Breathing</h1>
          <p className="text-muted-foreground mt-1">Follow the water to regulate your breath and find calm.</p>
        </div>
        
        <BreathingCircle isRunning={isRunning} />

        <div className="flex flex-col gap-4">
          <Button onClick={() => setIsRunning(!isRunning)} size="lg" className="w-full">
              {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/grounding-tool">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Toolkit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeepCalmBreathingPage;
