import React from 'react';
import { Shield, Lock, Trash2, Eye } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-xl text-gray-600">
            We take your privacy seriously. Here's how we protect your data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">
                Secure Processing
              </h3>
            </div>
            <p className="text-gray-700">
              All files are processed using secure HTTPS connections. Your data is encrypted during transmission and processing.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">
                No Data Storage
              </h3>
            </div>
            <p className="text-gray-700">
              We don't store your files on our servers. Files are processed in memory and immediately discarded after completion.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">
                Auto Deletion
              </h3>
            </div>
            <p className="text-gray-700">
              Any temporary files created during processing are automatically deleted within 1 hour, usually immediately after download.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-900">
                No Tracking
              </h3>
            </div>
            <p className="text-gray-700">
              We don't track your activity or collect personal information. No cookies, no analytics, no third-party tracking.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy Details</h3>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Information We Collect</h4>
              <p>
                We only collect the files you upload for processing. We do not collect any personal information, 
                email addresses, or user accounts. No registration is required to use our services.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">How We Use Your Files</h4>
              <p>
                Your files are used solely for the purpose of providing the requested PDF processing service. 
                Files are processed on our secure servers and are never shared with third parties, viewed by our staff, 
                or used for any purpose other than the service you requested.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Data Retention</h4>
              <p>
                We do not retain your files. Uploaded files are processed immediately and deleted from our servers 
                within 1 hour of upload. In most cases, files are deleted immediately after you download the processed result.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Security Measures</h4>
              <p>
                We implement industry-standard security measures including HTTPS encryption, secure file handling, 
                and regular security audits. Our servers are protected by firewalls and access controls.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Services</h4>
              <p>
                We do not use third-party analytics, advertising, or tracking services. Your privacy is our priority, 
                and we don't share any data with external parties.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Your Rights</h4>
              <p>
                Since we don't store any personal data or files, there is no data to access, modify, or delete. 
                You maintain complete control over your files at all times.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h4>
              <p>
                If you have any questions about our privacy practices, please contact us through our GitHub repository 
                or open an issue for discussion.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;