
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import JSConfetti from "js-confetti";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthPrompt } from "@/components/AuthPrompt";
import { useMutation } from "@tanstack/react-query";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "🙂", label: "Okay" },
  { emoji: "😐", label: "Meh" },
  { emoji: "😟", label: "Sad" },
  { emoji: "😠", label: "Angry" },
];

const saveEmotionLog = async ({ mood, notes, userId }: { mood: string, notes: string, userId: string }) => {
  const { error, data } = await supabase.from('emotion_logs').insert({
      user_id: userId,
      mood: mood,
      notes: notes,
  }).select();

  if (error) {
      throw new Error(error.message);
  }
  return data;
}

const EmotionLogPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const { session, user } = useAuth();

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const mutation = useMutation({
    mutationFn: saveEmotionLog,
    onSuccess: () => {
        toast({
            title: "Entry saved!",
            description: "Your feelings have been noted. Thank you for checking in with yourself.",
        });
        if (jsConfetti) {
            jsConfetti.addConfetti({ confettiNumber: 75, confettiRadius: 1 });
        }
        setSelectedMood(null);
        setNotes('');
    },
    onError: (error) => {
        toast({
            title: "Error saving entry",
            description: error.message,
            variant: "destructive",
        });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    if (session && user) {
        mutation.mutate({ mood: selectedMood, notes, userId: user.id });
    } else {
        toast({
            title: "Your feelings have been noted!",
            description: "Log in to save your progress and track your mood over time.",
        });
        if (jsConfetti) {
          jsConfetti.addConfetti({ confettiNumber: 75, confettiRadius: 1 });
        }
        // Optionally clear form even when not logged in
        setSelectedMood(null);
        setNotes('');
    }
  };

  return (
    <>
      <div className="container flex-grow flex flex-col items-center justify-center py-12 animate-fade-in pb-28">
        <Card className="w-full max-w-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">How are you feeling?</CardTitle>
              <CardDescription>Check in with yourself. There are no right or wrong answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 border p-4 rounded-md">
                <label className="text-sm font-medium">Right now, I feel...</label>
                <div className="flex justify-around pt-2">
                  {moods.map((mood) => (
                    <button
                      type="button"
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.label)}
                      className={cn(
                        "text-4xl rounded-full p-2 transition-transform duration-200 ease-in-out transform hover:scale-125",
                        selectedMood === mood.label ? "scale-125 bg-primary/20" : "scale-100"
                      )}
                      aria-label={mood.label}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 border p-4 rounded-md">
                <label htmlFor="notes" className="text-sm font-medium">What's on your mind?</label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Feel free to write about your thoughts, triggers, or anything else..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={!selectedMood || mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Save Entry'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <AuthPrompt />
    </>
  );
};

export default EmotionLogPage;
