import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function FactualReframe() {
  const [thought, setThought] = useState('');
  const [emotions, setEmotions] = useState('');
  const [facts, setFacts] = useState('');
  const [reframe, setReframe] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { user, session } = useAuth();

  const handleClear = () => {
    setThought('');
    setEmotions('');
    setFacts('');
    setReframe('');
  };

  const handleSave = async () => {
    if (!user) {
        toast({
            title: "Authentication required",
            description: "You need to be logged in to save your entry.",
            variant: "destructive",
        });
        return;
    }

    setIsSaving(true);
    // @ts-ignore
    const { error } = await supabase.from('factual_reframe_entries').insert({
        user_id: user.id,
        thought,
        emotions,
        facts,
        reframe,
    });
    setIsSaving(false);

    if (error) {
        toast({
            title: "Error saving entry",
            description: error.message,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Entry saved!",
            description: "Your factual reframe has been saved successfully.",
        });
        handleClear();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: 'Logged out successfully.' });
  }
  
  const allFieldsFilled = thought && emotions && facts && reframe;

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <Scale className="h-12 w-12 text-primary mb-4" />
          <CardTitle>Factual Reframe</CardTitle>
          <CardDescription>Separate facts from emotional interpretations to find a more balanced perspective.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {session && (
            <Alert>
              <AlertDescription className="flex items-center justify-between">
                <span>Welcome! You are logged in.</span>
                <Button variant="link" className="p-0 h-auto" onClick={handleLogout}>
                  Log Out
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="thought">1. What's the upsetting thought?</Label>
            <Textarea
              id="thought"
              placeholder="e.g., 'I'm going to fail my presentation and everyone will think I'm incompetent.'"
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emotions">2. What emotions does this thought cause?</Label>
            <Textarea
              id="emotions"
              placeholder="e.g., 'Anxiety, fear, shame.'"
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facts">3. What are the objective facts?</Label>
            <Textarea
              id="facts"
              placeholder="e.g., 'I have a presentation. I've prepared for it. Some parts might be challenging. I've given presentations before.'"
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reframe">4. What's a reframed, more balanced thought?</Label>
            <Textarea
              id="reframe"
              placeholder="e.g., 'I'm feeling nervous about my presentation, but I'm prepared. It's okay to be imperfect. I will do my best, and that's enough.'"
              value={reframe}
              onChange={(e) => setReframe(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleSave} className="w-full" disabled={isSaving || !allFieldsFilled}>
                {isSaving ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Entry</>}
            </Button>
            <Button onClick={handleClear} variant="secondary" className="w-full">
                Clear All Fields
            </Button>
        </CardFooter>
      </Card>
      <Button variant="ghost" className="hover:bg-[#faf4e9]" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
