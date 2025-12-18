import React from 'react';
import { Shield, Zap, Globe, Lock, Cloud, Smartphone } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are processed securely and deleted automatically after processing.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Advanced algorithms ensure your PDFs are processed quickly and efficiently.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Access our tools from any device with a web browser. No downloads required.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Lock,
      title: 'No Registration',
      description: 'Use all our tools without creating an account or providing personal information.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Processing',
      description: 'Powerful cloud servers handle the heavy lifting, saving your device resources.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Fully responsive design works perfectly on phones, tablets, and desktops.',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why choose our PDF tools?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most user-friendly and powerful PDF tools on the web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;