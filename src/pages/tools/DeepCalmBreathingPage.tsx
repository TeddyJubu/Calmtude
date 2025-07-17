
import { useState } from "react";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { breathingPatterns, BreathingPattern } from "@/lib/breathing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeepCalmBreathingPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPattern, setCurrentPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [label, setLabel] = useState('Press Start');

  const handlePatternChange = (patternId: string) => {
    const newPattern = breathingPatterns.find(p => p.id === patternId);
    if (newPattern) {
      setCurrentPattern(newPattern);
      if (isRunning) {
        setIsRunning(false);
      }
      setLabel('Press Start');
    }
  };

  const handleToggleRunning = () => {
    setIsRunning(prev => !prev);
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center animate-fade-in bg-[#F7ECDB] text-[#5a5a5a] w-full p-4">
      <div className="w-full max-w-md mx-auto flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{currentPattern.name}</h1>
          <p className="text-muted-foreground mt-1">{currentPattern.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="technique-select" className="text-sm font-medium text-muted-foreground">Select a technique</label>
          <Select onValueChange={handlePatternChange} defaultValue={currentPattern.id} disabled={isRunning}>
              <SelectTrigger id="technique-select">
                  <SelectValue placeholder="Choose a breathing technique" />
              </SelectTrigger>
              <SelectContent>
                  {breathingPatterns.map(pattern => (
                      <SelectItem key={pattern.id} value={pattern.id}>
                          {pattern.name}
                      </SelectItem>
                  ))}
              </SelectContent>
          </Select>
        </div>
        
        <BreathingCircle isRunning={isRunning} pattern={currentPattern} label={label} setLabel={setLabel} />

        <div className="flex flex-col gap-4">
          <Button onClick={handleToggleRunning} size="lg" className="w-full">
              {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="ghost" className="w-full hover:bg-[#faf4e9]" asChild>
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
