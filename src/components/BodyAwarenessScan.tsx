
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bodyAwarenessSteps } from "@/lib/bodyExercises";
import JSConfetti from "js-confetti";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BodyAwarenessScan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleNext = () => {
    if (currentStep < bodyAwarenessSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === bodyAwarenessSteps.length - 1) {
        jsConfetti?.addConfetti({
          emojis: ['✨', '🧘', '💖'],
          emojiSize: 50,
          confettiNumber: 40,
        });
      }
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
  }

  const step = bodyAwarenessSteps[currentStep];
  const isCompleted = currentStep === bodyAwarenessSteps.length - 1;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <step.icon className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Potentially add interactive elements here in the future */}
        </CardContent>
        <CardFooter>
          {isCompleted ? (
           <Button onClick={handleReset} className="w-full">Start Over</Button>
          ) : (
           <Button onClick={handleNext} className="w-full">Next</Button>
          )}
        </CardFooter>
      </Card>
       <Button variant="ghost" className="w-full" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
