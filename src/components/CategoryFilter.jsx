import React, { useState } from 'react';
import { useData } from './DataManager';

const CategoryFilter = ({ onFilter }) => {
  const { categories } = useData();
  const [selected, setSelected] = useState('all');

  const handleChange = (category) => {
    setSelected(category);
    onFilter(category);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      <button
        onClick={() => handleChange('all')}
        className={`px-3 py-1 rounded ${selected === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.name)}
          className={`px-3 py-1 rounded ${selected === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
