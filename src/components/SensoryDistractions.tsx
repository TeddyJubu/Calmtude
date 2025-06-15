import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { sounds, Sound } from "@/lib/sounds";
import { Play, Pause, Volume2, Tally5, Wind, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ListenSection = () => {
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);
  const [loadingSoundId, setLoadingSoundId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const { toast } = useToast();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
      });
    };
  }, []);

  const getAudioElement = (sound: Sound): HTMLAudioElement => {
    if (!audioRefs.current[sound.id]) {
      console.log(`Creating new Audio element for: ${sound.title}`);
      const audio = new Audio(sound.src);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audio.preload = 'metadata'; // More efficient than 'auto'

      // Debugging and error handling listeners
      audio.addEventListener('error', () => {
        console.error(`Audio Error: Could not load ${sound.title} from ${sound.src}. Code: ${audio.error?.code}, Message: ${audio.error?.message}`);
        toast({
          title: "Audio Error",
          description: `Could not load sound: ${sound.title}. The source may be unavailable or blocked.`,
          variant: "destructive",
        });
        if (loadingSoundId === sound.id) {
          setLoadingSoundId(null);
        }
      });
      audio.addEventListener('canplay', () => console.log(`Audio can play: ${sound.title}`));
      audio.addEventListener('loadstart', () => console.log(`Audio load start: ${sound.title}`));

      audioRefs.current[sound.id] = audio;
    }
    return audioRefs.current[sound.id];
  }

  const toggleSound = (sound: Sound) => {
    // If another sound is loading, do nothing.
    if (loadingSoundId && loadingSoundId !== sound.id) return;
    
    const audio = getAudioElement(sound);
    
    // If clicking the currently playing sound, pause it.
    if (playingSoundId === sound.id) {
      audio.pause();
      setPlayingSoundId(null);
      return;
    }
    
    // Pause any sound that is currently playing.
    if (playingSoundId && audioRefs.current[playingSoundId]) {
      audioRefs.current[playingSoundId].pause();
    }
    
    setLoadingSoundId(sound.id);
    setPlayingSoundId(null);

    // Play the new sound
    console.log(`Attempting to play: ${sound.title}`);
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`Successfully playing: ${sound.title}`);
          setPlayingSoundId(sound.id);
        })
        .catch((error) => {
          console.error(`Error playing sound (${sound.title}):`, error);
          setPlayingSoundId(null);
        })
        .finally(() => {
          setLoadingSoundId(null);
        });
    } else {
        setLoadingSoundId(null);
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
              onClick={() => toggleSound(sound)}
              className="flex flex-col h-24 justify-center items-center gap-2"
              disabled={loadingSoundId !== null}
            >
              {loadingSoundId === sound.id ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : playingSoundId === sound.id ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
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
