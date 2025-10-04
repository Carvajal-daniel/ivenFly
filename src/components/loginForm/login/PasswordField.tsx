"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  value,
  onChange,
  error,
  placeholder,
  icon,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col relative">
      <div className="relative">
        {/* Ícone fixo */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-11 pl-10 pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3  top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          disabled={disabled}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <EyeOff size={18} /> :  <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
