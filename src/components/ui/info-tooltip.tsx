import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; 


interface InfoTooltipProps {
  description: string;
}

export function InfoTooltip({ description }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-muted-foreground/80 hover:text-primary transition-colors cursor-help" />
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          align="start" 
          className="max-w-xs bg-gray-900 text-white border-none shadow-lg p-3 text-sm z-50"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}