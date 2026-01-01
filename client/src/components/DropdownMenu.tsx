import React, { useState } from 'react';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          {items.map((item, i) => (
            <button key={i} onClick={() => { item.onClick(); setIsOpen(false); }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100">{item.label}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
