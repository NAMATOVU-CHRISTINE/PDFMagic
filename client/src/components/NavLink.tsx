import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <a href={href} className={`px-4 py-2 rounded-lg transition-colors ${active ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
      {children}
    </a>
  );
};

export default NavLink;
