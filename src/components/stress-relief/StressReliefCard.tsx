
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StressReliefTrick } from '@/lib/stressReliefTricks';

interface StressReliefCardProps {
  trick: StressReliefTrick;
}

export function StressReliefCard({ trick }: StressReliefCardProps) {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="text-center items-center">
        <div className="text-4xl sm:text-5xl mb-4">{trick.emoji}</div>
        <CardTitle>{trick.name}</CardTitle>
        <CardDescription>{trick.brief}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="actions" className="border-b-0">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline justify-center text-muted-foreground data-[state=open]:text-primary">
              Show Action Steps
            </AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2 pt-4 text-left">
                {trick.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
