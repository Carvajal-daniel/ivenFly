// src/components/business-registration/QuestionnaireCompleted.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { TOTAL_STEPS } from "./BusinessInterfaces";

interface QuestionnaireCompletedProps {
    resetForm: () => void;
}

const QuestionnaireCompleted = ({ resetForm }: QuestionnaireCompletedProps) => {
    const totalStepsDisplay = TOTAL_STEPS + 1;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <Card className="relative w-full max-w-2xl p-12 shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-2 border-white/20 dark:border-slate-800/50 animate-scale-in">
                <div className="text-center space-y-8">
                    {/* Success icon with animation */}
                    <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-40 animate-pulse" />
                        <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                            <Check className="w-12 h-12 text-white animate-bounce" />
                        </div>
                    </div>

                    {/* Title with gradient */}
                    <div className="space-y-3">
                        <h2 className="text-4xl font-bold bg-primary bg-clip-text text-transparent">
                            Questionário Concluído!
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                            <p>Suas respostas foram salvas com sucesso</p>
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </div>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200/50 dark:border-blue-800/50">
                            <div className="text-3xl font-bold text-primary dark:text-blue-400">{totalStepsDisplay}</div>
                            <div className="text-sm text-muted-foreground">Perguntas</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-purple-200/50 dark:border-purple-800/50">
                            <div className="text-3xl font-bold text-primary  dark:text-purple-400">100%</div>
                            <div className="text-sm text-muted-foreground">Completo</div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-pink-200/50 dark:border-pink-800/50">
                            <div className="text-3xl font-bold text-primary  dark:text-pink-400">✓</div>
                            <div className="text-sm text-muted-foreground">Salvo</div>
                        </div>
                    </div>

                    <Button
                        onClick={resetForm}
                        className="mt-4 bg-primary hover:bg-primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        size="lg"
                    >
                        Preencher Novamente
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default QuestionnaireCompleted;