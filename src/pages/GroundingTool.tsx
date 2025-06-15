import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Wind, User, BrainCircuit, Anchor, ScanEye, Scale, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const toolCategories = [
  {
    categoryTitle: "Sensory & Body Grounding",
    categoryDescription: "Exercises to connect with your physical self and environment.",
    color: "text-sky-500",
    borderColor: "hover:border-sky-500/50",
    tools: [
      {
        title: "5-4-3-2-1 Sensory Scan",
        description: "Anchor yourself in the present using your five senses.",
        href: "/tools/54321",
        icon: Eye,
        enabled: true,
        duration: "3-5 min",
        difficulty: "Easy",
      },
      {
        title: "Breathing Exercises",
        description: "Follow a visual guide for various breathing techniques.",
        href: "/tools/deep-calm-breathing",
        icon: Wind,
        enabled: true,
        duration: "2-5 min",
        difficulty: "Easy",
      },
      {
        title: "Body Awareness Scan",
        description: "Reconnect with your body and physical sensations.",
        href: "/tools/body-awareness",
        icon: User,
        enabled: true,
        duration: "5-10 min",
        difficulty: "Medium",
      },
    ],
  },
  {
    categoryTitle: "Cognitive & Mental Grounding",
    categoryDescription: "Tools to redirect thoughts and reframe perspectives.",
    color: "text-violet-500",
    borderColor: "hover:border-violet-500/50",
    tools: [
      {
        title: "Mindful Observation",
        description: "Engage analytical thinking by describing the environment.",
        href: "/tools/mindful-observation",
        icon: ScanEye,
        enabled: true,
        duration: "5 min",
        difficulty: "Easy",
      },
      {
        title: "Cognitive Shuffle",
        description: "A simple game to redirect from anxious thoughts.",
        href: "/tools/cognitive-shuffle",
        icon: BrainCircuit,
        enabled: true,
        duration: "5-10 min",
        difficulty: "Medium",
      },
      {
        title: "Factual Reframe",
        description: "A CBT-based tool to separate facts from emotions.",
        href: "/tools/factual-reframe",
        icon: Scale,
        enabled: true,
        duration: "5-15 min",
        difficulty: "Hard",
      },
      {
        title: "Anchor Statements",
        description: "Use pre-written statements for grounding.",
        href: "/tools/anchor-statements",
        icon: Anchor,
        enabled: true,
        duration: "1-2 min",
        difficulty: "Easy",
      },
    ],
  },
];


const GroundingToolPage = () => {
  return (
    <div className="container flex-grow flex flex-col items-center py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Grounding Toolkit</h1>
      </div>
      <div className="w-full max-w-6xl space-y-12">
        {toolCategories.map((category) => (
          <div key={category.categoryTitle}>
            <div className="mb-6 border-b pb-4">
              <h2 className="text-xl font-bold tracking-wide">{category.categoryTitle}</h2>
              <p className="text-md text-muted-foreground mt-1">{category.categoryDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                 <div
                  key={tool.title}
                  className={cn("h-full", !tool.enabled && "cursor-not-allowed opacity-60")}
                >
                  <Link to={tool.enabled ? tool.href : '#'} className={cn("h-full", !tool.enabled && "pointer-events-none")}>
                    <Card className={cn(
                      "h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                      tool.enabled ? category.borderColor : ""
                    )}>
                      <CardHeader className="flex-grow">
                        <tool.icon className="h-8 w-8 mb-4" />
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <CardDescription className="mt-2">{tool.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-4 flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                           <BarChart3 className="mr-1.5 h-3 w-3" />
                          {tool.difficulty}
                        </Badge>
                      </CardFooter>
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
