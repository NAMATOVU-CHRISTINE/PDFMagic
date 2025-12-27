import React from 'react';
import { FileText } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ onClick, darkMode = false, size = 'md' }) => {
  const sizes = {
    sm: { icon: 'h-4 w-4', text: 'text-lg', padding: 'p-1.5' },
    md: { icon: 'h-6 w-6', text: 'text-2xl', padding: 'p-2' },
    lg: { icon: 'h-8 w-8', text: 'text-3xl', padding: 'p-3' },
  };

  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer" 
      onClick={onClick}
    >
      <div className={`bg-gradient-to-r from-red-500 to-pink-500 ${sizes[size].padding} rounded-lg`}>
        <FileText className={`${sizes[size].icon} text-white`} />
      </div>
      <span className={`${sizes[size].text} font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        PDF Magic
      </span>
    </div>
  );
};

export default Logo;
