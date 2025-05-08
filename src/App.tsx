import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KVCRequests from "./pages/KVCRequests";
import KVCDetail from "./pages/KVCDetail";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useDispatch } from "react-redux";

import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MainLayout } from "./components/layout/MainLayout";
import HomePage from "./pages/Home";
import NotAllowed from "./pages/NotAllowed";
import KYCPending from "./pages/KYCPending";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();

  const loadUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/user/me", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });
      dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_USER", payload: null });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={
                    // <ProtectedRoute>
                    <HomePage />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    // <ProtectedRoute>
                    <Index />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/kvc-requests"
                  element={
                    <ProtectedRoute>
                      <KVCRequests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/kvc-detail/:id"
                  element={
                    <ProtectedRoute>
                      <KVCDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/kvc/pending"
                  element={
                    <ProtectedRoute>
                      <KYCPending />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route path="not-allowed" element={<NotAllowed />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
