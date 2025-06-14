
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const cycle = [
  { name: 'in', duration: 4000, label: 'Breathe In', scale: 1, transitionDuration: 'duration-[4000ms]' },
  { name: 'hold-in', duration: 4000, label: 'Hold', scale: 1, transitionDuration: 'duration-500' },
  { name: 'out', duration: 6000, label: 'Breathe Out', scale: 0.5, transitionDuration: 'duration-[6000ms]' },
  { name: 'hold-out', duration: 2000, label: 'Hold', scale: 0.5, transitionDuration: 'duration-500' },
];

interface BreathingCircleProps {
  isRunning: boolean;
}

export function BreathingCircle({ isRunning }: BreathingCircleProps) {
  const [phaseIndex, setPhaseIndex] = useState(-1); // -1 for idle state

  useEffect(() => {
    if (!isRunning) {
      setPhaseIndex(-1);
      return;
    }

    if (phaseIndex === -1) {
      setPhaseIndex(0); // Start the cycle
      return;
    }

    const timer = setTimeout(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % cycle.length);
    }, cycle[phaseIndex].duration);

    return () => clearTimeout(timer);
  }, [isRunning, phaseIndex]);

  const currentPhase = phaseIndex === -1 
    ? { label: 'Press Start', scale: 0.75, transitionDuration: 'duration-1000' }
    : cycle[phaseIndex];

  return (
    <div className="flex flex-col items-center gap-8">
      <div 
        className={cn(
          "relative flex items-center justify-center w-64 h-64 rounded-full bg-primary/10 text-primary ease-in-out transition-transform",
          currentPhase.transitionDuration
        )}
        style={{ transform: `scale(${currentPhase.scale})`}}
      >
        {isRunning && <div className="absolute w-full h-full rounded-full bg-primary/20 animate-pulse -z-10"/>}
        <span className="text-2xl font-semibold">{currentPhase.label}</span>
      </div>
    </div>
  );
}
