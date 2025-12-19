import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonTable: React.FC = () => {
  const features = [
    { name: 'Free to use', us: true, others: false },
    { name: 'No registration required', us: true, others: false },
    { name: 'No file size limits', us: true, others: false },
    { name: 'No watermarks', us: true, others: false },
    { name: 'Unlimited conversions', us: true, others: false },
    { name: 'Fast processing', us: true, others: true },
    { name: 'Secure & private', us: true, others: true },
    { name: 'Mobile friendly', us: true, others: true },
    { name: 'Open source', us: true, others: false },
    { name: 'No ads', us: true, others: false }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600">
            Compare us with other PDF tools
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                  PDF Tools (Us)
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Other Tools
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.us ? (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.others ? (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <X className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Join thousands of users who switched to our free PDF tools
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Free Forever</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Hidden Fees</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Unlimited Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;