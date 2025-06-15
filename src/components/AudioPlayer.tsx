
import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Rewind, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioSrc: string;
}

const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    if(audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleAudioEnded);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [audioRef]);
  
  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
        audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        if(audioRef.current) audioRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleSeek = (seconds: number) => {
      if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
      }
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-card/80 backdrop-blur-sm border p-4 space-y-4 shadow-lg">
        <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
        
        <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-12 text-center">{formatTime(currentTime)}</span>
            <Slider
                value={[currentTime]}
                max={duration || 1}
                step={1}
                onValueChange={handleTimeSeek}
                className="w-full"
                aria-label="Audio progress"
            />
            <span className="text-sm text-muted-foreground w-12 text-center">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                <Button onClick={toggleMute} variant="ghost" size="icon" aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                </Button>
                <Slider
                    value={[isMuted ? 0 : volume]}
                    max={1}
                    step={0.05}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                    aria-label="Volume control"
                />
            </div>
            <div className="flex items-center justify-center gap-2">
                 <Button variant="ghost" size="icon" onClick={() => handleSeek(-10)} aria-label="Rewind 10 seconds">
                    <Rewind />
                </Button>
                <Button variant="default" size="icon" className="h-12 w-12" onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleSeek(10)} aria-label="Fast-forward 10 seconds">
                    <FastForward />
                </Button>
            </div>
             <div className="w-[88px]"></div> {/* Spacer to balance layout */}
        </div>
    </div>
  );
};
