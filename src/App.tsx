
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Import our pages and layouts
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import BadgesPage from "./pages/BadgesPage";
import MatchesPage from "./pages/MatchesPage";
import MessagesPage from "./pages/MessagesPage";
import MessageDetailPage from "./pages/MessageDetailPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SettingsPage from "./pages/SettingsPage";
import SwipePage from "./pages/SwipePage";
import ProfileCreationPage from "./pages/ProfileCreationPage";
import AppLayout from "./layouts/AppLayout";
import AuthProvider from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes - About page is the default landing page */}
            <Route path="/" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/create-profile" element={<ProfileCreationPage />} />
            
            {/* Protected routes with AppLayout */}
            <Route path="/" element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/swipe" element={<SwipePage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:matchId" element={<MessageDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
