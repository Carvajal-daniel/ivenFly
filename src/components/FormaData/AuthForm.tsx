"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import Header from "../header/Header";

type AuthMode = "login" | "register";

export default function AuthForm() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { toast } = useToast();

  const switchMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  return (
    <>

    <Header />
    <div className="min-h-screen flex items-center justify-center gradient-hero p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 blur-[5rem] -right-40 w-80 h-80 gradient-polygon opacity-20 animate-float polygon-shape"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 gradient-accent opacity-10 animate-glow polygon-shape"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-xl">1U</span>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {authMode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {authMode === "login" ? "Entre na sua conta 1Uply para continuar" : "Junte-se à plataforma de crescimento empresarial"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {authMode === "login" ? (
            <LoginForm toast={toast} />
          ) : (
            <RegisterForm toast={toast} />
          )}

          <div className="space-y-4">
            <Separator className="bg-border" />
            <div className="text-center">
              <span className="text-muted-foreground">
                {authMode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
              </span>{" "}
              <Button
                variant="link"
                onClick={switchMode}
                className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                >
                {authMode === "login" ? "Criar conta" : "Fazer login"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
                </>
  );
}
