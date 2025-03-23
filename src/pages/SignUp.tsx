
import { useEffect } from "react";
import { SignUp as ClerkSignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const SignUp = () => {
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
          <h1 className="text-2xl font-medium mb-1">Create your account</h1>
          <p className="text-muted-foreground">Join QuizGenius and start learning</p>
        </div>
        
        <ClerkSignUp
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
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
