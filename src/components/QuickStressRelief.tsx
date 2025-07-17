
import { useState, useCallback } from 'react';
import { stressReliefTricks, StressReliefTrick } from '@/lib/stressReliefTricks';
import { StressReliefCard } from './stress-relief/StressReliefCard';
import { Button } from './ui/button';
import { Dices } from 'lucide-react';
import { D9Dice } from './stress-relief/D9Dice';

const getRandomTrick = (excludeId?: number): StressReliefTrick => {
  let availableTricks = stressReliefTricks;
  if (excludeId) {
    availableTricks = stressReliefTricks.filter(t => t.id !== excludeId);
  }
  const randomIndex = Math.floor(Math.random() * availableTricks.length);
  return availableTricks[randomIndex];
};

export function QuickStressRelief() {
  const [trick, setTrick] = useState<StressReliefTrick>(() => getRandomTrick());
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(trick.id);
  
  const handleNewTrick = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    
    setTimeout(() => {
      const newTrick = getRandomTrick(trick.id);
      setTrick(newTrick);
      setDiceResult(newTrick.id);
      setIsRolling(false);
    }, 2000); // Corresponds to dice animation time
  }, [isRolling, trick.id]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg items-center">
      <StressReliefCard trick={trick} key={trick.id} />
      
      <div className="flex flex-col items-center gap-4">
        <D9Dice isRolling={isRolling} result={diceResult} />
        <Button variant="outline" onClick={handleNewTrick} disabled={isRolling} className="border-[#948e83]">
          <Dices className="mr-2 h-4 w-4" />
          {isRolling ? 'Rolling...' : 'Click for another trick'}
        </Button>
      </div>
    </div>
  );
}
