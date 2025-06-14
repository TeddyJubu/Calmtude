
import { GroundingExercise } from "@/components/GroundingExercise";

const GroundingToolPage = () => {
  return (
    <div className="container flex-grow flex flex-col items-center justify-center py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">5-4-3-2-1 Grounding</h1>
        <p className="text-lg text-muted-foreground mt-2">
          An exercise to bring you back to the present moment.
        </p>
      </div>
      <GroundingExercise />
    </div>
  );
};

export default GroundingToolPage;
