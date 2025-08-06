import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface TechnicalQuestion {
  id: string;
  text: string;
  type: "spatial" | "technical" | "numerical" | "situational";
  question: string;
  options: Array<{
    value: string;
    text: string;
    isCorrect: boolean;
  }>;
  explanation?: string;
}

const technicalQuestions: TechnicalQuestion[] = [
  {
    id: "t1",
    text: "Spatial Reasoning",
    type: "spatial",
    question: "If you're looking at a room from above (bird's eye view), and you see a rectangular sofa against the left wall, where would you place a coffee table for optimal flow?",
    options: [
      { value: "a", text: "Directly in front of the sofa, 18 inches away", isCorrect: true },
      { value: "b", text: "Against the opposite wall", isCorrect: false },
      { value: "c", text: "In the corner of the room", isCorrect: false },
      { value: "d", text: "Touching the front of the sofa", isCorrect: false }
    ],
    explanation: "18 inches provides comfortable legroom while maintaining easy access to the table."
  },
  {
    id: "t2",
    text: "Technical Knowledge",
    type: "technical",
    question: "Which software is primarily used by interior designers for creating floor plans and 3D visualizations?",
    options: [
      { value: "a", text: "Microsoft Excel", isCorrect: false },
      { value: "b", text: "AutoCAD or SketchUp", isCorrect: true },
      { value: "c", text: "Adobe Photoshop only", isCorrect: false },
      { value: "d", text: "PowerPoint", isCorrect: false }
    ],
    explanation: "AutoCAD and SketchUp are industry-standard tools for technical drawings and 3D modeling."
  },
  {
    id: "t3",
    text: "Numerical Skills",
    type: "numerical",
    question: "A client has a budget of $15,000 for furniture. If furniture typically costs $25 per square foot, what's the maximum room size they can furnish?",
    options: [
      { value: "a", text: "400 square feet", isCorrect: false },
      { value: "b", text: "500 square feet", isCorrect: false },
      { value: "c", text: "600 square feet", isCorrect: true },
      { value: "d", text: "750 square feet", isCorrect: false }
    ],
    explanation: "$15,000 ÷ $25 per sq ft = 600 square feet maximum coverage."
  },
  {
    id: "t4",
    text: "Material Knowledge",
    type: "technical",
    question: "Which material would be LEAST suitable for a high-traffic commercial entrance floor?",
    options: [
      { value: "a", text: "Porcelain tile", isCorrect: false },
      { value: "b", text: "Natural stone", isCorrect: false },
      { value: "c", text: "Plush carpet", isCorrect: true },
      { value: "d", text: "Polished concrete", isCorrect: false }
    ],
    explanation: "Plush carpet shows wear quickly and is difficult to clean in high-traffic areas."
  },
  {
    id: "t5",
    text: "Situational Judgment",
    type: "situational",
    question: "A client loves a specific expensive wallpaper that exceeds their budget. What's the best approach?",
    options: [
      { value: "a", text: "Tell them they can't afford it", isCorrect: false },
      { value: "b", text: "Suggest using it as an accent wall to reduce cost", isCorrect: true },
      { value: "c", text: "Recommend going over budget", isCorrect: false },
      { value: "d", text: "Choose a different wallpaper without consulting them", isCorrect: false }
    ],
    explanation: "An accent wall achieves the desired look while respecting budget constraints."
  },
  {
    id: "t6",
    text: "Color Theory",
    type: "technical",
    question: "Which color combination creates a complementary color scheme?",
    options: [
      { value: "a", text: "Blue and green", isCorrect: false },
      { value: "b", text: "Red and pink", isCorrect: false },
      { value: "c", text: "Blue and orange", isCorrect: true },
      { value: "d", text: "Yellow and green", isCorrect: false }
    ],
    explanation: "Complementary colors are opposite on the color wheel - blue and orange are direct opposites."
  },
  {
    id: "t7",
    text: "Space Planning",
    type: "spatial",
    question: "In a 12x14 foot living room, what's the minimum walking space you should maintain around furniture?",
    options: [
      { value: "a", text: "12 inches", isCorrect: false },
      { value: "b", text: "24 inches", isCorrect: false },
      { value: "c", text: "36 inches", isCorrect: true },
      { value: "d", text: "48 inches", isCorrect: false }
    ],
    explanation: "36 inches (3 feet) is the standard minimum for comfortable navigation around furniture."
  },
  {
    id: "t8",
    text: "Project Management",
    type: "situational",
    question: "Your furniture delivery is delayed by 3 weeks, but the client's event is in 2 weeks. What do you do first?",
    options: [
      { value: "a", text: "Wait and hope it arrives early", isCorrect: false },
      { value: "b", text: "Immediately contact the client to discuss alternatives", isCorrect: true },
      { value: "c", text: "Cancel the order and start over", isCorrect: false },
      { value: "d", text: "Blame the supplier", isCorrect: false }
    ],
    explanation: "Transparent communication allows you to work together on solutions like rental furniture or timeline adjustments."
  }
];

