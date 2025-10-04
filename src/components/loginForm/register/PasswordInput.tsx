"use client";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const PasswordInput = ({
  id,
  name,
  placeholder,
  value,
  error,
  onChange,
  disabled,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2 relative flex items-center justify-center">
      <Input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Esconder senha" : "Mostrar senha"}
        className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
        disabled={disabled}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
