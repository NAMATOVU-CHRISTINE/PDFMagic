import React from 'react';

interface OverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ isVisible, onClick, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={onClick}>
      {children}
    </div>
  );
};

export default Overlay;
