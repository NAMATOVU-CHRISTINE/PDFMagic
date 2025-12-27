import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  darkMode?: boolean;
}

const Alert: React.FC<AlertProps> = ({ type, message, darkMode = false }) => {
  const config = {
    info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-800 dark:text-blue-300', iconColor: 'text-blue-500' },
    success: { icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-800 dark:text-green-300', iconColor: 'text-green-500' },
    warning: { icon: AlertTriangle, bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-800 dark:text-yellow-300', iconColor: 'text-yellow-500' },
    error: { icon: AlertCircle, bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-800 dark:text-red-300', iconColor: 'text-red-500' },
  };

  const { icon: Icon, bg, text, iconColor } = config[type];

  return (
    <div className={`p-4 rounded-lg flex items-start gap-3 ${bg}`}>
      <Icon className={`h-5 w-5 flex-shrink-0 ${iconColor}`} />
      <p className={text}>{message}</p>
    </div>
  );
};

export default Alert;
