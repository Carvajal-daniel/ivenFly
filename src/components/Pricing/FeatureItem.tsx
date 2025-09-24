"use client";

import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  text: string;
  gradient?: boolean;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, text, gradient = false }) => (
  <>
  <div className="flex items-center gap-3">
    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${gradient ? "gradient-primary" : "bg-primary/10"}`}>
      <Icon className={`w-3.5 h-3.5 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
    </div>
    <span className="text-sm">{text}</span>
  </div>
  </>
);
