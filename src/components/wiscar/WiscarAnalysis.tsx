import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface WiscarQuestion {
  id: string;
  dimension: "will" | "interest" | "skill" | "cognitive" | "ability" | "real-world";
  text: string;
  options: Array<{
    value: string;
    text: string;
    score: number;
  }>;
}

const wiscarQuestions: WiscarQuestion[] = [
  // Will (Drive & Consistency)
  {
    id: "w1",
    dimension: "will",
    text: "How do you typically handle long-term projects that require sustained effort?",
    options: [
      { value: "a", text: "I maintain steady progress and see projects through to completion", score: 5 },
      { value: "b", text: "I work in bursts but usually finish what I start", score: 4 },
      { value: "c", text: "I sometimes lose motivation partway through", score: 2 },
      { value: "d", text: "I prefer short-term tasks with quick results", score: 1 }
    ]
  },
  {
    id: "w2",
    dimension: "will",
    text: "When facing a design challenge that seems overwhelming, I typically:",
    options: [
      { value: "a", text: "Break it down into smaller, manageable steps", score: 5 },
      { value: "b", text: "Push through with determination", score: 4 },
      { value: "c", text: "Take breaks and come back to it later", score: 3 },
      { value: "d", text: "Seek help or guidance immediately", score: 2 }
    ]
  },
  // Interest (Genuine Curiosity)
  {
    id: "i1",
    dimension: "interest",
    text: "How often do you find yourself browsing design magazines, websites, or social media for inspiration?",
    options: [
      { value: "a", text: "Daily - it's a natural part of my routine", score: 5 },
      { value: "b", text: "Several times a week", score: 4 },
      { value: "c", text: "Occasionally, when I need ideas", score: 3 },
      { value: "d", text: "Rarely, only when specifically looking for something", score: 2 }
    ]
  },
  {
    id: "i2",
    dimension: "interest",
    text: "When visiting a new space (restaurant, hotel, office), I find myself:",
    options: [
      { value: "a", text: "Automatically analyzing the design choices and thinking how I'd improve them", score: 5 },
      { value: "b", text: "Noticing and appreciating good design elements", score: 4 },
      { value: "c", text: "Occasionally commenting on the decor", score: 3 },
      { value: "d", text: "Primarily focused on the function rather than aesthetics", score: 2 }
    ]
  },
  // Skill (Existing Abilities)
  {
    id: "s1",
    dimension: "skill",
    text: "Which of these creative skills do you currently possess or have experience with?",
    options: [
      { value: "a", text: "Drawing, sketching, or digital design tools", score: 5 },
      { value: "b", text: "Photography or visual composition", score: 4 },
      { value: "c", text: "Crafts, DIY projects, or hands-on creation", score: 3 },
      { value: "d", text: "Limited creative experience but eager to learn", score: 2 }
    ]
  },
  {
    id: "s2",
    dimension: "skill",
    text: "How comfortable are you with technology and learning new software?",
    options: [
      { value: "a", text: "Very comfortable - I quickly adapt to new tools", score: 5 },
      { value: "b", text: "Moderately comfortable with guidance", score: 4 },
      { value: "c", text: "Somewhat hesitant but willing to learn", score: 3 },
      { value: "d", text: "Prefer to avoid complex technology", score: 1 }
    ]
  },
  // Cognitive Readiness
  {
    id: "c1",
    dimension: "cognitive",
    text: "When solving spatial problems (like rearranging furniture), I:",
    options: [
      { value: "a", text: "Easily visualize different arrangements in my mind", score: 5 },
      { value: "b", text: "Sketch or draw out possibilities", score: 4 },
      { value: "c", text: "Try different physical arrangements", score: 3 },
      { value: "d", text: "Find it challenging to envision spatial relationships", score: 2 }
    ]
  },
  {
    id: "c2",
    dimension: "cognitive",
    text: "How do you approach complex problems that have multiple possible solutions?",
    options: [
      { value: "a", text: "Consider multiple perspectives and weigh trade-offs systematically", score: 5 },
      { value: "b", text: "Research best practices and adapt them to my situation", score: 4 },
      { value: "c", text: "Try the most obvious solution first", score: 3 },
      { value: "d", text: "Prefer problems with clear, single correct answers", score: 2 }
    ]
  },
  // Ability to Learn
  {
    id: "a1",
    dimension: "ability",
    text: "When receiving constructive criticism on your work, you typically:",
    options: [
      { value: "a", text: "Welcome it as an opportunity to improve and ask follow-up questions", score: 5 },
      { value: "b", text: "Listen carefully and implement suggested changes", score: 4 },
      { value: "c", text: "Accept it but sometimes feel defensive initially", score: 3 },
      { value: "d", text: "Find criticism difficult to hear, even when constructive", score: 2 }
    ]
  },
  {
    id: "a2",
    dimension: "ability",
    text: "How do you prefer to learn new concepts or skills?",
    options: [
      { value: "a", text: "Through hands-on practice and experimentation", score: 5 },
      { value: "b", text: "Combination of theory and practical application", score: 4 },
      { value: "c", text: "Step-by-step instruction and guided practice", score: 3 },
      { value: "d", text: "Theoretical study before any practical application", score: 2 }
    ]
  },
  // Real-world Alignment
  {
    id: "r1",
    dimension: "real-world",
    text: "Interior design often involves working with demanding clients and tight deadlines. How do you handle pressure?",
    options: [
      { value: "a", text: "I perform well under pressure and stay organized", score: 5 },
      { value: "b", text: "I can handle pressure with proper planning", score: 4 },
      { value: "c", text: "I manage but prefer less stressful environments", score: 3 },
      { value: "d", text: "High pressure situations make me anxious", score: 2 }
    ]
  },
  {
    id: "r2",
    dimension: "real-world",
    text: "The interior design field often requires irregular hours, client meetings, and site visits. This work style:",
    options: [
      { value: "a", text: "Appeals to me - I prefer variety and flexibility", score: 5 },
      { value: "b", text: "Sounds manageable with good time management", score: 4 },
      { value: "c", text: "Concerns me but I could adapt", score: 3 },
      { value: "d", text: "Would be difficult for my lifestyle preferences", score: 2 }
    ]
  }
];

