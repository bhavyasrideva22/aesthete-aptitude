import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Target, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";

interface AssessmentResultsProps {
  overallScore: number;
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: Record<string, number>;
}

export function AssessmentResults({ 
  overallScore, 
  psychometricScore, 
  technicalScore, 
  wiscarScores 
}: AssessmentResultsProps) {
  
  const getRecommendation = (score: number) => {
    if (score >= 85) return "excellent";
    if (score >= 70) return "good";
    if (score >= 55) return "moderate";
    return "needs-development";
  };

  const recommendation = getRecommendation(overallScore);

  const careerPaths = [
    {
      title: "Residential Interior Designer",
      description: "Design homes, apartments, and living spaces for private clients",
      fit: overallScore >= 75,
      requirements: ["Strong aesthetic sense", "Client communication", "Space planning"]
    },
    {
      title: "Commercial Interior Designer", 
      description: "Design offices, retail spaces, restaurants, and other commercial environments",
      fit: overallScore >= 70 && technicalScore >= 65,
      requirements: ["Technical skills", "Building codes", "Project management"]
    },
    {
      title: "Space Planner",
      description: "Optimize layouts and workflows for efficiency and functionality",
      fit: wiscarScores.cognitive >= 75,
      requirements: ["Spatial reasoning", "Analytical thinking", "CAD proficiency"]
    },
    {
      title: "Visual Merchandiser",
      description: "Create appealing displays for retail environments",
      fit: psychometricScore >= 70,
      requirements: ["Creative vision", "Trend awareness", "Quick turnaround"]
    },
    {
      title: "Design Consultant",
      description: "Provide expert advice on design solutions and trends",
      fit: overallScore >= 80,
      requirements: ["Extensive experience", "Communication skills", "Business acumen"]
    }
  ];

  const learningResources = [
    {
      category: "Foundational Knowledge",
      resources: [
        "Interior Design Principles and Elements",
        "Color Theory and Psychology",
        "Furniture Styles and History",
        "Building Codes and Regulations"
      ]
    },
    {
      category: "Technical Skills",
      resources: [
        "AutoCAD for Interior Design",
        "SketchUp 3D Modeling",
        "Adobe Creative Suite",
        "Revit Architecture"
      ]
    },
    {
      category: "Business Skills",
      resources: [
        "Client Communication and Presentation",
        "Project Management",
        "Contract and Pricing",
        "Marketing and Portfolio Development"
      ]
    }
  ];

  const nextSteps = {
    excellent: [
      "Apply to accredited interior design programs",
      "Start building a portfolio of design projects",
      "Seek internships with design firms",
      "Consider specialization areas (residential, commercial, sustainable design)"
    ],
    good: [
      "Take foundational design courses",
      "Practice with design software (SketchUp, AutoCAD)",
      "Start a design blog or social media presence",
      "Volunteer for design projects to build experience"
    ],
    moderate: [
      "Strengthen weak areas identified in assessment",
      "Take introductory art and design classes",
      "Explore design through online courses and tutorials",
      "Consider design-adjacent fields that interest you"
    ],
    "needs-development": [
      "Explore foundational creative courses",
      "Consider alternative creative careers",
      "Develop technical and spatial skills",
      "Reassess interests and career goals"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Results Header */}
      <Card className="shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-2">Your Interior Design Career Assessment Results</CardTitle>
          <CardDescription className="text-lg">
            Comprehensive analysis of your suitability for Interior Design
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-primary mb-4">{overallScore}%</div>
            <div className="text-xl text-muted-foreground">Overall Career Fit Score</div>
            
            {recommendation === "excellent" && (
              <Badge className="mt-4 bg-green-100 text-green-800 text-lg px-4 py-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                Excellent Fit - Highly Recommended
              </Badge>
            )}
            {recommendation === "good" && (
              <Badge className="mt-4 bg-blue-100 text-blue-800 text-lg px-4 py-2">
                <TrendingUp className="w-5 h-5 mr-2" />
                Good Fit - Recommended with Development
              </Badge>
            )}
            {recommendation === "moderate" && (
              <Badge className="mt-4 bg-orange-100 text-orange-800 text-lg px-4 py-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                Moderate Fit - Consider Alternatives
              </Badge>
            )}
            {recommendation === "needs-development" && (
              <Badge className="mt-4 bg-red-100 text-red-800 text-lg px-4 py-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                Needs Development - Explore Other Options
              </Badge>
            )}
          </div>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{psychometricScore}%</div>
                <div className="text-sm font-medium mb-2">Psychological Fit</div>
                <Progress value={psychometricScore} className="h-2" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{technicalScore}%</div>
                <div className="text-sm font-medium mb-2">Technical Aptitude</div>
                <Progress value={technicalScore} className="h-2" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {Math.round(Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                </div>
                <div className="text-sm font-medium mb-2">WISCAR Analysis</div>
                <Progress value={Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6} className="h-2" />
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Career Pathways */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <span>Recommended Career Pathways</span>
          </CardTitle>
          <CardDescription>
            Interior design roles that align with your assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {careerPaths.map((path, index) => (
              <Card key={index} className={`p-4 ${path.fit ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{path.title}</h4>
                  {path.fit ? (
                    <Badge className="bg-green-100 text-green-800">Good Fit</Badge>
                  ) : (
                    <Badge variant="secondary">Consider Later</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                <div>
                  <div className="text-xs font-medium mb-1">Key Requirements:</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {path.requirements.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="w-6 h-6" />
            <span>Your Next Steps</span>
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextSteps[recommendation].map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-card rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <span>Recommended Learning Resources</span>
          </CardTitle>
          <CardDescription>
            Essential knowledge and skills to develop for interior design success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {learningResources.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium mb-3 text-primary">{category.category}</h4>
                <ul className="space-y-2">
                  {category.resources.map((resource, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Careers */}
      {recommendation === "moderate" || recommendation === "needs-development" ? (
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="w-6 h-6" />
              <span>Alternative Career Suggestions</span>
            </CardTitle>
            <CardDescription>
              Related creative careers that might be a better fit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-card rounded-lg">
                <h4 className="font-medium mb-2">Graphic Design</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Create visual communications for print and digital media
                </p>
                <div className="text-xs text-muted-foreground">
                  Good for: Strong creative interests with less spatial complexity
                </div>
              </div>
              <div className="p-4 bg-gradient-card rounded-lg">
                <h4 className="font-medium mb-2">Architecture</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Design buildings and structures with focus on function and form
                </p>
                <div className="text-xs text-muted-foreground">
                  Good for: Strong technical and spatial skills
                </div>
              </div>
              <div className="p-4 bg-gradient-card rounded-lg">
                <h4 className="font-medium mb-2">Project Management</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Coordinate teams and resources to deliver projects successfully
                </p>
                <div className="text-xs text-muted-foreground">
                  Good for: Strong organizational and communication skills
                </div>
              </div>
              <div className="p-4 bg-gradient-card rounded-lg">
                <h4 className="font-medium mb-2">Art Therapy</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Use creative processes to help people express and heal
                </p>
                <div className="text-xs text-muted-foreground">
                  Good for: Creative interests with people-helping motivation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <Button 
          size="lg" 
          className="bg-gradient-primary text-primary-foreground hover:shadow-large transform hover:scale-105 transition-all duration-300 px-8"
        >
          Download Detailed Report
        </Button>
        <div className="flex justify-center space-x-4 text-sm">
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Find Design Schools
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Connect with Mentors
          </Button>
          <Button variant="outline" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Explore Courses
          </Button>
        </div>
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          This assessment provides guidance based on your responses and industry standards. 
          Consider consulting with career counselors and design professionals for personalized advice.
        </p>
      </div>
    </div>
  );
}