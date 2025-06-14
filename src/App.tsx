
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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#388e3c", // A dark green accent
    },
    background: {
      default: "#0F0F0E",
      paper: "#1a1a18",
    },
    text: {
      primary: "#FFFFE3",
      secondary: "rgba(255, 255, 227, 0.7)",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { fontFamily: "Paquito-Variable, serif", fontSize: "3rem", fontWeight: 700 },
    h2: { fontFamily: "Paquito-Variable, serif", fontSize: "2.5rem", fontWeight: 700 },
    h3: { fontFamily: "Paquito-Variable, serif", fontSize: "2rem", fontWeight: 700 },
    h4: { fontFamily: "Paquito-Variable, serif", fontSize: "1.5rem", fontWeight: 700 },
    h5: { fontFamily: "Paquito-Variable, serif", fontSize: "1.25rem", fontWeight: 700 },
    h6: { fontFamily: "Paquito-Variable, serif", fontSize: "1rem", fontWeight: 700 },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/grounding-tool" element={<GroundingToolPage />} />
                <Route path="/emotion-log" element={<EmotionLogPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
