
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CountSection = () => {
  const [count, setCount] = useState(100);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    const newCount = count - 7;
    if (newCount > 0) {
      setCount(newCount);
    } else {
      setCount(newCount);
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCount(100);
    setIsFinished(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Count Backwards</CardTitle>
        <CardDescription>Engage your logical brain by counting backwards from 100 by 7.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 min-h-[200px]">
        <div className="text-6xl font-bold tracking-tighter">{count}</div>
        {isFinished ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Great job! You've completed the exercise.</p>
            <Button onClick={handleReset}>Start Over</Button>
          </div>
        ) : (
          <Button onClick={handleNext} disabled={count <= 0}>Next ({count} - 7)</Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CountSection;
