
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function FactualReframe() {
  const [thought, setThought] = useState('');
  const [emotions, setEmotions] = useState('');
  const [facts, setFacts] = useState('');
  const [reframe, setReframe] = useState('');

  const handleClear = () => {
    setThought('');
    setEmotions('');
    setFacts('');
    setReframe('');
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <Scale className="h-12 w-12 text-primary mb-4" />
          <CardTitle>Factual Reframe</CardTitle>
          <CardDescription>Separate facts from emotional interpretations to find a more balanced perspective.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
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
        <CardFooter>
            <Button onClick={handleClear} variant="secondary" className="w-full">
                Clear All Fields
            </Button>
        </CardFooter>
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
