
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight, Flag, BarChart, Save } from "lucide-react";
import { toast } from "sonner";

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "Biology Fundamentals",
  description: "Test your knowledge of basic biology concepts",
  questions: [
    {
      id: "q1",
      text: "What is the powerhouse of the cell?",
      options: [
        { id: "a", text: "Nucleus" },
        { id: "b", text: "Mitochondria" },
        { id: "c", text: "Ribosome" },
        { id: "d", text: "Endoplasmic Reticulum" },
      ],
      correctAnswer: "b",
      explanation: "Mitochondria are often called the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
    },
    {
      id: "q2",
      text: "Which of the following is NOT a type of blood cell?",
      options: [
        { id: "a", text: "Red blood cells" },
        { id: "b", text: "White blood cells" },
        { id: "c", text: "Platelets" },
        { id: "d", text: "Stem cells" },
      ],
      correctAnswer: "d",
      explanation: "Stem cells are undifferentiated cells, not a type of blood cell. The three types of blood cells are red blood cells (erythrocytes), white blood cells (leukocytes), and platelets (thrombocytes)."
    },
    {
      id: "q3",
      text: "What is photosynthesis?",
      options: [
        { id: "a", text: "The process of plants releasing oxygen" },
        { id: "b", text: "The process of plants growing towards light" },
        { id: "c", text: "The process of converting light energy to chemical energy" },
        { id: "d", text: "The process of plants absorbing water" },
      ],
      correctAnswer: "c",
      explanation: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, generating oxygen as a byproduct. The primary function is converting light energy to chemical energy."
    },
    {
      id: "q4",
      text: "Which structure in a plant cell allows it to maintain its shape and rigidity?",
      options: [
        { id: "a", text: "Cell membrane" },
        { id: "b", text: "Cell wall" },
        { id: "c", text: "Nucleus" },
        { id: "d", text: "Chloroplast" },
      ],
      correctAnswer: "b",
      explanation: "The cell wall is a rigid structure that surrounds the cell membrane in plants, fungi, and many bacteria. It provides structural support and protection, allowing plants to maintain their shape and rigidity."
    },
    {
      id: "q5",
      text: "DNA is primarily found in which cell structure?",
      options: [
        { id: "a", text: "Ribosome" },
        { id: "b", text: "Golgi apparatus" },
        { id: "c", text: "Mitochondria" },
        { id: "d", text: "Nucleus" },
      ],
      correctAnswer: "d",
      explanation: "The nucleus contains the cell's DNA and is the control center of the cell. While some DNA is found in mitochondria, the vast majority of a cell's genetic material is contained within the nucleus."
    },
  ],
};

