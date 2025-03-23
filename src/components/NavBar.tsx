import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Quiz", href: "/quiz/generate" },
  ];

  const handleSmartTutorClick = () => {
    window.open('https://ai-teacher-avatar-by2g61qh7-abhasbalis-projects.vercel.app/', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="bg-primary text-primary-foreground font-bold h-8 w-8 rounded-lg flex items-center justify-center">Q</span>
            <span className="font-semibold text-lg text-foreground">QuizGenius</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            if (!isSignedIn && (item.href === "/dashboard" || item.href === "/quiz/generate")) {
              return null;
            }
            
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-primary" 
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleSmartTutorClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Smart Tutor
          </Button>
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-9 w-9",
                }
              }}
            />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-y-0 right-0 z-50 w-full bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 animate-slide-down">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <span className="bg-primary text-primary-foreground font-bold h-8 w-8 rounded-lg flex items-center justify-center">Q</span>
                  <span className="font-semibold text-lg text-foreground">QuizGenius</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    <Button 
                      variant="outline" 
                      onClick={handleSmartTutorClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Smart Tutor
                    </Button>
                    {navigation.map((item) => {
                      if (!isSignedIn && (item.href === "/dashboard" || item.href === "/quiz/generate")) {
                        return null;
                      }
                      
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium ${
                            isActive 
                              ? "bg-accent text-primary" 
                              : "text-foreground hover:bg-accent"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="py-6">
                    <div className="flex items-center justify-center mb-4">
                      <ThemeToggle />
                    </div>
                    {isSignedIn ? (
                      <div className="flex items-center gap-4">
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              userButtonAvatarBox: "h-9 w-9",
                            }
                          }}
                        />
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                          Profile
                        </Link>
                      </div>
                    ) : (
                      <>
                        <Link
                          to="/sign-in"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/sign-up"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
