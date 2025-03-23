import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import QuizGenerator from "@/pages/QuizGenerator";
import QuizTaking from "@/pages/QuizTaking";
import Profile from "@/pages/Profile";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import { AuthWrapper } from "@/components/AuthWrapper";
import { ThemeToggle } from "@/components/ThemeToggle";

const queryClient = new QueryClient();

// Use the Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_Y3JlZGlibGUtZ3JpenpseS03MS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key");
}

const App = () => (
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    clerkJSVersion="5.56.0-snapshot.v20250312225817"
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    signInFallbackRedirectUrl="/dashboard"
    signUpFallbackRedirectUrl="/dashboard"
    afterSignOutUrl="/"
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ThemeToggle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            } />
            <Route path="/quiz/generate" element={
              <AuthWrapper>
                <QuizGenerator />
              </AuthWrapper>
            } />
            <Route path="/quiz/:quizId" element={
              <AuthWrapper>
                <QuizTaking />
              </AuthWrapper>
            } />
            <Route path="/profile" element={
              <AuthWrapper>
                <Profile />
              </AuthWrapper>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
