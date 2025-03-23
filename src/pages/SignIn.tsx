
import { useEffect } from "react";
import { SignIn as ClerkSignIn, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const SignIn = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent flex flex-col items-center justify-center">
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-secondary transition-all duration-200 flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="w-full max-w-md p-8 glass rounded-lg animate-fade-in">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-medium mb-1">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue to QuizGenius</p>
        </div>
        
        <ClerkSignIn
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              formFieldInput: "bg-secondary border-border",
              footerActionLink: "text-primary hover:text-primary/90",
            }
          }}
        />
      </div>
    </div>
  );
};
