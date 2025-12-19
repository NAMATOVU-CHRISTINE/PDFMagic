import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'glow' | 'slide' | 'ripple' | 'bounce';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'glow',
  className = '',
  ...props 
}) => {
  const variants = {
    glow: 'relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300',
    slide: 'relative overflow-hidden bg-blue-600 hover:bg-blue-700 before:absolute before:inset-0 before:bg-white before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 before:opacity-20',
    ripple: 'relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105 transition-transform duration-200',
    bounce: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:animate-bounce'
  };

  return (
    <button
      className={`px-6 py-3 text-white font-semibold rounded-lg ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedButton;