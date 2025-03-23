
// Service to handle Gemini API interactions

interface QuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

interface QuizGenerationParams {
  topic: string;
  difficulty: string;
  questionCount: number;
  includeExplanations: boolean;
  quizFormat: string;
}

export class GeminiService {
  private static apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

  /**
   * Generate a quiz using the Gemini API
   */
  static async generateQuiz(params: QuizGenerationParams): Promise<QuizQuestion[]> {
    try {
      // Check if API key is available
      if (!this.apiKey) {
        console.error("Missing Gemini API Key");
        throw new Error("Gemini API key is required");
      }

      // This would be the actual API call in production
      // For now, we'll simulate a response with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock questions
      return this.generateMockQuestions(params);
    } catch (error) {
      console.error("Error generating quiz:", error);
      throw error;
    }
  }

  /**
   * Generate quiz questions from a document (simulated)
   */
  static async generateQuizFromDocument(file: File, params: Omit<QuizGenerationParams, 'topic'>): Promise<QuizQuestion[]> {
    try {
      // This would handle document processing and API call in production
      // For now, we'll simulate a response with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Return mock questions based on document name
      return this.generateMockQuestions({
        ...params,
        topic: file.name.split('.')[0]
      });
    } catch (error) {
      console.error("Error generating quiz from document:", error);
      throw error;
    }
  }

  /**
   * Generate a mock quiz for development purposes
   */
  private static generateMockQuestions(params: QuizGenerationParams): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const letters = ["a", "b", "c", "d"];
    
    // Generate mock questions based on the topic
    for (let i = 0; i < params.questionCount; i++) {
      const correctAnswerIndex = Math.floor(Math.random() * 4);
      
      questions.push({
        id: `q${i + 1}`,
        text: `Sample question ${i + 1} about ${params.topic}?`,
        options: Array(4).fill(null).map((_, index) => ({
          id: letters[index],
          text: `Option ${letters[index].toUpperCase()} for question ${i + 1}`
        })),
        correctAnswer: letters[correctAnswerIndex],
        explanation: params.includeExplanations 
          ? `This is an explanation for question ${i + 1} about ${params.topic}.`
          : ""
      });
    }
    
    return questions;
  }
}
