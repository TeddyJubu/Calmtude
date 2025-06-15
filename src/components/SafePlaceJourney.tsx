
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Home, Wand2, Square } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const getScriptSegments = (description: string): string[] => {
  return [
    "Welcome to your Safe Place Journey. Find a comfortable position, close your eyes, and take a deep breath in... and out...",
    "(Pause for 5 seconds)",
    "Begin to imagine your safe place. A place where you feel completely at ease, secure, and peaceful. Let's bring this place to life with the details you've provided.",
    `You find yourself in: ${description}.`,
    "(Pause for 10 seconds)",
    "Look around you. Notice the colors, the light, the shapes. What do you see in this special place? Take in the sights that bring you comfort.",
    "(Pause for 10 seconds)",
    "Now, bring your awareness to the sounds of your safe place. Are there gentle sounds? Or perhaps a peaceful silence? Listen closely.",
    "(Pause for 10 seconds)",
    "What can you feel? The temperature on your skin, the texture of what's beneath you... Feel the physical sensations of being here.",
    "(Pause for 10 seconds)",
    "In this space, you are completely safe. All worries and stresses melt away. This is your sanctuary, created by you, for you. Breathe in the feeling of peace... and breathe out any tension.",
    "(Pause for 15 seconds)",
    "Spend a few more moments here, absorbing the calm and security of your safe place. Know that you can return to this place in your mind whenever you need to.",
    "(Pause for 15 seconds)",
    "When you're ready, slowly begin to bring your awareness back to the room around you. Wiggle your fingers and toes. And when you feel ready, gently open your eyes. Carry this feeling of peace with you."
  ];
};

const elevenLabsVoices = [
  { name: 'Rachel', id: '21m00Tcm4TlvDq8ikWAM' },
  { name: 'Sarah', id: 'EXAVITQu4vr4xnSDxMaL' },
  { name: 'Charlotte', id: 'XB0fDUnXU5powFXDhCwa' },
  { name: 'Adam', id: 'pNInz6obpgDQGcFmaJgB' },
];

