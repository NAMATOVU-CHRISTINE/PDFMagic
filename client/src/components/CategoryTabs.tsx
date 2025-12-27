import React from 'react';

interface Category {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  darkMode?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  darkMode = false,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
            activeCategory === category.id
              ? darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
              : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
