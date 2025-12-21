import React from 'react';
import { Shield, Zap, Globe, Lock } from 'lucide-react';

const FeatureHighlight: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Files are encrypted and deleted after processing'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized servers'
    },
    {
      icon: Globe,
      title: 'Works Anywhere',
      description: 'Access from any device with a web browser'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'No registration required, completely anonymous'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 mt-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;