import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { affirmations } from "@/lib/affirmations";
import { Lightbulb } from "lucide-react";
export function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");
  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);
  return;
}