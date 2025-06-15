
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, Play, Pause, RefreshCw } from 'lucide-react';

const shuffleWords = [
  'Ball', 'River', 'Desk', 'Pencil', 'House', 'Tree', 'Book', 'Key',
  'Spoon', 'Cloud', 'Moon', 'Star', 'Bread', 'Chair', 'Shoe', 'Boat',
  'Leaf', 'Rock', 'Lamp', 'Door', 'Window', 'Hat', 'Glove', 'Apple',
  'Carpet', 'Mirror', 'Clock', 'Phone', 'Bottle', 'Bridge', 'Flower',
];

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function CognitiveShuffle() {
  const [words, setWords] = useState(() => shuffleArray(shuffleWords));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState('Ready?');

  const showNextWord = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % words.length;
      if (nextIndex === 0 && prevIndex !== 0) { // Reshuffle when list is complete
        setWords(shuffleArray(shuffleWords));
        return 0;
      }
      return nextIndex;
    });
  }, [words.length]);

  useEffect(() => {
    if (isPlaying) {
      setCurrentWord(words[currentIndex]);
      const interval = setInterval(() => {
        showNextWord();
      }, 8000); // Change word every 8 seconds
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex, showNextWord, words]);
  
  const handleTogglePlay = () => {
    if (!isPlaying) {
      // If starting fresh or from pause, show the current word immediately
      setCurrentWord(words[currentIndex]);
    } else {
      setCurrentWord('Paused');
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    const newWords = shuffleArray(shuffleWords);
    setWords(newWords);
    setCurrentIndex(0);
    setCurrentWord('Ready?');
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      <Card className="w-full animate-fade-in text-center">
        <CardHeader className="items-center">
          <BrainCircuit className="h-12 w-12 text-primary mb-4" />
          <CardTitle>Cognitive Shuffle</CardTitle>
          <CardDescription>A game to gently occupy your mind and quiet racing thoughts.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            When you start, a random word will appear. Simply visualize the object. A new word will appear every few seconds. Don't try too hard, just let the images float through your mind.
          </p>
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[120px]">
            <p className="text-4xl font-bold tracking-wider">{currentWord}</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-2">
            <Button onClick={handleTogglePlay} className="w-full sm:w-auto flex-grow">
                {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isPlaying ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset} variant="secondary" className="w-full sm:w-auto">
                <RefreshCw className="mr-2" />
                Reset
            </Button>
        </CardFooter>
      </Card>
      <Button variant="ghost" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
