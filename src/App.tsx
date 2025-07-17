
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { useIsMobile } from "./hooks/use-mobile";
import { BottomNav } from "./components/BottomNav";
import { cn } from "./lib/utils";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className={cn("flex-grow flex flex-col", isMobile && "pb-16")}>
              <AnimatedRoutes />
            </main>
            {isMobile && <BottomNav />}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