export function SafePlaceJourney() {
  const [safePlaceDescription, setSafePlaceDescription] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const { toast } = useToast();

  const [ttsMethod, setTtsMethod] = useState('browser');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('');
  const [elevenLabsVoiceId, setElevenLabsVoiceId] = useState(elevenLabsVoices[0].id);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    try {
      const savedTtsMethod = localStorage.getItem('safePlaceTtsMethod') || 'browser';
      const savedApiKey = localStorage.getItem('safePlaceElevenLabsApiKey') || '';
      const savedVoiceId = localStorage.getItem('safePlaceElevenLabsVoiceId') || elevenLabsVoices[0].id;
      
      setTtsMethod(savedTtsMethod);
      setElevenLabsApiKey(savedApiKey);
      setElevenLabsVoiceId(savedVoiceId);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('safePlaceTtsMethod', ttsMethod);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, [ttsMethod]);
  
  useEffect(() => {
    try {
      localStorage.setItem('safePlaceElevenLabsApiKey', elevenLabsApiKey);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, [elevenLabsApiKey]);
  
  useEffect(() => {
    try {
      localStorage.setItem('safePlaceElevenLabsVoiceId', elevenLabsVoiceId);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
  }, [elevenLabsVoiceId]);

  useEffect(() => {
    // Cleanup function
    return () => {
      isPlayingRef.current = false;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
        }
        audioRef.current.src = '';
      }
    };
  }, []);

  const handlePlayJourney = () => {
    if (!safePlaceDescription) {
      toast({
        title: "Description Required",
        description: "Please describe your safe place.",
        variant: "destructive",
      });
      return;
    }

    if (ttsMethod === 'elevenlabs') {
      handlePlayElevenLabsJourney();
    } else {
      handlePlayWebSpeechJourney();
    }
  };

  const handlePlayWebSpeechJourney = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      toast({
        title: "Browser Not Supported",
        description: "Your browser does not support the Web Speech API, which is needed for this tool.",
        variant: "destructive",
      });
      return;
    }
    
    window.speechSynthesis.cancel();
    setIsPlaying(true);
    isPlayingRef.current = true;
    
    const scriptSegments = getScriptSegments(safePlaceDescription);

    const playSegments = (segments: string[], voices: SpeechSynthesisVoice[]) => {
      if (!isPlayingRef.current || segments.length === 0) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        return;
      }
      
      const segment = segments.shift()!;
      const pauseMatch = segment.match(/\(Pause for (\d+) seconds\)/);

      if (pauseMatch) {
        const pauseDuration = parseInt(pauseMatch[1], 10) * 1000;
        setTimeout(() => playSegments(segments, voices), pauseDuration);
      } else {
        const utterance = new SpeechSynthesisUtterance(segment);
        const preferredVoices = voices.filter(v => v.lang.startsWith('en'));
        const femaleVoice = preferredVoices.find(v => v.name.includes('Female') || v.name.includes('Samantha')) || preferredVoices[0];
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        utterance.onend = () => playSegments(segments, voices);
        utterance.onerror = (event) => {
          console.error('SpeechSynthesis Error:', event);
          toast({ title: "Playback Error", description: "Something went wrong while generating the audio.", variant: "destructive" });
          setIsPlaying(false);
          isPlayingRef.current = false;
        };
        window.speechSynthesis.speak(utterance);
      }
    };


    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      playSegments(scriptSegments, voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        playSegments(scriptSegments, voices);
      };
    }
  };

  const handlePlayElevenLabsJourney = () => {
    if (!elevenLabsApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key.",
        variant: "destructive",
      });
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    setIsLoadingAudio(true);

    const scriptSegments = getScriptSegments(safePlaceDescription);
    let isFirstAudioSegment = true;

    const playSegments = async (segments: string[]) => {
      if (!isPlayingRef.current || segments.length === 0) {
        handleStopJourney();
        return;
      }
      
      const segment = segments.shift()!;
      const pauseMatch = segment.match(/\(Pause for (\d+) seconds\)/);

      if (pauseMatch) {
        const pauseDuration = parseInt(pauseMatch[1], 10) * 1000;
        setTimeout(() => playSegments(segments), pauseDuration);
      } else {
        try {
          const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`, {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': elevenLabsApiKey,
            },
            body: JSON.stringify({
              text: segment,
              model_id: 'eleven_multilingual_v2',
              voice_settings: { stability: 0.5, similarity_boost: 0.75 },
            }),
          });
          
          if (isFirstAudioSegment) {
            setIsLoadingAudio(false);
            isFirstAudioSegment = false;
          }

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail?.message || 'Failed to generate audio from ElevenLabs.');
          }

          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
            audioRef.current.onended = () => {
              URL.revokeObjectURL(audioUrl);
              playSegments(segments);
            };
          }
        } catch (error: any) {
          console.error('ElevenLabs Error:', error);
          toast({ title: "Playback Error", description: error.message || "Something went wrong during playback.", variant: "destructive" });
          handleStopJourney();
        }
      }
    };

    playSegments(scriptSegments);
  };

  const handleStopJourney = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsLoadingAudio(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      if (audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current.src = '';
      }
    }
  };

  const isPlayButtonDisabled = !safePlaceDescription || isLoadingAudio;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg items-center">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <Home className="h-12 w-12 text-violet-500 mb-4" />
          <CardTitle>Safe Place Journey</CardTitle>
          <CardDescription>A guided visualization to a user-defined safe space.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col items-center gap-6">
          
          <div className="w-full space-y-2">
            <Label htmlFor="safe-place">Describe your safe place</Label>
            <Textarea
              id="safe-place"
              placeholder="e.g., A cozy cabin in the woods, with a crackling fireplace and a soft armchair. It's raining gently outside."
              value={safePlaceDescription}
              onChange={(e) => setSafePlaceDescription(e.target.value)}
              rows={4}
              className="resize-none"
              disabled={isPlaying}
            />
            <p className="text-xs text-muted-foreground">Be as descriptive as you like. Mention sights, sounds, and feelings.</p>
          </div>
          
          <div className="w-full space-y-4 p-4 border bg-muted/20 rounded-lg">
            <Label className="font-semibold">Narration Method</Label>
            <RadioGroup value={ttsMethod} onValueChange={setTtsMethod} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="browser" id="browser" />
                <Label htmlFor="browser">Browser Speech (Free)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="elevenlabs" id="elevenlabs" />
                <Label htmlFor="elevenlabs">ElevenLabs (High Quality)</Label>
              </div>
            </RadioGroup>
          </div>

          {ttsMethod === 'elevenlabs' && (
            <div className="w-full space-y-4 p-4 border rounded-lg animate-fade-in">
              <h4 className="font-semibold text-center text-lg">ElevenLabs Settings</h4>
              <div className="space-y-2">
                  <Label htmlFor="elevenlabs-api-key">API Key</Label>
                  <Input
                      id="elevenlabs-api-key"
                      type="password"
                      placeholder="Enter your ElevenLabs API Key"
                      value={elevenLabsApiKey}
                      onChange={(e) => setElevenLabsApiKey(e.target.value)}
                      disabled={isPlaying}
                  />
              </div>
              <div className="space-y-2">
                  <Label>Voice</Label>
                   <RadioGroup value={elevenLabsVoiceId} onValueChange={setElevenLabsVoiceId} className="grid grid-cols-2 gap-4">
                      {elevenLabsVoices.map(voice => (
                          <div key={voice.id} className="flex items-center space-x-2">
                             <RadioGroupItem value={voice.id} id={voice.id} disabled={isPlaying} />
                             <Label htmlFor={voice.id}>{voice.name}</Label>
                          </div>
                      ))}
                  </RadioGroup>
              </div>
            </div>
          )}

          {isPlaying ? (
            <Button onClick={handleStopJourney} variant="destructive" className="w-full">
              <Square className="mr-2" /> Stop Journey
            </Button>
          ) : (
            <Button onClick={handlePlayJourney} disabled={isPlayButtonDisabled} className="w-full">
              {isLoadingAudio ? 'Generating Audio...' : (
                <>
                  <Wand2 className="mr-2" />
                  Create & Play My Journey
                </>
              )}
            </Button>
          )}

        </CardContent>
      </Card>
      <audio ref={audioRef} className="hidden" />
      <Button variant="ghost" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
