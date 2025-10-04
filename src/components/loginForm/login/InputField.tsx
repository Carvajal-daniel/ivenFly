"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  id: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: string | null;
  disabled?: boolean;
  autoComplete?: string;
}

export const InputField = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  disabled,
  autoComplete,
}: InputFieldProps) => (
  <div className="space-y-1">
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 pl-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
      />
    </div>
    {error && (
      <p id={`${id}-error`} className="text-red-500 text-sm flex items-center gap-1">
        {error}
      </p>
    )}
  </div>
);
