
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sounds, Sound } from "@/lib/sounds";
import { Play, Pause, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ListenSection = () => {
  const [activeSound, setActiveSound] = useState<Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup function to pause audio when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggleSound = (sound: Sound) => {
    if (audioRef.current && activeSound?.id === sound.id) {
      audioRef.current.pause();
      audioRef.current = null;
      setActiveSound(null);
      setIsLoading(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsLoading(true);
    setActiveSound(sound);

    const newAudio = new Audio(sound.src);
    newAudio.crossOrigin = "anonymous";
    newAudio.loop = true;
    audioRef.current = newAudio;

    newAudio.play()
      .then(() => {
        setIsLoading(false);
        setActiveSound(sound);
      })
      .catch((error) => {
        console.error("Audio playback error:", error);
        toast({
          title: "Error playing sound",
          description: `Could not play ${sound.title}. Please try another sound.`,
          variant: "destructive",
        });
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = null;
        setActiveSound(null);
        setIsLoading(false);
      });
  };

  const isPlaying = (soundId: string) => activeSound?.id === soundId && !isLoading;
  const isLoadingSound = (soundId:string) => activeSound?.id === soundId && isLoading;

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
              variant={isPlaying(sound.id) ? "secondary" : "outline"}
              onClick={() => handleToggleSound(sound)}
              className="flex flex-col h-24 justify-center items-center gap-2"
              disabled={isLoading && activeSound?.id !== sound.id}
            >
              {isLoadingSound(sound.id) ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isPlaying(sound.id) ? (
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
