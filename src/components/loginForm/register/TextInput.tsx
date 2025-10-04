"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  type?: string;
  maxLength?: number;
}

export const TextInput = ({ id, name, value, onChange, placeholder, error, disabled, type = "text", maxLength }: TextInputProps) => (
  <div className="space-y-2">
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      maxLength={maxLength}
      className={`h-11 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
