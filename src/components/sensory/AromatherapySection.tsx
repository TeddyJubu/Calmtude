
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wind } from "lucide-react";

const AromatherapySection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aromatherapy Tip</CardTitle>
        <CardDescription>Use scents to create a calming atmosphere.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
          <Wind className="h-8 w-8 text-secondary-foreground mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Engage Your Sense of Smell</h4>
            <p className="text-muted-foreground text-sm">
              Aromatherapy can be a powerful grounding technique. Certain smells can trigger feelings of calm and safety.
            </p>
          </div>
        </div>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Keep a calming essential oil nearby, like lavender, chamomile, or sandalwood. Place a drop on a tissue and inhale.</li>
          <li>Light a scented candle with a soothing fragrance.</li>
          <li>Brew a cup of herbal tea, like peppermint or ginger, and inhale the steam.</li>
          <li>Notice the smell of your soap or lotion when you wash your hands.</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default AromatherapySection;
