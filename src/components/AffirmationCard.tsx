
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { affirmations } from "@/lib/affirmations";
import { Lightbulb } from "lucide-react";

export function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  return (
    <Card className="bg-secondary/50 border-secondary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-secondary-foreground">Thought for the Moment</CardTitle>
        <Lightbulb className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-primary">
          "{affirmation}"
        </p>
      </CardContent>
    </Card>
  );
}
