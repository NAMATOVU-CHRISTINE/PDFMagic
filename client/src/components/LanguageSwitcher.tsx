import React from 'react';

interface LanguageSwitcherProps {
  current: string;
  onChange: (lang: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ current, onChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <select value={current} onChange={(e) => onChange(e.target.value)} className="px-3 py-2 border rounded">
      {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
    </select>
  );
};

export default LanguageSwitcher;
