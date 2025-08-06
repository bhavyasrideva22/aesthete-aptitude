import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface AssessmentStepsProps {
  steps: Step[];
}

export function AssessmentSteps({ steps }: AssessmentStepsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-2 md:space-x-4 bg-card rounded-xl p-4 shadow-subtle border">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300",
                step.isCompleted
                  ? "bg-gradient-primary text-primary-foreground shadow-medium"
                  : step.isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {step.icon}
            </div>
            <div className="ml-2 hidden md:block">
              <div
                className={cn(
                  "text-sm font-medium",
                  step.isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-2 md:mx-4 w-6 md:w-12 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}