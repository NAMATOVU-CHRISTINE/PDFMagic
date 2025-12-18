import React from 'react';
import { Users, FileText, Download, Zap } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Happy Users',
      color: 'text-blue-600'
    },
    {
      icon: FileText,
      value: '1M+',
      label: 'PDFs Processed',
      color: 'text-green-600'
    },
    {
      icon: Download,
      value: '2M+',
      label: 'Files Downloaded',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      value: '99.9%',
      label: 'Uptime',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Trusted by thousands worldwide</h3>
          <p className="text-gray-600 mt-2">Join our growing community of PDF power users</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} bg-gray-50 rounded-lg mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;