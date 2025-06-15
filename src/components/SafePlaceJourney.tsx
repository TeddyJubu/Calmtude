
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Home, Loader2, Wand2 } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { useToast } from "@/components/ui/use-toast";

const GOOGLE_CLOUD_API_KEY_LS = 'google_cloud_api_key';

export function SafePlaceJourney() {
  const [apiKey, setApiKey] = useState('');
  const [safePlaceDescription, setSafePlaceDescription] = useState('');
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedApiKey = localStorage.getItem(GOOGLE_CLOUD_API_KEY_LS);
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const saveApiKey = () => {
    localStorage.setItem(GOOGLE_CLOUD_API_KEY_LS, apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Google Cloud API key has been saved in your browser.",
    });
  };

  const generateScript = (description: string): string => {
    return `
      Welcome to your Safe Place Journey. Find a comfortable position, close your eyes, and take a deep breath in... and out...

      (Pause for 5 seconds)

      Begin to imagine your safe place. A place where you feel completely at ease, secure, and peaceful. 
      Let's bring this place to life with the details you've provided.

      You find yourself in: ${description}.

      (Pause for 10 seconds)

      Look around you. Notice the colors, the light, the shapes. What do you see in this special place? ... Take in the sights that bring you comfort.

      (Pause for 10 seconds)

      Now, bring your awareness to the sounds of your safe place. Are there gentle sounds? Or perhaps a peaceful silence? ... Listen closely.

      (Pause for 10 seconds)

      What can you feel? The temperature on your skin, the texture of what's beneath you... Feel the physical sensations of being here.

      (Pause for 10 seconds)

      In this space, you are completely safe. All worries and stresses melt away. This is your sanctuary, created by you, for you. 
      Breathe in the feeling of peace... and breathe out any tension.

      (Pause for 15 seconds)

      Spend a few more moments here, absorbing the calm and security of your safe place. Know that you can return to this place in your mind whenever you need to.

      (Pause for 15 seconds)
      
      When you're ready, slowly begin to bring your awareness back to the room around you. Wiggle your fingers and toes. 
      And when you feel ready, gently open your eyes. Carry this feeling of peace with you.
    `;
  };

  const handleGenerateJourney = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Cloud API key.",
        variant: "destructive",
      });
      return;
    }
    if (!safePlaceDescription) {
      toast({
        title: "Description Required",
        description: "Please describe your safe place.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAudioSrc(null);

    const script = generateScript(safePlaceDescription);

    try {
      const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: {
            text: script,
          },
          voice: {
            languageCode: 'en-US',
            name: 'en-US-Wavenet-F',
          },
          audioConfig: {
            audioEncoding: 'MP3',
          },
        }),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error?.message || 'Failed to generate audio.');
      }

      const audioContent = responseData.audioContent;
      const audioBlob = await (await fetch(`data:audio/mp3;base64,${audioContent}`)).blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
      
      toast({
        title: "Journey Ready!",
        description: "Your personalized safe place meditation is ready to play.",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-4 w-full max-w-lg items-center">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <Home className="h-12 w-12 text-violet-500 mb-4" />
          <CardTitle>Safe Place Journey</CardTitle>
          <CardDescription>A guided visualization to a user-defined safe space.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col items-center gap-6">
          
          {audioSrc ? (
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-muted-foreground text-center">Your journey is ready. Press play to begin.</p>
              <AudioPlayer audioSrc={audioSrc} />
              <Button variant="secondary" onClick={() => setAudioSrc(null)}>Create a new journey</Button>
            </div>
          ) : (
            <>
              <div className="w-full space-y-2">
                <Label htmlFor="safe-place">Describe your safe place</Label>
                <Textarea
                  id="safe-place"
                  placeholder="e.g., A cozy cabin in the woods, with a crackling fireplace and a soft armchair. It's raining gently outside."
                  value={safePlaceDescription}
                  onChange={(e) => setSafePlaceDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">Be as descriptive as you like. Mention sights, sounds, and feelings.</p>
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="api-key">Google Cloud API Key</Label>
                <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      disabled={isLoading}
                    />
                    <Button onClick={saveApiKey} variant="outline" disabled={isLoading || !apiKey}>Save</Button>
                </div>
                 <p className="text-xs text-muted-foreground">
                    Your key is stored in your browser. Get one from the{" "}
                    <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">
                        Google Cloud Console
                    </a>
                    . You must enable the Text-to-Speech API.
                </p>
              </div>

              <Button onClick={handleGenerateJourney} disabled={isLoading || !apiKey || !safePlaceDescription} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating your journey...' : 'Create My Journey'}
              </Button>
            </>
          )}

        </CardContent>
      </Card>
      <Button variant="ghost" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
