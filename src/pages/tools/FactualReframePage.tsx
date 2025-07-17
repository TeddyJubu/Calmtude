
import { FactualReframe } from "@/components/FactualReframe";
import { AuthPrompt } from "@/components/AuthPrompt";

const FactualReframePage = () => {
  return (
    <>
      <div className="container flex-grow flex flex-col items-center justify-center py-12 pb-28">
        <FactualReframe />
      </div>
      <AuthPrompt />
    </>
  );
};

export default FactualReframePage;
