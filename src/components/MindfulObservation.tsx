
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ScanEye } from 'lucide-react';
import { Textarea } from './ui/textarea';

export function MindfulObservation() {
  const [observation, setObservation] = useState('');

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
        <CardFooter>
            <Button onClick={() => setObservation('')} variant="secondary" className="w-full">
                Clear Observation
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
