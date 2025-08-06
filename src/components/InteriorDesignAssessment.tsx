import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentSteps } from "./AssessmentSteps";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, BookOpen } from "lucide-react";
import heroImage from "@/assets/interior-design-hero.jpg";

const assessmentSteps = [
  {
    id: "intro",
    title: "Introduction",
    icon: "📖",
    isCompleted: false,
    isActive: true,
  },
  {
    id: "psychological",
    title: "Psychological Fit",
    icon: "🧠",
    isCompleted: false,
    isActive: false,
  },
  {
    id: "technical",
    title: "Technical Aptitude",
    icon: "🔧",
    isCompleted: false,
    isActive: false,
  },
  {
    id: "wiscar",
    title: "WISCAR Analysis",
    icon: "📊",
    isCompleted: false,
    isActive: false,
  },
  {
    id: "results",
    title: "Your Results",
    icon: "🎯",
    isCompleted: false,
    isActive: false,
  },
];

interface InteriorDesignAssessmentProps {
  onStart?: () => void;
}

export function InteriorDesignAssessment({ onStart }: InteriorDesignAssessmentProps = {}) {
  const [progress] = useState(20);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-subtle">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Is Interior Design Right for You?
              </h1>
              <p className="text-muted-foreground">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-primary">{progress}% Complete</span>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Steps */}
      <div className="container mx-auto px-4 py-8">
        <AssessmentSteps steps={assessmentSteps} />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden shadow-large">
            <div className="relative">
              <img
                src={heroImage}
                alt="Interior Design Workspace"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Discover Your Interior Design Career Potential
                  </h2>
                  <p className="text-lg md:text-xl mb-6 max-w-2xl">
                    Take our comprehensive assessment to evaluate your psychological fit, 
                    technical readiness, and career alignment for a future in interior design.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>25-30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Personalized Results</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Career Guidance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* What is Interior Design */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🏠</span>
                  <span>What is Interior Design?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Interior Design is the <strong>art and science</strong> of enhancing 
                  interior spaces to achieve a healthier and more aesthetically pleasing 
                  environment. It combines <strong>creativity, technical knowledge, 
                  and client collaboration</strong> to transform spaces.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="text-sm font-medium">Creative Design</div>
                    <div className="text-xs text-muted-foreground">Aesthetic vision and innovation</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl mb-2">📐</div>
                    <div className="text-sm font-medium">Technical Skills</div>
                    <div className="text-xs text-muted-foreground">CAD, space planning, materials</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl mb-2">👥</div>
                    <div className="text-sm font-medium">Client Focus</div>
                    <div className="text-xs text-muted-foreground">Understanding needs and preferences</div>
                  </div>
                  <div className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="text-sm font-medium">Project Management</div>
                    <div className="text-xs text-muted-foreground">Timelines, budgets, coordination</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Opportunities */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>💼</span>
                  <span>Career Opportunities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                    <Badge variant="secondary">🎨</Badge>
                    <div>
                      <div className="font-medium">Interior Designer</div>
                      <div className="text-sm text-muted-foreground">Create functional and beautiful spaces</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                    <Badge variant="secondary">📋</Badge>
                    <div>
                      <div className="font-medium">Space Planner</div>
                      <div className="text-sm text-muted-foreground">Optimize layout and flow of spaces</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                    <Badge variant="secondary">🛍️</Badge>
                    <div>
                      <div className="font-medium">Visual Merchandiser</div>
                      <div className="text-sm text-muted-foreground">Design retail environments</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                    <Badge variant="secondary">📊</Badge>
                    <div>
                      <div className="font-medium">Design Project Manager</div>
                      <div className="text-sm text-muted-foreground">Coordinate design teams and timelines</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                    <Badge variant="secondary">🏗️</Badge>
                    <div>
                      <div className="font-medium">Design Consultant</div>
                      <div className="text-sm text-muted-foreground">Advise on design solutions and trends</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ideal Traits */}
          <Card className="mb-8 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>⭐</span>
                <span>Ideal Traits & Skills</span>
              </CardTitle>
              <CardDescription>
                Successful interior designers typically possess these key characteristics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="font-medium text-primary">Creative & Aesthetic</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Strong visual sense</li>
                    <li>• Color theory understanding</li>
                    <li>• Artistic creativity</li>
                    <li>• Trend awareness</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-primary">Technical & Analytical</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Spatial reasoning</li>
                    <li>• CAD software proficiency</li>
                    <li>• Material knowledge</li>
                    <li>• Building codes awareness</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-primary">Interpersonal & Business</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Client communication</li>
                    <li>• Project management</li>
                    <li>• Budget consciousness</li>
                    <li>• Problem-solving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Modules */}
          <Card className="mb-8 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🔍</span>
                <span>What You'll Discover</span>
              </CardTitle>
              <CardDescription>
                Our comprehensive assessment evaluates multiple dimensions of your career fit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Assessment Modules:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-primary-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium">Psychological Fit Evaluation</div>
                        <div className="text-sm text-muted-foreground">Personality, interests, and motivation assessment</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-primary-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium">Technical Aptitude Testing</div>
                        <div className="text-sm text-muted-foreground">Spatial reasoning and technical knowledge</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-primary-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium">WISCAR Framework Analysis</div>
                        <div className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive, Ability, Real-world alignment</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Your Results Include:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Personalized fit score (0-100)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Detailed trait analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Technical readiness assessment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Career pathway recommendations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Next steps and learning resources</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Alternative career suggestions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground hover:shadow-large transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={onStart}
            >
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Takes 25-30 minutes • Get instant results • Free career guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}