import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Wind, User, BrainCircuit, Anchor, ScanEye, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const toolCategories = [
  {
    categoryTitle: "Sensory & Body Grounding",
    categoryDescription: "Exercises to connect with your physical self and environment.",
    tools: [
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
        href: "/tools/body-awareness",
        icon: User,
        enabled: true,
      },
    ],
  },
  {
    categoryTitle: "Cognitive & Mental Grounding",
    categoryDescription: "Tools to redirect thoughts and reframe perspectives.",
    tools: [
      {
        title: "Mindful Observation",
        description: "An exercise to engage analytical thinking by describing the immediate environment.",
        href: "#",
        icon: ScanEye,
        enabled: false,
      },
      {
        title: "Cognitive Shuffle",
        description: "A simple game to redirect cognitive resources away from anxious thoughts.",
        href: "#",
        icon: BrainCircuit,
        enabled: false,
      },
      {
        title: "Factual Reframe",
        description: "A CBT-based tool to separate facts from emotional interpretations.",
        href: "#",
        icon: Scale,
        enabled: false,
      },
      {
        title: "Anchor Statements",
        description: "A tool for using pre-written or custom grounding statements.",
        href: "#",
        icon: Anchor,
        enabled: false,
      },
    ],
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
      <div className="w-full max-w-6xl space-y-12">
        {toolCategories.map((category) => (
          <div key={category.categoryTitle}>
            <div className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold tracking-tight">{category.categoryTitle}</h2>
              <p className="text-md text-muted-foreground mt-1">{category.categoryDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                 <div
                  key={tool.title}
                  className={cn("h-full", !tool.enabled && "cursor-not-allowed opacity-60")}
                >
                  <Link to={tool.enabled ? tool.href : '#'} className={cn("h-full", !tool.enabled && "pointer-events-none")}>
                    <Card className="h-full flex flex-col transition-all duration-200 hover:border-primary/50 hover:shadow-md">
                      <CardHeader>
                        <tool.icon className="h-8 w-8 text-primary mb-4" />
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroundingToolPage;
