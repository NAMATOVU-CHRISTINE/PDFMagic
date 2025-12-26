import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

const shortcuts = [
  { keys: ['Ctrl', 'Shift', 'D'], description: 'Toggle dark mode' },
  { keys: ['Ctrl', 'H'], description: 'Go to home' },
  { keys: ['Ctrl', 'U'], description: 'Upload file' },
  { keys: ['Ctrl', 'Enter'], description: 'Process files' },
  { keys: ['Esc'], description: 'Close dialog / Go back' },
];

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  isOpen,
  onClose,
  darkMode = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`w-full max-w-md rounded-lg shadow-xl p-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        role="dialog"
        aria-labelledby="shortcuts-title"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Keyboard className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <h2
              id="shortcuts-title"
              className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
            aria-label="Close"
          >
            <X className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>

        <ul className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className={`px-2 py-1 text-xs font-mono rounded ${
                      darkMode
                        ? 'bg-gray-700 text-gray-300 border border-gray-600'
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <p className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">?</kbd> to
          toggle this help
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
