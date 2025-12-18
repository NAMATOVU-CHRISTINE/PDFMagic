import React from 'react';
import { FileText, Github, Star } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">{APP_CONFIG.name}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{APP_CONFIG.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hidden sm:inline">
              v{APP_CONFIG.version}
            </span>
            
            <a
              href={APP_CONFIG.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </a>
            
            <a
              href={`${APP_CONFIG.repository}/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Star</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;