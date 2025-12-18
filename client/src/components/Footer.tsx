import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{APP_CONFIG.name}</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Free online PDF tools to merge, split, compress, and convert PDF files. 
              Built with modern web technologies for the best user experience.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={APP_CONFIG.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              PDF Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Merge PDF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Split PDF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Compress PDF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Rotate PDF</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Convert Files</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
              <li><a href={`${APP_CONFIG.repository}/issues`} className="text-gray-600 hover:text-gray-900 transition-colors">Report Bug</a></li>
              <li><a href={`${APP_CONFIG.repository}/blob/main/CONTRIBUTING.md`} className="text-gray-600 hover:text-gray-900 transition-colors">Contribute</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} {APP_CONFIG.name}. Made with{' '}
              <Heart className="inline h-4 w-4 text-red-500" />{' '}
              by {APP_CONFIG.author}
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              Open source • Free forever • No registration required
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;