import React from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            {index + 1}
          </div>
          <span className="ml-2 text-sm">{step}</span>
          {index < steps.length - 1 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
