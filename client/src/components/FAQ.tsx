import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is it really free to use?',
      answer: 'Yes! All our PDF tools are completely free to use. There are no hidden fees, no registration required, and no limits on the number of files you can process.'
    },
    {
      question: 'Are my files secure and private?',
      answer: 'Absolutely. Your files are processed securely on our servers and are automatically deleted after processing. We never store, share, or access your personal documents.'
    },
    {
      question: 'What file size limits do you have?',
      answer: 'We support PDF files up to 50MB, images up to 10MB, and Word documents up to 25MB. For most use cases, these limits are more than sufficient.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account creation is required. You can use all our tools immediately without any registration or personal information.'
    },
    {
      question: 'What browsers are supported?',
      answer: 'Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. The interface is also fully responsive and works on mobile devices.'
    },
    {
      question: 'Can I process multiple files at once?',
      answer: 'Yes! For tools like merge PDF and images to PDF, you can upload and process multiple files simultaneously. The split tool works on one PDF at a time.'
    },
    {
      question: 'Do you add watermarks to processed files?',
      answer: 'No, we never add watermarks to your processed files. The output files are clean and ready to use without any branding or modifications.'
    },
    {
      question: 'How long are files stored on your servers?',
      answer: 'Files are automatically deleted from our servers within 1 hour of processing. In most cases, they are removed immediately after you download them.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our PDF tools
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="https://github.com/NAMATOVU-CHRISTINE/PDFMagic/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;