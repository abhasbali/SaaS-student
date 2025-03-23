
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, BookOpen, Upload, History, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock quiz topics for suggestions
const quizTopics = [
  "Biology - Cell Structure and Function",
  "History - World War II",
  "Mathematics - Algebra",
  "Physics - Forces and Motion",
  "Chemistry - Periodic Table",
  "Literature - Shakespeare",
  "Computer Science - Algorithms",
  "Geography - Climate Change",
];

const QuizGenerator = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [quizFormat, setQuizFormat] = useState("multiple-choice");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generationMethod, setGenerationMethod] = useState("topic");
  
  const filteredTopics = topic
    ? quizTopics.filter((t) => t.toLowerCase().includes(topic.toLowerCase()))
    : [];
  
  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setShowTopicSuggestions(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast.success(`File selected: ${files[0].name}`);
    }
  };
  
  const handleGenerate = () => {
    if (generationMethod === "topic" && !topic) {
      toast.error("Please enter a quiz topic");
      return;
    }
    
    if (generationMethod === "document" && !selectedFile) {
      toast.error("Please upload a document");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to Gemini for quiz generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Quiz successfully generated!");
      navigate("/quiz/1"); // Navigate to a mock quiz
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Generate a New Quiz</h1>
            <p className="text-muted-foreground">Create a personalized quiz with AI or from your documents</p>
          </div>
          
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Quiz Configuration</CardTitle>
              <CardDescription>
                Customize your quiz settings to match your learning needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generation Method Toggle */}
              <div className="space-y-3">
                <Label>Generation Method</Label>
                <RadioGroup 
                  value={generationMethod} 
                  onValueChange={setGenerationMethod}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="topic" id="topic" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="topic" className="flex items-center gap-1.5">
                        <Brain className="h-4 w-4" />
                        From Topic
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Let AI generate questions based on a subject
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="document" id="document" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="document" className="flex items-center gap-1.5">
                        <Upload className="h-4 w-4" />
                        From Document
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Upload your study material to create questions
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Conditional inputs based on generation method */}
              {generationMethod === "topic" ? (
                <div className="space-y-3 relative">
                  <Label htmlFor="topic">Quiz Topic</Label>
                  <div className="relative">
                    <Input
                      id="topic"
                      placeholder="e.g., Biology - Cell Structure and Function"
                      value={topic}
                      onChange={(e) => {
                        setTopic(e.target.value);
                        setShowTopicSuggestions(e.target.value.length > 0);
                      }}
                      onFocus={() => setShowTopicSuggestions(topic.length > 0)}
                      className="w-full"
                    />
                    {showTopicSuggestions && filteredTopics.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-card rounded-md border shadow-md max-h-60 overflow-auto">
                        <div className="p-2">
                          <h4 className="text-sm font-medium mb-1">Suggestions</h4>
                          <div className="space-y-1">
                            {filteredTopics.map((suggestion, i) => (
                              <div
                                key={i}
                                className="text-sm cursor-pointer p-2 rounded-md hover:bg-accent"
                                onClick={() => handleTopicClick(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Recent: </span>
                    <div className="flex flex-wrap gap-2">
                      {["Physics", "World History"].map((item, i) => (
                        <button
                          key={i}
                          className="px-2 py-1 bg-accent rounded text-xs"
                          onClick={() => setTopic(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="document">Upload Document</Label>
                  <div className="grid w-full items-center gap-1.5">
                    <div className="border border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                      <input
                        id="document"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="document" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-lg font-medium">
                            {selectedFile ? selectedFile.name : "Choose a file or drag & drop"}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Supports PDF, DOC, DOCX, PPT, PPTX, TXT (Max 10MB)
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Select File
                          </Button>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quiz Options */}
              <div className="grid gap-6 pt-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Question Format</Label>
                  <Select value={quizFormat} onValueChange={setQuizFormat}>
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True / False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="question-count">Number of Questions: {questionCount}</Label>
                </div>
                <Slider
                  id="question-count"
                  min={5}
                  max={30}
                  step={1}
                  value={[questionCount]}
                  onValueChange={(value) => setQuestionCount(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>30</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="explanations"
                  checked={includeExplanations}
                  onCheckedChange={setIncludeExplanations}
                />
                <Label htmlFor="explanations">Include explanations for answers</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  The quiz will be generated based on your settings. You can retake it as many times as you want.
                </p>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating} 
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Templates */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Science - Biology Basics", icon: BookOpen },
                { title: "History - World Events", icon: History },
                { title: "Computer Science Fundamentals", icon: Brain },
              ].map((template, i) => (
                <Card 
                  key={i} 
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    setTopic(template.title);
                    setGenerationMethod("topic");
                    toast.success(`Template selected: ${template.title}`);
                  }}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                      <template.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{template.title}</h3>
                      <p className="text-xs text-muted-foreground">10 questions • Medium</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizGenerator;
