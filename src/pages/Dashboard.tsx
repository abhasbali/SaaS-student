import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, BarChart3, GraduationCap, Clock, BookOpen, CheckCircle, XCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for recent quizzes
const recentQuizzes = [
  { id: "1", title: "Biology Fundamentals", score: 85, totalQuestions: 20, date: "2023-08-10" },
  { id: "2", title: "World History", score: 70, totalQuestions: 15, date: "2023-08-08" },
  { id: "3", title: "Physics Mechanics", score: 90, totalQuestions: 25, date: "2023-08-05" },
];

// Mock data for uploaded documents
const uploadedDocuments = [
  { id: "1", name: "Biology Notes.pdf", size: "2.4 MB", date: "2023-08-10" },
  { id: "2", title: "History Chapter 5.pdf", size: "1.8 MB", date: "2023-08-08" },
];

// Add mock data for charts
const performanceData = [
  { month: "Jan", score: 75 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 82 },
  { month: "Apr", score: 78 },
  { month: "May", score: 85 },
  { month: "Jun", score: 90 },
];

const subjectPerformance = [
  { subject: "Physics", score: 85, questions: 120 },
  { subject: "Chemistry", score: 72, questions: 90 },
  { subject: "Biology", score: 78, questions: 150 },
  { subject: "Math", score: 92, questions: 200 },
  { subject: "History", score: 88, questions: 80 },
];

const Dashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API calls
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 md:px-6 pt-32 pb-16">
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome back, {user?.firstName || 'Student'}!</h1>
              <p className="text-muted-foreground">Track your learning progress and create new quizzes</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild>
                <Link to="/quiz/generate" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create New Quiz</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="quizzes" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>My Quizzes</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card shadow-sm transition-transform hover:translate-y-[-2px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{isLoading ? "-" : "12"}</div>
                    <p className="text-xs text-muted-foreground mt-1">+3 from last week</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card shadow-sm transition-transform hover:translate-y-[-2px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{isLoading ? "-" : "82%"}</div>
                    <p className="text-xs text-green-500 mt-1">↑ 5% from last week</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card shadow-sm transition-transform hover:translate-y-[-2px]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Study Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{isLoading ? "-" : "8.5h"}</div>
                    <p className="text-xs text-muted-foreground mt-1">This week</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Performance Trend */}
              <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                    <CardDescription>Your quiz scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted"></div>
                        <div className="h-4 w-32 rounded bg-muted"></div>
                      </div>
                    </div>
                  ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="month" className="text-sm text-muted-foreground" />
                            <YAxis className="text-sm text-muted-foreground" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                            />
                            <Line
                              type="monotone"
                              dataKey="score"
                              stroke="hsl(var(--primary))"
                              strokeWidth={2}
                              dot={{ fill: "hsl(var(--primary))" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Subject Performance */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Score distribution by subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted"></div>
                          <div className="h-4 w-32 rounded bg-muted"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={subjectPerformance}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="subject" className="text-sm text-muted-foreground" />
                            <YAxis className="text-sm text-muted-foreground" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                            />
                            <Bar 
                              dataKey="score" 
                              fill="hsl(var(--primary))"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent quiz results and learning progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted"></div>
                        <div className="h-4 w-32 rounded bg-muted"></div>
                      </div>
                    </div>
                  ) : recentQuizzes.length > 0 ? (
                    <div className="space-y-4">
                      {recentQuizzes.map((quiz) => (
                        <div key={quiz.id} className="flex items-center gap-4 p-4 rounded-lg bg-accent/50">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{quiz.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(quiz.date)} • Score: {quiz.score}/{quiz.totalQuestions}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-medium ${
                              quiz.score / quiz.totalQuestions >= 0.7 
                                ? "text-green-500" 
                                : "text-amber-500"
                            }`}>
                              {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <GraduationCap className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No quizzes taken yet</h3>
                      <p className="text-muted-foreground mt-1">Create your first quiz to get started</p>
                      <Button asChild className="mt-4">
                        <Link to="/quiz/generate">Create Quiz</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Learning Recommendations */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Learning Recommendations</CardTitle>
                  <CardDescription>Topics we suggest based on your quiz results</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                      <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted"></div>
                        <div className="h-4 w-32 rounded bg-muted"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-medium">Physics - Forces & Motion</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Based on your recent quiz results, we recommend reviewing these concepts.
                        </p>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Quiz created for Physics - Forces & Motion")}>
                          Create Quiz
                        </Button>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-medium">History - World War II</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Continue your learning journey with this related topic.
                        </p>
                        <Button variant="outline" size="sm" onClick={() => toast.success("Quiz created for History - World War II")}>
                          Create Quiz
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quizzes" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>My Quizzes</CardTitle>
                      <CardDescription>All quizzes you've taken or created</CardDescription>
                    </div>
                    <Button asChild>
                      <Link to="/quiz/generate">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Quiz
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="animate-pulse flex items-center gap-4 p-4 rounded-lg bg-muted">
                          <div className="h-10 w-10 rounded-full bg-muted-foreground/20"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/2 bg-muted-foreground/20 rounded"></div>
                            <div className="h-3 w-1/3 bg-muted-foreground/20 rounded"></div>
                          </div>
                          <div className="h-8 w-16 bg-muted-foreground/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : recentQuizzes.length > 0 ? (
                    <div className="space-y-4">
                      {recentQuizzes.map((quiz) => (
                        <div key={quiz.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-5 w-5 text-primary" />
                              <h4 className="text-sm font-medium truncate">{quiz.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(quiz.date)} • {quiz.totalQuestions} questions
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                              quiz.score / quiz.totalQuestions >= 0.7 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}>
                              {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/quiz/${quiz.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                  <path d="M5 12h14"></path>
                                  <path d="m12 5 7 7-7 7"></path>
                                </svg>
                                <span className="sr-only">View Quiz</span>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <GraduationCap className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No quizzes taken yet</h3>
                      <p className="text-muted-foreground mt-1">Create your first quiz to get started</p>
                      <Button asChild className="mt-4">
                        <Link to="/quiz/generate">Create Quiz</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Quiz Performance Analysis */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                  <CardDescription>Your strengths and areas to improve</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-5/6 bg-muted rounded"></div>
                      <div className="h-4 w-4/6 bg-muted rounded"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Strengths</span>
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm">Physics - Electricity (95%)</div>
                          <div className="text-sm">Mathematics - Algebra (90%)</div>
                          <div className="text-sm">History - Ancient Civilizations (85%)</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>Areas to Improve</span>
                          </h4>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm">Biology - Cellular Biology (65%)</div>
                          <div className="text-sm">Chemistry - Organic Compounds (60%)</div>
                          <div className="text-sm">Geography - Climate Change (55%)</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Uploaded Documents</CardTitle>
                      <CardDescription>Study materials you've uploaded for quiz generation</CardDescription>
                    </div>
                    <Button onClick={() => toast.info("Document upload feature coming soon!")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((item) => (
                        <div key={item} className="animate-pulse flex items-center gap-4 p-4 rounded-lg bg-muted">
                          <div className="h-10 w-10 rounded bg-muted-foreground/20"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-1/2 bg-muted-foreground/20 rounded"></div>
                            <div className="h-3 w-1/3 bg-muted-foreground/20 rounded"></div>
                          </div>
                          <div className="h-8 w-16 bg-muted-foreground/20 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : uploadedDocuments.length > 0 ? (
                    <div className="space-y-4">
                      {uploadedDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div className="flex items-center justify-center h-10 w-10 rounded bg-primary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{doc.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(doc.date)} • {doc.size}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.success("Quiz generated from document!")}>
                              Generate Quiz
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No documents uploaded</h3>
                      <p className="text-muted-foreground mt-1">Upload study materials to generate quizzes</p>
                      <Button className="mt-4" onClick={() => toast.info("Document upload feature coming soon!")}>
                        Upload Document
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