const QuizTaking = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  
  const quiz = mockQuiz;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  useEffect(() => {
    // Timer countdown
    if (!quizCompleted && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quizCompleted, showResults]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };
  
  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(false);
    }
  };
  
  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
    
    toast.info(
      flaggedQuestions.includes(questionId) 
        ? "Question unmarked for review" 
        : "Question marked for review"
    );
  };
  
  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };
  
  const handleSubmit = () => {
    setQuizCompleted(true);
    setShowResults(true);
    
    // Simulate saving results
    toast.success("Quiz completed and results saved!");
  };
  
  const handleExit = () => {
    if (!quizCompleted && Object.keys(selectedAnswers).length > 0) {
      setShowExitDialog(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 md:px-6 pt-28 pb-16">
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            {/* Quiz Header */}
            <div className="bg-card shadow-sm rounded-lg border p-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{quiz.title}</h1>
                  <p className="text-muted-foreground">{quiz.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{formatTime(timeRemaining)}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleExit}>
                    Exit
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{Math.round(progress)}% completed</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
            
            {/* Question Card */}
            <Card className="shadow-sm mb-6">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">
                    <span className="text-primary font-bold mr-2">Q{currentQuestionIndex + 1}.</span> 
                    {currentQuestion.text}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mt-1 ${flaggedQuestions.includes(currentQuestion.id) ? "text-amber-500" : ""}`}
                  onClick={() => toggleFlag(currentQuestion.id)}
                >
                  <Flag className="h-5 w-5" />
                  <span className="sr-only">Flag for review</span>
                </Button>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-start space-x-2 rounded-md border p-3 ${
                        showExplanation 
                          ? option.id === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : selectedAnswers[currentQuestion.id] === option.id
                              ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                              : ""
                          : ""
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="flex-1 cursor-pointer text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.text}</span>
                          {showExplanation && (
                            option.id === currentQuestion.correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                            ) : selectedAnswers[currentQuestion.id] === option.id ? (
                              <XCircle className="h-5 w-5 text-red-500 ml-2" />
                            ) : null
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {/* Explanation Section */}
                {showExplanation && (
                  <div className="mt-6 p-4 bg-accent rounded-md">
                    <h3 className="font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Explanation
                    </h3>
                    <p className="mt-1 text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between border-t px-6 py-4">
                <div className="flex gap-2 mb-4 sm:mb-0">
                  <Button
                    variant="outline"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  {!showExplanation && (
                    <Button
                      variant="outline"
                      onClick={() => setShowExplanation(true)}
                      disabled={!selectedAnswers[currentQuestion.id]}
                    >
                      Check Answer
                    </Button>
                  )}
                </div>
                <div>
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <Button onClick={handleNextQuestion} className="gap-1">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="gap-1">
                      Finish Quiz
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {/* Question Navigation */}
            <div className="bg-card shadow-sm rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-3">Question Navigator</h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {quiz.questions.map((question, index) => (
                  <Button
                    key={question.id}
                    variant="outline"
                    size="sm"
                    className={`h-10 w-10 p-0 ${
                      index === currentQuestionIndex
                        ? "border-primary ring-1 ring-primary"
                        : ""
                    } ${
                      selectedAnswers[question.id]
                        ? "bg-primary/10"
                        : ""
                    } ${
                      flaggedQuestions.includes(question.id)
                        ? "border-amber-500 text-amber-500"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-primary/10"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-white border"></div>
                  <span>Unanswered</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-white border border-amber-500"></div>
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-white border-2 border-primary"></div>
                  <span>Current</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Results Screen
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-sm">
              <CardHeader className="text-center border-b">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold">{calculateScore().percentage}%</h2>
                    <p className="text-muted-foreground mt-1">
                      You scored {calculateScore().correct} out of {calculateScore().total} questions correctly
                    </p>
                  </div>
                  
                  <div className="bg-accent/50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Performance Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Correct Answers</span>
                        <span className="font-medium text-green-500">{calculateScore().correct}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Incorrect Answers</span>
                        <span className="font-medium text-red-500">{calculateScore().total - calculateScore().correct}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Completion Time</span>
                        <span className="font-medium">{formatTime(300 - timeRemaining)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Accuracy</span>
                        <span className="font-medium">{calculateScore().percentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Question Breakdown</h3>
                    <div className="space-y-3 mt-3">
                      {quiz.questions.map((question, index) => {
                        const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                        return (
                          <div key={question.id} className="flex gap-3 p-3 rounded border bg-card">
                            <div>
                              {isCorrect ? (
                                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4" />
                                </div>
                              ) : (
                                <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                                  <XCircle className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Q{index + 1}. {question.text}</div>
                              {!isCorrect && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  <span className="text-red-500">Your answer:</span> {
                                    question.options.find(opt => opt.id === selectedAnswers[question.id])?.text || "No answer"
                                  }
                                </div>
                              )}
                              <div className="text-xs text-muted-foreground mt-1">
                                <span className="text-green-500">Correct answer:</span> {
                                  question.options.find(opt => opt.id === question.correctAnswer)?.text
                                }
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-2 justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Back to Dashboard
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers({});
                    setShowResults(false);
                    setQuizCompleted(false);
                    setTimeRemaining(300);
                    setFlaggedQuestions([]);
                    setShowExplanation(false);
                  }}>
                    Retake Quiz
                  </Button>
                  <Button>
                    Next Recommended Quiz
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You haven't completed the quiz yet. Your progress will be lost if you exit now.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/dashboard")}>
              Exit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizTaking;
