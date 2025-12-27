import React from 'react';

interface Tab { id: string; label: string; }

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  darkMode?: boolean;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, darkMode = false }) => {
  return (
    <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
