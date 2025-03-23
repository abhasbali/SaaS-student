import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Lightbulb, Upload, BarChart4 } from "lucide-react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary))_5%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary))_5%,transparent_60%)] opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] opacity-[0.03] bg-grid-foreground/10" />
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Learning Made Interactive
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 animate-slide-down text-foreground">
                Test Your Knowledge with <br />
                <span className="text-primary">AI-Generated Quizzes</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-slide-down" style={{ animationDelay: "0.1s" }}>
                Enhance your learning experience with dynamically generated quizzes tailored to your study topics. Track your progress and improve your understanding.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-8 animate-slide-down" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero floating elements */}
        <div className="relative mt-16 md:mt-24 max-w-6xl mx-auto animate-fade-in">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative bg-card/60 backdrop-blur-md border rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-b from-transparent to-background/5 p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="bg-background rounded-lg shadow-sm p-6 transition-transform hover:translate-y-[-2px] border">
                  <Brain className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">AI-Generated Quizzes</h3>
                  <p className="text-muted-foreground">Create quizzes on any topic with the power of Gemini AI technology.</p>
                </div>
                
                <div className="bg-background rounded-lg shadow-sm p-6 transition-transform hover:translate-y-[-2px] border">
                  <Upload className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">Document Analysis</h3>
                  <p className="text-muted-foreground">Upload study materials and get quizzes generated from your content.</p>
                </div>
                
                <div className="bg-background rounded-lg shadow-sm p-6 transition-transform hover:translate-y-[-2px] border">
                  <BarChart4 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">Progress Tracking</h3>
                  <p className="text-muted-foreground">Monitor your performance and identify areas for improvement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:gap-24">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Platform Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                  Everything You Need to Learn Effectively
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform is designed to make learning interactive, personalized, and effective.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Lightbulb className="h-10 w-10 text-primary" />,
                  title: "Smart Quiz Generation",
                  description: "Leverage AI to create personalized quizzes based on any topic you're studying."
                },
                {
                  icon: <Upload className="h-10 w-10 text-primary" />,
                  title: "Study Material Upload",
                  description: "Upload PDFs, documents, or presentations to generate quizzes from your existing materials."
                },
                {
                  icon: <BarChart4 className="h-10 w-10 text-primary" />,
                  title: "Detailed Analytics",
                  description: "Track your progress over time and identify strengths and weaknesses."
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                  title: "Personalized Learning",
                  description: "Get customized study recommendations based on your quiz performance."
                },
                {
                  icon: <Brain className="h-10 w-10 text-primary" />,
                  title: "AI-Powered Explanations",
                  description: "Receive detailed explanations for answers to deepen your understanding."
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-primary"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  ),
                  title: "Visual Learning",
                  description: "Engage with interactive elements and visualizations to enhance retention."
                }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col gap-2 bg-card border p-6 rounded-lg">
                  {feature.icon}
                  <h3 className="text-xl font-medium text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="bg-primary rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-primary-foreground/5 opacity-10" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground">
                  Ready to enhance your learning?
                </h2>
                <p className="text-primary-foreground/80 max-w-md">
                  Join thousands of students already using our platform to improve their knowledge and test preparation.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <Button variant="secondary" size="lg" className="transition-transform hover:translate-y-[-2px]" asChild>
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground font-bold h-8 w-8 rounded-lg flex items-center justify-center">Q</span>
                <span className="font-semibold text-lg text-foreground">QuizGenius</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered quiz platform for better learning.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: [
                  { name: "Home", href: "/" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Create Quiz", href: "/quiz/generate" }
                ]
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Careers", href: "#" }
                ]
              },
              {
                title: "Legal",
                links: [
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Cookie Policy", href: "#" }
                ]
              }
            ].map((section, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-foreground">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
