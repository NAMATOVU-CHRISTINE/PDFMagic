import React from 'react';
import { LucideIcon } from 'lucide-react';
import CountUp from './CountUp';

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  suffix = '',
  color = 'blue' 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-${color}-100 rounded-lg mb-4`}>
        <Icon className={`h-6 w-6 text-${color}-600`} />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        <CountUp end={value} suffix={suffix} />
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default StatsCard;