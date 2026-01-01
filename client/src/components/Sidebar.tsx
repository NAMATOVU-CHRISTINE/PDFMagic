import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, isOpen = true }) => {
  return (
    <aside className={`w-64 bg-gray-100 p-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
      {children}
    </aside>
  );
};

export default Sidebar;
