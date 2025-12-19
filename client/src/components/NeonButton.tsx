import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'blue' | 'pink' | 'green' | 'purple';
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  color = 'blue',
  className = '',
  ...props 
}) => {
  const colors = {
    blue: 'text-blue-400 border-blue-400 shadow-[0_0_10px_#3b82f6] hover:shadow-[0_0_20px_#3b82f6]',
    pink: 'text-pink-400 border-pink-400 shadow-[0_0_10px_#ec4899] hover:shadow-[0_0_20px_#ec4899]',
    green: 'text-green-400 border-green-400 shadow-[0_0_10px_#10b981] hover:shadow-[0_0_20px_#10b981]',
    purple: 'text-purple-400 border-purple-400 shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_20px_#a855f7]'
  };

  return (
    <button
      className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;