
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GroundingToolPage from "./pages/GroundingTool";
import EmotionLogPage from "./pages/EmotionLog";
import { Header } from "./components/Header";
import FiveFourThreeTwoOnePage from "./pages/tools/FiveFourThreeTwoOnePage";
import DeepCalmBreathingPage from "./pages/tools/DeepCalmBreathingPage";
import BodyAwarenessPage from "./pages/tools/BodyAwarenessPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/grounding-tool" element={<GroundingToolPage />} />
              <Route path="/emotion-log" element={<EmotionLogPage />} />
              <Route path="/tools/54321" element={<FiveFourThreeTwoOnePage />} />
              <Route path="/tools/deep-calm-breathing" element={<DeepCalmBreathingPage />} />
              <Route path="/tools/body-awareness" element={<BodyAwarenessPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
