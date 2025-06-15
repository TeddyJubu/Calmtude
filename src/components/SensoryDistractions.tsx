import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { sounds, Sound } from "@/lib/sounds";
import { Play, Pause, Volume2, Tally5, Wind } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ListenSection = () => {
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Initialize and preload audio elements
    sounds.forEach(sound => {
      const audio = new Audio(sound.src);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audio.preload = 'auto';
      audioRefs.current[sound.id] = audio;
    });

    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
      });
    };
  }, []);

  const toggleSound = (soundId: string) => {
    // Pause currently playing sound if it's different
    if (playingSoundId && playingSoundId !== soundId) {
      audioRefs.current[playingSoundId]?.pause();
    }

    const audio = audioRefs.current[soundId];
    if (!audio) return;

    if (playingSoundId === soundId) {
      // Is currently playing, so pause it
      audio.pause();
      setPlayingSoundId(null);
    } else {
      // Is not playing, so play it
      audio.play().catch(error => {
        console.error("Error playing sound:", error);
        toast({
          title: "Audio Error",
          description: "Could not play the sound. The source might be unavailable.",
          variant: "destructive",
        });
        setPlayingSoundId(null);
      });
      setPlayingSoundId(soundId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listen</CardTitle>
        <CardDescription>Focus on a sound to anchor yourself in the present moment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sounds.map((sound) => (
            <Button
              key={sound.id}
              variant={playingSoundId === sound.id ? "secondary" : "outline"}
              onClick={() => toggleSound(sound.id)}
              className="flex flex-col h-24 justify-center items-center gap-2"
            >
              {playingSoundId === sound.id ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              <span>{sound.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CountSection = () => {
  const [count, setCount] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    const newCount = count - 7;
    if (newCount > 0) {
      setCount(newCount);
    } else {
      setCount(newCount);
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCount(100);
    setIsFinished(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Count Backwards</CardTitle>
        <CardDescription>Engage your logical brain by counting backwards from 100 by 7.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 min-h-[200px]">
        <div className="text-6xl font-bold tracking-tighter">{count}</div>
        {isFinished ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Great job! You've completed the exercise.</p>
            <Button onClick={handleReset}>Start Over</Button>
          </div>
        ) : (
          <Button onClick={handleNext} disabled={count <= 0}>Next ({count} - 7)</Button>
        )}
      </CardContent>
    </Card>
  );
};

const AromatherapySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aromatherapy Tip</CardTitle>
        <CardDescription>Use scents to create a calming atmosphere.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
          <Wind className="h-8 w-8 text-secondary-foreground mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Engage Your Sense of Smell</h4>
            <p className="text-muted-foreground text-sm">
              Aromatherapy can be a powerful grounding technique. Certain smells can trigger feelings of calm and safety.
            </p>
          </div>
        </div>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Keep a calming essential oil nearby, like lavender, chamomile, or sandalwood. Place a drop on a tissue and inhale.</li>
          <li>Light a scented candle with a soothing fragrance.</li>
          <li>Brew a cup of herbal tea, like peppermint or ginger, and inhale the steam.</li>
          <li>Notice the smell of your soap or lotion when you wash your hands.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

const SensoryDistractions = () => {
  return (
    <div className="container flex-grow flex flex-col items-center py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Sensory Distractions</h1>
        <p className="text-lg text-muted-foreground mt-2">Quick sensory tasks to divert attention and reduce anxiety.</p>
      </div>
      <Tabs defaultValue="listen" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listen">
            <Volume2 className="mr-2 h-4 w-4" /> Listen
          </TabsTrigger>
          <TabsTrigger value="count">
            <Tally5 className="mr-2 h-4 w-4" /> Count
          </TabsTrigger>
          <TabsTrigger value="aromatherapy">
            <Wind className="mr-2 h-4 w-4" /> Aromatherapy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="listen" className="mt-6">
          <ListenSection />
        </TabsContent>
        <TabsContent value="count" className="mt-6">
          <CountSection />
        </TabsContent>
        <TabsContent value="aromatherapy" className="mt-6">
          <AromatherapySection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensoryDistractions;
