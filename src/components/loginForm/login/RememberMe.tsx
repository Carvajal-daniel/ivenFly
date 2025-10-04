"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

export const RememberMe = ({ checked, onChange, disabled }: RememberMeProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox id="remember" checked={checked} onCheckedChange={(val) => onChange(val as boolean)} disabled={disabled} />
    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
      Lembrar-me
    </Label>
  </div>
);
