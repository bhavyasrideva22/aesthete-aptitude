import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  category: "interest" | "personality" | "motivation" | "cognitive";
  options: Array<{
    value: string;
    text: string;
    score: number;
  }>;
}

const psychometricQuestions: Question[] = [
  {
    id: "q1",
    text: "When walking into a room, I immediately notice...",
    category: "interest",
    options: [
      { value: "a", text: "How the furniture is arranged and the overall flow", score: 5 },
      { value: "b", text: "The color scheme and lighting", score: 4 },
      { value: "c", text: "The people in the room", score: 2 },
      { value: "d", text: "The temperature and comfort level", score: 3 }
    ]
  },
  {
    id: "q2",
    text: "I find myself most energized when...",
    category: "motivation",
    options: [
      { value: "a", text: "Creating something beautiful from scratch", score: 5 },
      { value: "b", text: "Solving complex problems", score: 4 },
      { value: "c", text: "Helping others achieve their goals", score: 4 },
      { value: "d", text: "Working with my hands", score: 3 }
    ]
  },
  {
    id: "q3",
    text: "When making decisions, I typically...",
    category: "personality",
    options: [
      { value: "a", text: "Trust my intuition and gut feelings", score: 4 },
      { value: "b", text: "Gather data and analyze options thoroughly", score: 4 },
      { value: "c", text: "Consider how it affects others", score: 3 },
      { value: "d", text: "Go with what feels right in the moment", score: 2 }
    ]
  },
  {
    id: "q4",
    text: "I prefer environments that are...",
    category: "interest",
    options: [
      { value: "a", text: "Aesthetically pleasing and well-designed", score: 5 },
      { value: "b", text: "Functional and efficient", score: 4 },
      { value: "c", text: "Comfortable and welcoming", score: 3 },
      { value: "d", text: "Simple and uncluttered", score: 2 }
    ]
  },
  {
    id: "q5",
    text: "When starting a creative project, I...",
    category: "cognitive",
    options: [
      { value: "a", text: "Sketch out multiple concepts first", score: 5 },
      { value: "b", text: "Research trends and gather inspiration", score: 4 },
      { value: "c", text: "Jump in and figure it out as I go", score: 2 },
      { value: "d", text: "Create a detailed plan and timeline", score: 4 }
    ]
  },
  {
    id: "q6",
    text: "I'm most motivated by work that...",
    category: "motivation",
    options: [
      { value: "a", text: "Allows me to express my creativity", score: 5 },
      { value: "b", text: "Makes a positive impact on others", score: 4 },
      { value: "c", text: "Provides financial stability", score: 2 },
      { value: "d", text: "Offers variety and new challenges", score: 4 }
    ]
  },
  {
    id: "q7",
    text: "When working with others, I tend to...",
    category: "personality",
    options: [
      { value: "a", text: "Take the lead and guide the vision", score: 4 },
      { value: "b", text: "Listen carefully to understand their needs", score: 5 },
      { value: "c", text: "Contribute ideas and collaborate equally", score: 4 },
      { value: "d", text: "Prefer to work independently", score: 2 }
    ]
  },
  {
    id: "q8",
    text: "I learn best when...",
    category: "cognitive",
    options: [
      { value: "a", text: "I can see visual examples and demonstrations", score: 5 },
      { value: "b", text: "I can practice hands-on activities", score: 4 },
      { value: "c", text: "Information is explained step-by-step", score: 3 },
      { value: "d", text: "I can discuss concepts with others", score: 3 }
    ]
  }
];

interface PsychometricAssessmentProps {
  onComplete?: (data: { score: number }) => void;
}

export function PsychometricAssessment({ onComplete }: PsychometricAssessmentProps = {}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / psychometricQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < psychometricQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScores = () => {
    const scores = {
      interest: 0,
      personality: 0,
      motivation: 0,
      cognitive: 0
    };
    
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = psychometricQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      if (question && option) {
        scores[question.category] += option.score;
      }
    });

    return scores;
  };

  if (isCompleted) {
    const scores = calculateScores();
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxScore = psychometricQuestions.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Psychological Fit Assessment Complete</CardTitle>
          <CardDescription className="text-center">
            Your psychological alignment for Interior Design
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
            <div className="text-muted-foreground">Overall Psychological Fit</div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Design Interest</span>
                <span className="text-sm text-muted-foreground">{Math.round((scores.interest / 15) * 100)}%</span>
              </div>
              <Progress value={(scores.interest / 15) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Personality Fit</span>
                <span className="text-sm text-muted-foreground">{Math.round((scores.personality / 10) * 100)}%</span>
              </div>
              <Progress value={(scores.personality / 10) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Motivation</span>
                <span className="text-sm text-muted-foreground">{Math.round((scores.motivation / 10) * 100)}%</span>
              </div>
              <Progress value={(scores.motivation / 10) * 100} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Cognitive Style</span>
                <span className="text-sm text-muted-foreground">{Math.round((scores.cognitive / 10) * 100)}%</span>
              </div>
              <Progress value={(scores.cognitive / 10) * 100} />
            </div>
          </div>

          <div className="p-4 bg-gradient-card rounded-lg">
            <h4 className="font-medium mb-2">Key Insights:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {scores.interest >= 12 && <li>• Strong natural interest in design and aesthetics</li>}
              {scores.personality >= 8 && <li>• Personality traits align well with client-focused work</li>}
              {scores.motivation >= 8 && <li>• Intrinsic motivation for creative expression</li>}
              {scores.cognitive >= 8 && <li>• Learning style suits design education</li>}
              {percentage >= 80 && <li>• Excellent psychological fit for interior design career</li>}
              {percentage < 60 && <li>• Consider exploring related creative fields</li>}
            </ul>
          </div>

          <Button 
            onClick={() => onComplete?.({ score: percentage })} 
            className="w-full"
          >
            Continue to Technical Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = psychometricQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Psychological Fit Assessment</h2>
        <p className="text-muted-foreground mb-4">
          Question {currentQuestion + 1} of {psychometricQuestions.length}
        </p>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.text}</CardTitle>
          <CardDescription>
            Select the option that best describes you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {currentQuestion === psychometricQuestions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}