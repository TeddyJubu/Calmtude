
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GroundingIcon } from "@/components/icons/CustomIcons";

const Index = () => {
  return (
    <div className="container flex-grow flex flex-col items-center justify-center text-center animate-fade-in gap-16 sm:gap-24 py-12 sm:py-24 mobile-container landscape-compact">
      <div className="flex flex-col items-center gap-9">
        <h1 className="font-heading font-extrabold lowercase leading-none text-foreground text-[19vw] sm:text-[20vw] md:text-[15vw] lg:text-[14rem] px-8 max-w-full">
          calmtude
        </h1>
        <div className="flex flex-col items-center gap-2">
          <Button asChild className="rounded-2xl px-6 py-4 h-auto focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 therapeutic-transition touch-target mobile-button-spacing">
            <Link
              to="/grounding-tool"
              className="text-2xl font-medium uppercase flex items-center"
              aria-label="Start grounding exercise to calm down"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              calm down
              <GroundingIcon
                size="lg"
                className="ml-2.5"
                aria-hidden="true"
                focusable={false}
                withHover={true}
                withEntrance={true}
              />
            </Link>
          </Button>
          <p className="text-sm text-foreground/80 font-normal py-[8px] max-w-xs">
            Anxious? Stressed? Click calm down ↑
          </p>
        </div>
      </div>

      <p className="hidden sm:block text-lg text-muted-foreground font-light max-w-md px-4">
        A quiet space to find your calm, understand your feelings, and practice self-compassion.
      </p>
    </div>
  );
};

export default Index;
