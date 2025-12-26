import React from 'react';
import { FileText, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onLogoClick }) => {
  return (
    <header
      className={`shadow-sm border-b sticky top-0 z-50 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onLogoClick}
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              aria-label="Go to home"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                PDF Magic
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            
            <button
              className={`font-medium ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
