import React from 'react';

interface StatProps {
  value: string | number;
  label: string;
}

export const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-500">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default Stat;
