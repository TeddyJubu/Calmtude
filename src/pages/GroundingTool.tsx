import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Wind, User, BrainCircuit, Home, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "5-4-3-2-1 Sensory Scan",
    description: "Anchor yourself in the present using your five senses.",
    href: "/tools/54321",
    icon: Eye,
    enabled: true,
  },
  {
    title: "Breathing Exercises",
    description: "Follow a visual guide for various breathing techniques.",
    href: "/tools/deep-calm-breathing",
    icon: Wind,
    enabled: true,
  },
  {
    title: "Body Awareness Scan",
    description: "Reconnect with your body and physical sensations.",
    href: "#",
    icon: User,
    enabled: false,
  },
  {
    title: "Cognitive Shuffle",
    description: "A simple game to redirect anxious thoughts.",
    href: "#",
    icon: BrainCircuit,
    enabled: false,
  },
  {
    title: "Safe Place Journey",
    description: "A guided visualization to your personal safe space.",
    href: "#",
    icon: Home,
    enabled: false,
  },
  {
    title: "Anchor Statements",
    description: "Use powerful statements to ground yourself.",
    href: "#",
    icon: Anchor,
    enabled: false,
  },
];

const GroundingToolPage = () => {
  return (
    <div className="container flex-grow flex flex-col items-center py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Grounding Toolkit</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          A collection of exercises to help you find calm and reconnect with the present moment.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature) => (
           <div
            key={feature.title}
            className={cn(!feature.enabled && "cursor-not-allowed opacity-60")}
          >
            <Link to={feature.enabled ? feature.href : '#'} className={cn(!feature.enabled && "pointer-events-none")}>
              <Card className="h-full flex flex-col transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroundingToolPage;
