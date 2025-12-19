import React from 'react';
import { Upload, Settings, Download, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Files',
      description: 'Drag and drop your PDF files or click to browse. Select one or multiple files depending on the tool.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Settings,
      title: 'Choose Your Tool',
      description: 'Select from merge, split, compress, rotate, or convert. Each tool is optimized for specific tasks.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Process Files',
      description: 'Click the process button and wait a few seconds. Our servers handle the heavy lifting quickly.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Download,
      title: 'Download Result',
      description: 'Download your processed files instantly. Files are automatically deleted from our servers.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Process your PDFs in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-300 z-0"></div>
                )}
                
                <div className="relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${step.color} p-4 rounded-full mb-4 relative`}>
                      <Icon className="h-8 w-8" />
                      <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to get started?
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Try It Now - It's Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;