
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sprout } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

export function RootedTreeVisualization() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-lg items-center">
      <Card className="w-full animate-fade-in">
        <CardHeader className="text-center items-center">
          <Sprout className="h-12 w-12 text-emerald-500 mb-4" />
          <CardTitle>Rooted Tree Visualization</CardTitle>
          <CardDescription>A guided meditation to foster feelings of stability and strength.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col items-center">
          <p className="text-muted-foreground mb-6 text-center px-4">
            Find a comfortable position, either sitting or standing. Close your eyes if you feel safe to do so, and press play to begin.
          </p>
          <AudioPlayer audioSrc="/audio/rooted-tree.mp3" />
          <p className="text-xs text-muted-foreground mt-4 text-center px-4">
            If you don't hear any sound, please ensure your device is not on silent mode and the volume is up.
          </p>
        </CardContent>
      </Card>
      <Button variant="ghost" className="hover:bg-[#faf4e9]" asChild>
        <Link to="/grounding-tool">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Link>
      </Button>
    </div>
  );
}
