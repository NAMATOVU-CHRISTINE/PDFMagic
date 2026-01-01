import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ToolStepsProps {
  steps: Step[];
}

export const ToolSteps: React.FC<ToolStepsProps> = ({ steps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map(step => (
        <div key={step.number} className="text-center">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            {step.number}
          </div>
          <h3 className="font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ToolSteps;
