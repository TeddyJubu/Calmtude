
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Ear, Hand, Utensils, Flower, ArrowLeft } from "lucide-react";
import JSConfetti from "js-confetti";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "5 Things You Can See",
    description: "Look around you and name five things you can see. Notice their colors, shapes, and textures.",
    icon: Eye,
  },
  {
    title: "4 Things You Can Feel",
    description: "Bring your attention to four things you can feel. The texture of your clothes, the surface you're sitting on, the temperature of the air.",
    icon: Hand,
  },
  {
    title: "3 Things You Can Hear",
    description: "Listen carefully and identify three sounds. They can be close or far away, loud or quiet.",
    icon: Ear,
  },
  {
    title: "2 Things You Can Smell",
    description: "What are two scents you can smell? If you can't smell anything, imagine two of your favorite smells.",
    icon: Flower,
  },
  {
    title: "1 Thing You Can Taste",
    description: "Focus on one thing you can taste. It could be the lingering taste of your last meal, or simply the taste of your own mouth.",
    icon: Utensils,
  },
  {
    title: "Complete",
    description: "You've completed the grounding exercise. Take a deep breath. You are present and safe.",
    icon: null,
  },
];

export function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === steps.length - 1) {
        jsConfetti?.addConfetti({
          emojis: ['💖', '🔥'],
          emojiSize: 50,
          confettiNumber: 40,
        });
      }
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
  }

  const step = steps[currentStep];
  const isCompleted = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in">
        <CardHeader>
          {step.icon && <step.icon className="h-10 w-10 text-primary mb-4" />}
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
      <Button variant="ghost" className="hover:bg-[#faf4e9]" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
