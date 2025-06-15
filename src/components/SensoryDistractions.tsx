
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Tally5, Wind } from "lucide-react";
import ListenSection from "./sensory/ListenSection";
import CountSection from "./sensory/CountSection";
import AromatherapySection from "./sensory/AromatherapySection";

const SensoryDistractions = () => {
  return (
    <div className="container flex-grow flex flex-col items-center py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Sensory Distractions</h1>
        <p className="text-lg text-muted-foreground mt-2">Quick sensory tasks to divert attention and reduce anxiety.</p>
      </div>
      <Tabs defaultValue="listen" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listen">
            <Volume2 className="mr-2 h-4 w-4" /> Listen
          </TabsTrigger>
          <TabsTrigger value="count">
            <Tally5 className="mr-2 h-4 w-4" /> Count
          </TabsTrigger>
          <TabsTrigger value="aromatherapy">
            <Wind className="mr-2 h-4 w-4" /> Aromatherapy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="listen" className="mt-6">
          <ListenSection />
        </TabsContent>
        <TabsContent value="count" className="mt-6">
          <CountSection />
        </TabsContent>
        <TabsContent value="aromatherapy" className="mt-6">
          <AromatherapySection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensoryDistractions;
