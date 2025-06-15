
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sounds, Sound } from "@/lib/sounds";
import { Play, Pause, Loader2 } from "lucide-react";
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
      audio.preload = 'metadata';

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
    if (loadingSoundId && loadingSoundId !== sound.id) return;
    
    const audio = getAudioElement(sound);
    
    if (playingSoundId === sound.id) {
      audio.pause();
      setPlayingSoundId(null);
      return;
    }
    
    if (playingSoundId && audioRefs.current[playingSoundId]) {
      audioRefs.current[playingSoundId].pause();
    }
    
    setLoadingSoundId(sound.id);
    setPlayingSoundId(null);

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

export default ListenSection;
