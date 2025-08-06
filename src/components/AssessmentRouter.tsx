import { useState } from "react";
import { InteriorDesignAssessment } from "./InteriorDesignAssessment";
import { PsychometricAssessment } from "./psychometric/PsychometricAssessment";
import { TechnicalAptitude } from "./technical/TechnicalAptitude";
import { WiscarAnalysis } from "./wiscar/WiscarAnalysis";
import { AssessmentResults } from "./results/AssessmentResults";

type AssessmentStep = "intro" | "psychometric" | "technical" | "wiscar" | "results";

export function AssessmentRouter() {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>("intro");
  const [results, setResults] = useState({
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      "real-world": 0
    }
  });

  const handleStepComplete = (step: AssessmentStep, data?: any) => {
    if (step === "psychometric" && data) {
      setResults(prev => ({ ...prev, psychometric: data.score }));
      setCurrentStep("technical");
    } else if (step === "technical" && data) {
      setResults(prev => ({ ...prev, technical: data.score }));
      setCurrentStep("wiscar");
    } else if (step === "wiscar" && data) {
      setResults(prev => ({ ...prev, wiscar: data.scores }));
      setCurrentStep("results");
    } else {
      // Handle navigation from intro
      setCurrentStep("psychometric");
    }
  };

  const calculateOverallScore = () => {
    const psychWeight = 0.3;
    const techWeight = 0.3;
    const wiscarWeight = 0.4;
    
    const wiscarAvg = Object.values(results.wiscar).reduce((a, b) => a + b, 0) / 6;
    
    return Math.round(
      results.psychometric * psychWeight +
      results.technical * techWeight +
      wiscarAvg * wiscarWeight
    );
  };

  switch (currentStep) {
    case "intro":
      return <InteriorDesignAssessment onStart={() => handleStepComplete("intro")} />;
    case "psychometric":
      return <PsychometricAssessment onComplete={(data) => handleStepComplete("psychometric", data)} />;
    case "technical":
      return <TechnicalAptitude onComplete={(data) => handleStepComplete("technical", data)} />;
    case "wiscar":
      return <WiscarAnalysis onComplete={(data) => handleStepComplete("wiscar", data)} />;
    case "results":
      return (
        <AssessmentResults
          overallScore={calculateOverallScore()}
          psychometricScore={results.psychometric}
          technicalScore={results.technical}
          wiscarScores={results.wiscar}
        />
      );
    default:
      return <InteriorDesignAssessment onStart={() => handleStepComplete("intro")} />;
  }
}