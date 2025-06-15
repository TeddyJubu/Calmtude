
import { Dices } from 'lucide-react';
import { cn } from '@/lib/utils';

interface D9DiceProps {
  isRolling: boolean;
  result: number | null;
}

export function D9Dice({ isRolling, result }: D9DiceProps) {
  return (
    <div className="relative w-24 h-24">
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 border-primary/50 bg-background flex items-center justify-center transition-all",
          isRolling && "animate-dice-roll"
        )}
      >
        {isRolling ? (
          <Dices className="w-10 h-10 text-primary" />
        ) : (
          <span className="text-4xl font-bold text-primary">
            {result}
          </span>
        )}
      </div>
    </div>
  );
}
