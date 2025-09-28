"use client";

import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export default function AuthContainer() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <AuthLayout
      title={isLoginMode ? "Bem-vindo de volta" : "Crie sua conta"}
      subtitle={
        isLoginMode
          ? "Entre com suas credenciais para acessar sua conta"
          : "Preencha os dados abaixo para se cadastrar"
      }
    >
      {isLoginMode ? (
        <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
      )}
    </AuthLayout>
  );
}
