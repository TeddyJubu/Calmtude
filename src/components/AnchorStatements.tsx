
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { affirmations } from '@/lib/affirmations';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};

export function AnchorStatements() {
  const [currentAffirmation, setCurrentAffirmation] = useState('');

  useEffect(() => {
    setCurrentAffirmation(getRandomAffirmation());
  }, []);

  const handleNewAffirmation = () => {
    setCurrentAffirmation(getRandomAffirmation());
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in text-center">
        <CardHeader>
          <CardTitle>Anchor Statement</CardTitle>
          <CardDescription>A grounding thought to hold onto.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[10rem] flex items-center justify-center p-6">
          <p className="text-2xl font-semibold text-card-foreground">
            "{currentAffirmation}"
          </p>
        </CardContent>
      </Card>
      <Button onClick={handleNewAffirmation}>
        <RefreshCw className="mr-2 h-4 w-4" />
        New Statement
      </Button>
      <Button variant="ghost" className="hover:bg-[#faf4e9]" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
