
import { useState } from "react";
import { BreathingCircle } from "@/components/BreathingCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DeepCalmBreathingPage = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="container flex-grow flex flex-col items-center justify-center py-12 animate-fade-in">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Deep Calm Breathing</CardTitle>
                <CardDescription>Follow the circle to regulate your breath and find calm.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
                <BreathingCircle isRunning={isRunning} />
            </CardContent>
            <CardFooter className="flex-col gap-4">
                 <Button onClick={() => setIsRunning(!isRunning)} className="w-full">
                    {isRunning ? 'Stop' : 'Start'}
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/grounding-tool">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Toolkit
                  </Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
};

export default DeepCalmBreathingPage;
