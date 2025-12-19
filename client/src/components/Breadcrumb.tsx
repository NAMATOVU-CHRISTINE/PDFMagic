import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {showHome && (
        <>
          <a href="/" className="text-gray-500 hover:text-gray-700">
            <Home className="h-4 w-4" />
          </a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </>
      )}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <a href={item.href} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;