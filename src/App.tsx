
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import PortfolioResult from "./pages/PortfolioResult";
import PortfolioSimulation from "./pages/PortfolioSimulation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stock/:id" element={<StockDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/result" element={<PortfolioResult />} />
          <Route path="/portfolio/simulation" element={<PortfolioSimulation />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/market/:id" element={<StockDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
