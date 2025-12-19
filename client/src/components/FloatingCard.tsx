import React from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FloatingCard;