interface TechnicalAptitudeProps {
  onComplete?: (data: { score: number }) => void;
}

export function TechnicalAptitude({ onComplete }: TechnicalAptitudeProps = {}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const progress = ((currentQuestion + 1) / technicalQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestion < technicalQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    setShowExplanation(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = technicalQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      if (option?.isCorrect) {
        correct++;
      }
    });
    return Math.round((correct / technicalQuestions.length) * 100);
  };

  const getScoreByType = () => {
    const typeScores = {
      spatial: { correct: 0, total: 0 },
      technical: { correct: 0, total: 0 },
      numerical: { correct: 0, total: 0 },
      situational: { correct: 0, total: 0 }
    };

    technicalQuestions.forEach(question => {
      typeScores[question.type].total++;
      const answer = answers[question.id];
      const option = question.options.find(o => o.value === answer);
      if (option?.isCorrect) {
        typeScores[question.type].correct++;
      }
    });

    return typeScores;
  };

  if (isCompleted) {
    const totalScore = calculateScore();
    const typeScores = getScoreByType();

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Technical Aptitude Assessment Complete</CardTitle>
          <CardDescription className="text-center">
            Your technical readiness for Interior Design
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{totalScore}%</div>
            <div className="text-muted-foreground">Overall Technical Score</div>
          </div>

          <div className="space-y-4">
            {Object.entries(typeScores).map(([type, scores]) => (
              <div key={type}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium capitalize">{type} Skills</span>
                  <span className="text-sm text-muted-foreground">
                    {scores.correct}/{scores.total} correct
                  </span>
                </div>
                <Progress value={(scores.correct / scores.total) * 100} />
              </div>
            ))}
          </div>

          <div className="p-4 bg-gradient-card rounded-lg">
            <h4 className="font-medium mb-2">Technical Readiness Assessment:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {totalScore >= 80 && <li>• Excellent foundation for interior design studies</li>}
              {totalScore >= 60 && totalScore < 80 && <li>• Good basic understanding, some areas to strengthen</li>}
              {totalScore < 60 && <li>• Would benefit from foundational design education</li>}
              {typeScores.spatial.correct >= 2 && <li>• Strong spatial reasoning abilities</li>}
              {typeScores.technical.correct >= 2 && <li>• Good grasp of design tools and materials</li>}
              {typeScores.situational.correct >= 2 && <li>• Excellent client management instincts</li>}
            </ul>
          </div>

          <Button 
            onClick={() => onComplete?.({ score: totalScore })} 
            className="w-full"
          >
            Continue to WISCAR Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = technicalQuestions[currentQuestion];
  const currentAnswer = answers[question.id];
  const selectedOption = question.options.find(o => o.value === currentAnswer);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Technical Aptitude Assessment</h2>
        <p className="text-muted-foreground mb-4">
          Question {currentQuestion + 1} of {technicalQuestions.length}
        </p>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{question.question}</CardTitle>
            <span className="text-xs bg-primary-muted text-primary px-2 py-1 rounded">
              {question.text}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={currentAnswer || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className={`flex-1 cursor-pointer ${
                    showExplanation && option.isCorrect 
                      ? 'text-green-600 font-medium' 
                      : showExplanation && currentAnswer === option.value && !option.isCorrect
                      ? 'text-red-600'
                      : ''
                  }`}
                >
                  {option.text}
                  {showExplanation && option.isCorrect && <span className="ml-2">✓</span>}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showExplanation && question.explanation && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
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
          disabled={!currentAnswer}
        >
          {currentQuestion === technicalQuestions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}