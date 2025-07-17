
import { lazy, Suspense, useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { PageLoader } from "./PageLoader";
import { cn } from "@/lib/utils";

// Directly import core and lightweight pages for faster initial load
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import GroundingToolPage from "../pages/GroundingTool";
import EmotionLogPage from "../pages/EmotionLog";
import AuthPage from "../pages/AuthPage";
import QuickStressReliefPage from "../pages/tools/QuickStressReliefPage";

// Lazy load heavier tool pages that are not needed on initial load
const FiveFourThreeTwoOnePage = lazy(() => import("../pages/tools/FiveFourThreeTwoOnePage"));
const DeepCalmBreathingPage = lazy(() => import("../pages/tools/DeepCalmBreathingPage"));
const BodyAwarenessPage = lazy(() => import("../pages/tools/BodyAwarenessPage"));
const AnchorStatementsPage = lazy(() => import("../pages/tools/AnchorStatementsPage"));
const MindfulObservationPage = lazy(() => import("../pages/tools/MindfulObservationPage"));
const CognitiveShufflePage = lazy(() => import("../pages/tools/CognitiveShufflePage"));
const FactualReframePage = lazy(() => import("../pages/tools/FactualReframePage"));
const RootedTreeVisualizationPage = lazy(() => import("../pages/tools/RootedTreeVisualizationPage"));
const SafePlaceJourneyPage = lazy(() => import("../pages/tools/SafePlaceJourneyPage"));
const SensoryDistractionsPage = lazy(() => import("../pages/tools/SensoryDistractionsPage"));
const MindfulMovementPage = lazy(() => import("../pages/tools/MindfulMovementPage"));

export const AnimatedRoutes = () => {
    const location = useLocation();
    const [animationClass, setAnimationClass] = useState("animate-fade-in");
    const [currentLocation, setCurrentLocation] = useState(location);

    useEffect(() => {
        if (location.pathname !== currentLocation.pathname) {
            setAnimationClass("animate-fade-out");
            const timer = setTimeout(() => {
                setCurrentLocation(location);
                setAnimationClass("animate-fade-in");
            }, 300); // This duration should match the fade-out animation
            return () => clearTimeout(timer);
        }
    }, [location, currentLocation]);

    return (
        <div className={cn("flex-grow flex flex-col", animationClass)}>
            <Suspense fallback={<PageLoader />}>
                <Routes location={currentLocation} key={currentLocation.pathname}>
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
        </div>
    );
};
