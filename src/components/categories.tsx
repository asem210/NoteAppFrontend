import React from 'react';
import { Category } from '../entities/notes';

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryName: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-teal-700 mb-2">My notes</h2>
      <div className="flex gap-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-6 py-3 rounded-lg text-white font-semibold text-lg transition duration-300 ${
              selectedCategory === category.name
                ? 'bg-teal-700 hover:bg-teal-600'
                : 'bg-teal-500 hover:bg-teal-400'
            }`}
            onClick={() => onCategorySelect(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
