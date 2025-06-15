
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { PageLoader } from "./components/PageLoader";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GroundingToolPage = lazy(() => import("./pages/GroundingTool"));
const EmotionLogPage = lazy(() => import("./pages/EmotionLog"));
const FiveFourThreeTwoOnePage = lazy(() => import("./pages/tools/FiveFourThreeTwoOnePage"));
const DeepCalmBreathingPage = lazy(() => import("./pages/tools/DeepCalmBreathingPage"));
const BodyAwarenessPage = lazy(() => import("./pages/tools/BodyAwarenessPage"));
const AnchorStatementsPage = lazy(() => import("./pages/tools/AnchorStatementsPage"));
const MindfulObservationPage = lazy(() => import("./pages/tools/MindfulObservationPage"));
const CognitiveShufflePage = lazy(() => import("./pages/tools/CognitiveShufflePage"));
const FactualReframePage = lazy(() => import("./pages/tools/FactualReframePage"));
const RootedTreeVisualizationPage = lazy(() => import("./pages/tools/RootedTreeVisualizationPage"));
const SafePlaceJourneyPage = lazy(() => import("./pages/tools/SafePlaceJourneyPage"));
const SensoryDistractionsPage = lazy(() => import("./pages/tools/SensoryDistractionsPage"));
const MindfulMovementPage = lazy(() => import("./pages/tools/MindfulMovementPage"));
const QuickStressReliefPage = lazy(() => import("./pages/tools/QuickStressReliefPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

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
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/grounding-tool" element={<GroundingToolPage />} />
                <Route path="/emotion-log" element={<EmotionLogPage />} />
                <Route path="/tools/54321" element={<FiveFourThreeTwoOnePage />} />
                <Route path="/tools/deep-calm-breathing" element={<DeepCalmBreathingPage />} />
                <Route path="/tools/body-awareness" element={<BodyAwarenessPage />} />
                <Route path="/tools/anchor-statements" element={<AnchorStatementsPage />} />
                <Route path="/tools/mindful-observation" element={<MindfulObservationPage />} />
                <Route path="/tools/cognitive-shuffle" element={<CognitiveShufflePage />} />
                <Route path="/tools/factual-reframe" element={<FactualReframePage />} />
                <Route path="/tools/rooted-tree-visualization" element={<RootedTreeVisualizationPage />} />
                <Route path="/tools/safe-place-journey" element={<SafePlaceJourneyPage />} />
                <Route path="/tools/sensory-distractions" element={<SensoryDistractionsPage />} />
                <Route path="/tools/mindful-movement" element={<MindfulMovementPage />} />
                <Route path="/quick-stress-relief" element={<QuickStressReliefPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
