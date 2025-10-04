"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
  error?: string;
  disabled?: boolean;
}

export const CheckboxField = ({ id, checked, onChange, label, error, disabled }: CheckboxFieldProps) => (
  <div className="space-y-2">
    <div className="flex items-start gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v as boolean)} disabled={disabled} />
      <Label htmlFor={id} className="text-sm font-normal leading-5 cursor-pointer flex-1">
        {label}
      </Label>
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);
