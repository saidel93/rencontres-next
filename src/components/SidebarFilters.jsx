import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const SidebarFilters = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [ageRange, setAgeRange] = useState([18, 45]);

  useEffect(() => {
    const fetchFilters = async () => {
      const { data: catData } = await supabase.from('Categories').select('*');
      const { data: cityData } = await supabase.from('Cities').select('*');

      setCategories(catData || []);
      setCities(cityData || []);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      city: selectedCity,
      ageMin: ageRange[0],
      ageMax: ageRange[1],
    });
  }, [selectedCategory, selectedCity, ageRange]);

  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">Catégories</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Toutes</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Villes</h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Toutes</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2">Âge</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min="18"
            max="60"
            value={ageRange[0]}
            onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
            className="w-1/2 border rounded px-2 py-1"
          />
          <input
            type="number"
            min="18"
            max="60"
            value={ageRange[1]}
            onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
            className="w-1/2 border rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
