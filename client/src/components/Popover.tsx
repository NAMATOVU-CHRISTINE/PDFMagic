import React, { useState, useRef } from 'react';

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border">
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
