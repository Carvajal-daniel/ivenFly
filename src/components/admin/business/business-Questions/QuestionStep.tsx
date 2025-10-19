// src/components/business-registration/QuestionStep.tsx

// Importações dos novos componentes de etapa
import type { BusinessData } from "../business-registration/BusinessInterfaces";
import Step00Name from "./Step00Name";
import Step01Niche from "./Step01Niche";
import Step02Address from "./Step02Address";
import Step03Revenue from "./Step03Revenue";
import Step04Expenses from "./Step04Expenses";
import Step05Prices from "./Step05Prices";
import Step06Services from "./Step06Services";
import Step07Employees from "./Step07Employees";
import Step08WorkingHours from "./Step08WorkingHours";
import Step09SocialMediaUsage from "./Step09SocialMediaUsage";
import Step10SocialPlatforms from "./Step10SocialPlatforms";
import Step11Challenges from "./Step11Challenges";
import Step12ReportFrequency from "./Step12ReportFrequency";


export interface QuestionStepProps {
  step: number;
  formData: BusinessData;
  updateField: (field: keyof BusinessData, value: any) => void;
}

const QuestionStep = (props: QuestionStepProps) => {
  // O switch agora apenas renderiza o componente específico para cada etapa.
  switch (props.step) {
    case 0:
      return <Step00Name {...props} />;
    case 1:
      return <Step01Niche {...props} />;
    case 2:
      return <Step02Address {...props} />;
    case 3:
      return <Step03Revenue {...props} />;
    case 4:
      return <Step04Expenses {...props} />;
    case 5:
      return <Step05Prices {...props} />;
    case 6:
      return <Step06Services {...props} />;
    case 7:
      return <Step07Employees {...props} />;
    case 8:
      return <Step08WorkingHours {...props} />;
    case 9:
      return <Step09SocialMediaUsage {...props} />;
    case 10:
      return <Step10SocialPlatforms {...props} />;
    case 11:
      return <Step11Challenges {...props} />;
    case 12:
      return <Step12ReportFrequency {...props} />;
    default:
      return null;
  }
};

export default QuestionStep;