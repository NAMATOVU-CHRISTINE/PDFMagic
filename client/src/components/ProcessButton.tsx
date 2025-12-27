import React from 'react';
import { Loader } from 'lucide-react';

interface ProcessButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  label: string;
  disabled?: boolean;
}

const ProcessButton: React.FC<ProcessButtonProps> = ({
  onClick,
  isProcessing,
  label,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-colors"
    >
      {isProcessing ? (
        <>
          <Loader className="animate-spin h-5 w-5 mr-2" />
          Processing...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default ProcessButton;
