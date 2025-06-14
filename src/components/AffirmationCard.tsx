
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { affirmations } from "@/lib/affirmations";
import { Lightbulb } from "lucide-react";

export function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  if (!affirmation) {
    return null;
  }

  return (
    <Card className="bg-secondary border-none shadow-lg animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-secondary-foreground">Daily Affirmation</CardTitle>
        <Lightbulb className="h-4 w-4 text-secondary-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary/90">{`"${affirmation}"`}</p>
      </CardContent>
    </Card>
  );
}
