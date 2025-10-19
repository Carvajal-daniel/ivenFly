
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useQuestionnaireState } from "./QuestionnaireState";
import QuestionnaireCompleted from "./QuestionnaireCompleted";
import QuestionStep from "../business-Questions/QuestionStep";

// As interfaces BusinessData, Address, WorkingHours e a constante TOTAL_STEPS
// foram movidas para BusinessInterfaces.ts

const BusinessQuestionnaire = () => {
  const {
    currentStep,
    isCompleted,
    formData,
    progress,
    updateField,
    handleNext,
    handleBack,
    resetForm,
    TOTAL_STEPS
  } = useQuestionnaireState();

  if (isCompleted) {
    return <QuestionnaireCompleted resetForm={resetForm} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <Card className="relative w-full max-w-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-2 border-white/20 dark:border-slate-800/50">
        <div className="space-y-8">
          {/* Header with enhanced styling */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-black/80 dark:text-white">
                  Conte-nos sobre seu negócio
                </h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold">
                    {currentStep + 1}
                  </span>
                  de {TOTAL_STEPS + 1} etapas
                </p>
              </div>
              
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm" />
              <Progress 
                value={progress} 
                className="h-3 relative shadow-lg bg-slate-200 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Question with smooth transition */}
          <div className="py-10 animate-slide-in" key={currentStep}>
            <QuestionStep
              step={currentStep}
              formData={formData}
              updateField={updateField}
            />
          </div>

          {/* Enhanced Navigation */}
          <div className="flex justify-between items-center pt-6 border-t-2 border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 border-2 hover:border-blue-300 dark:hover:border-blue-700"
              size="lg"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </Button>

            <Button 
              onClick={handleNext} 
              className="gap-2"
              size="lg"
            >
              {currentStep === TOTAL_STEPS ? (
                <>
                  <Check className="w-5 h-5" />
                  Concluir
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessQuestionnaire;