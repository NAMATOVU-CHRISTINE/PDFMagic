import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, position = 'right', children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`absolute top-0 h-full w-80 bg-white p-6 ${position === 'left' ? 'left-0' : 'right-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
