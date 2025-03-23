
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BarChart3, Bell, User, File, Lock, LogOut } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    toast.error("This feature is not implemented yet.");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary overflow-hidden">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={user?.fullName || "Profile"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {user?.firstName?.charAt(0) || ""}
                  {user?.lastName?.charAt(0) || ""}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {user?.fullName || "Your Profile"}
              </h1>
              <p className="text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress || "Manage your account settings and preferences"}
              </p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Progress</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span className="hidden sm:inline">Documents</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            defaultValue={user?.firstName || ""} 
                            disabled
                          />
                          <p className="text-xs text-muted-foreground">
                            Managed by Clerk authentication
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Doe" 
                            defaultValue={user?.lastName || ""} 
                            disabled
                          />
                          <p className="text-xs text-muted-foreground">
                            Managed by Clerk authentication
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          defaultValue={user?.primaryEmailAddress?.emailAddress || ""} 
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          Managed by Clerk authentication
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us a bit about yourself..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-lg font-medium">Learning Preferences</div>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subjects">Preferred Subjects</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Biology", "Physics", "Chemistry", "Mathematics", "History", "Literature"].map((subject) => (
                              <div key={subject} className="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  id={`subject-${subject}`} 
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor={`subject-${subject}`}>{subject}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Default Quiz Difficulty</Label>
                          <select 
                            id="difficulty" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="easy">Easy</option>
                            <option value="medium" selected>Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-md">
                      <div>
                        <div className="font-medium">Delete Account</div>
                        <div className="text-sm text-muted-foreground">
                          Permanently delete your account and all of your data
                        </div>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete Account
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-md">
                      <div>
                        <div className="font-medium">Reset Progress</div>
                        <div className="text-sm text-muted-foreground">
                          Reset all your quiz results and learning progress
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => toast.error("This feature is not implemented yet.")}>
                        Reset Progress
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-quiz-results">Quiz Results</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your quiz results
                          </p>
                        </div>
                        <Switch
                          id="email-quiz-results"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-reminders">Study Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminders when you haven't studied for a while
                          </p>
                        </div>
                        <Switch
                          id="email-reminders"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-new-features">New Features</Label>
                          <p className="text-sm text-muted-foreground">
                            Learn about new features and improvements
                          </p>
                        </div>
                        <Switch
                          id="email-new-features"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-quiz-results">Quiz Results</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive instant notifications when quiz results are ready
                          </p>
                        </div>
                        <Switch
                          id="push-quiz-results"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-reminders">Study Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get reminded to continue your learning journey
                          </p>
                        </div>
                        <Switch
                          id="push-reminders"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => toast.success("Notification settings saved!")}>
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Track your learning journey and improvements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-medium">Overall Performance</h3>
                    <div className="bg-accent/50 rounded-lg p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">12</div>
                          <div className="text-sm text-muted-foreground">Quizzes Taken</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-500">82%</div>
                          <div className="text-sm text-muted-foreground">Average Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">8.5h</div>
                          <div className="text-sm text-muted-foreground">Study Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-500">5</div>
                          <div className="text-sm text-muted-foreground">Streak Days</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Subject Performance</h3>
                    <div className="space-y-3">
                      {[
                        { subject: "Biology", score: 85, quizzes: 4 },
                        { subject: "Physics", score: 92, quizzes: 3 },
                        { subject: "Chemistry", score: 78, quizzes: 2 },
                        { subject: "Mathematics", score: 80, quizzes: 3 },
                      ].map((subject) => (
                        <div key={subject.subject} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>{subject.subject}</span>
                            <span className="text-sm">{subject.score}% ({subject.quizzes} quizzes)</span>
                          </div>
                          <div className="h-2 bg-accent rounded overflow-hidden">
                            <div
                              className={`h-full ${
                                subject.score >= 90 
                                  ? "bg-green-500" 
                                  : subject.score >= 70 
                                  ? "bg-blue-500" 
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${subject.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Study Recommendations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="font-medium mb-1">Chemistry - Organic Compounds</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your recent quiz scores, focus on this area to improve.
                        </p>
                        <Button variant="outline" size="sm">Create Quiz</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="font-medium mb-1">Physics - Quantum Mechanics</div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Recommended for your next learning step.
                        </p>
                        <Button variant="outline" size="sm">Create Quiz</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Uploaded Documents</CardTitle>
                      <CardDescription>Manage your study materials</CardDescription>
                    </div>
                    <Button onClick={() => toast.info("Document upload feature coming soon!")}>
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {/* Placeholder for actual document list */}
                    <div className="p-6 text-center border rounded-lg">
                      <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <h3 className="font-medium text-lg">No documents yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload your study materials to generate quizzes
                      </p>
                      <Button variant="outline" onClick={() => toast.info("Document upload feature coming soon!")}>
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
