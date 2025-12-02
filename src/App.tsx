// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Loading } from "@/components/Loading";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2400); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Loading key="loader" />
            ) : (
              <div
                key="app"
                className="min-h-screen bg-background text-foreground"
              >
                <Routes>
                  <Route path="/" element={<Index />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            )}
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;