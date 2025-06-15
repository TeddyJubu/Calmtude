
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { movements, Movement } from "@/lib/movements";
import { Timer, Play, Pause, RefreshCw } from "lucide-react";

interface TimerState {
  isActive: boolean;
  timeLeft: number;
}

const MovementCard = ({ movement }: { movement: Movement }) => {
  const [timer, setTimer] = useState<TimerState>({ isActive: false, timeLeft: movement.duration });

  useEffect(() => {
    let interval: number | null = null;
    if (timer.isActive && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (timer.timeLeft === 0) {
        setTimer(prev => ({...prev, isActive: false}))
    }
    return () => {
      if(interval) clearInterval(interval);
    };
  }, [timer.isActive, timer.timeLeft]);

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isActive: !prev.isActive }));
  };
  
  const resetTimer = () => {
    setTimer({ isActive: false, timeLeft: movement.duration });
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movement.title}</CardTitle>
        <CardDescription>{movement.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="h-5 w-5" />
          <span>{formatTime(timer.timeLeft)}</span>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={toggleTimer} disabled={timer.timeLeft === 0}>
            {timer.isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={resetTimer}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MindfulMovement = () => {
  return (
    <div className="container flex-grow flex flex-col items-center py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Mindful Movement</h1>
        <p className="text-lg text-muted-foreground mt-2">Short prompts for simple physical activities to reconnect with your body.</p>
      </div>
      <div className="w-full max-w-2xl space-y-6">
        {movements.map((movement) => (
          <MovementCard key={movement.id} movement={movement} />
        ))}
      </div>
    </div>
  );
};

export default MindfulMovement;
