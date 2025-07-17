
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScanEye, Save } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthPrompt } from './AuthPrompt';

export function MindfulObservation() {
  const [observation, setObservation] = useState('');
  const { user, session } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      toast.error('You must be logged in to save an observation.');
      return;
    }

    if (!observation.trim()) {
        toast.info('Observation cannot be empty.');
        return;
    }

    setIsSaving(true);
    try {
        const { error } = await supabase
        .from('mindful_observations')
        .insert({ observation: observation, user_id: user.id });

        if (error) {
            throw error;
        }

        toast.success('Observation saved successfully!');
        setObservation('');
    } catch (error: any) {
        toast.error('Failed to save observation.', { 
            description: error.message || "Please try again." 
        });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <ScanEye className="h-12 w-12 text-primary mb-4" />
          <CardTitle>Mindful Observation</CardTitle>
          <CardDescription>Engage your analytical mind by describing an object near you.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Pick an object in your immediate environment. Focus on it and describe its colors, textures, shape, weight, and any other details you can observe.
          </p>
          <Textarea
            placeholder="For example: I see a blue mug. It's smooth but has a small chip on the rim. It feels heavy in my hand..."
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            rows={6}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setObservation('')} variant="secondary" className="w-full">
                    Clear Observation
                </Button>
                {session && (
                    <Button onClick={handleSave} disabled={!observation.trim() || isSaving} className="w-full">
                        <Save />
                        {isSaving ? 'Saving...' : 'Save Observation'}
                    </Button>
                )}
            </div>
        </CardFooter>
      </Card>
      {!session && <AuthPrompt variant="inline" />}
      <Button variant="ghost" className="hover:bg-[#faf4e9]" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