const dimensionInfo = {
  will: {
    name: "Will (Drive & Consistency)",
    description: "Your determination and persistence in pursuing long-term goals",
    color: "bg-red-100 text-red-800"
  },
  interest: {
    name: "Interest (Genuine Curiosity)",
    description: "Your natural fascination with design and aesthetics",
    color: "bg-blue-100 text-blue-800"
  },
  skill: {
    name: "Skill (Existing Abilities)",
    description: "Your current technical and creative capabilities",
    color: "bg-green-100 text-green-800"
  },
  cognitive: {
    name: "Cognitive Readiness",
    description: "Your problem-solving and spatial thinking abilities",
    color: "bg-purple-100 text-purple-800"
  },
  ability: {
    name: "Ability to Learn",
    description: "Your openness to feedback and learning agility",
    color: "bg-orange-100 text-orange-800"
  },
  "real-world": {
    name: "Real-world Alignment",
    description: "How well you align with industry demands and work environment",
    color: "bg-teal-100 text-teal-800"
  }
};

interface WiscarAnalysisProps {
  onComplete?: (data: { scores: Record<string, number> }) => void;
}

export function WiscarAnalysis({ onComplete }: WiscarAnalysisProps = {}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / wiscarQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < wiscarQuestions.length - 1) {
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

  const calculateWiscarScores = () => {
    const scores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      "real-world": 0
    };

    const maxScores = {
      will: 10,
      interest: 10,
      skill: 10,
      cognitive: 10,
      ability: 10,
      "real-world": 10
    };

    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = wiscarQuestions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      if (question && option) {
        scores[question.dimension] += option.score;
      }
    });

    return { scores, maxScores };
  };

  if (isCompleted) {
    const { scores, maxScores } = calculateWiscarScores();
    const percentageScores = Object.entries(scores).map(([dimension, score]) => ({
      dimension,
      score,
      percentage: Math.round((score / maxScores[dimension as keyof typeof maxScores]) * 100)
    }));

    const overallScore = Math.round(
      Object.values(scores).reduce((sum, score) => sum + score, 0) / 
      Object.values(maxScores).reduce((sum, max) => sum + max, 0) * 100
    );

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">WISCAR Framework Analysis Complete</CardTitle>
          <CardDescription className="text-center">
            Comprehensive readiness assessment across 6 key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{overallScore}%</div>
            <div className="text-muted-foreground">Overall WISCAR Score</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {percentageScores.map(({ dimension, score, percentage }) => (
              <Card key={dimension} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={dimensionInfo[dimension as keyof typeof dimensionInfo].color}>
                    {dimensionInfo[dimension as keyof typeof dimensionInfo].name}
                  </Badge>
                  <span className="font-bold text-lg">{percentage}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {dimensionInfo[dimension as keyof typeof dimensionInfo].description}
                </p>
                <Progress value={percentage} className="h-2" />
                <div className="mt-2 text-xs text-muted-foreground">
                  Score: {score}/{maxScores[dimension as keyof typeof maxScores]}
                </div>
              </Card>
            ))}
          </div>

          <div className="p-6 bg-gradient-card rounded-lg">
            <h4 className="font-medium mb-4">WISCAR Analysis Insights:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2">Strengths:</h5>
                <ul className="space-y-1 text-muted-foreground">
                  {percentageScores.filter(s => s.percentage >= 80).map(s => (
                    <li key={s.dimension}>• Excellent {dimensionInfo[s.dimension as keyof typeof dimensionInfo].name.split(' ')[0]}</li>
                  ))}
                  {overallScore >= 85 && <li>• Outstanding overall readiness for interior design</li>}
                  {overallScore >= 70 && overallScore < 85 && <li>• Strong foundation with good potential</li>}
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Development Areas:</h5>
                <ul className="space-y-1 text-muted-foreground">
                  {percentageScores.filter(s => s.percentage < 60).map(s => (
                    <li key={s.dimension}>• Focus on developing {dimensionInfo[s.dimension as keyof typeof dimensionInfo].name.split(' ')[0]}</li>
                  ))}
                  {overallScore < 70 && <li>• Consider foundational design courses before specializing</li>}
                  <li>• All areas can be improved with targeted practice</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onComplete?.({ scores: Object.fromEntries(percentageScores.map(s => [s.dimension, s.percentage])) })} 
              className="bg-gradient-primary text-primary-foreground px-8"
              size="lg"
            >
              View Complete Results & Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = wiscarQuestions[currentQuestion];
  const currentDimension = dimensionInfo[question.dimension];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">WISCAR Framework Analysis</h2>
        <p className="text-muted-foreground mb-4">
          Question {currentQuestion + 1} of {wiscarQuestions.length}
        </p>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className={currentDimension.color}>
              {currentDimension.name}
            </Badge>
          </div>
          <CardTitle className="text-lg">{question.text}</CardTitle>
          <CardDescription>
            {currentDimension.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
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
          {currentQuestion === wiscarQuestions.length - 1 ? "Complete Analysis" : "Next"}
        </Button>
      </div>
    </div>
  );
}