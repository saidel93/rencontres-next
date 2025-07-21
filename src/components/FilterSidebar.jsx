import React from 'react';
import { X, MapPin, Users, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from './DataManager';

const FilterSidebar = ({ open, setOpen, filters, setFilters }) => {
  const { categories, cities } = useData();

  const handleCityChange = (city) => {
    setFilters(prev => ({ ...prev, city: prev.city === city ? '' : city }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category: prev.category === category ? '' : category }));
  };

  const handleAgeChange = (e, index) => {
    const newRange = [...filters.ageRange];
    newRange[index] = parseInt(e.target.value);
    setFilters(prev => ({ ...prev, ageRange: newRange }));
  };

  const clearFilters = () => {
    setFilters({ city: '', category: '', ageRange: [18, 50] });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-80 bg-white shadow-xl z-50 lg:z-auto overflow-y-auto transform transition-transform lg:transform-none ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={{ x: -320 }}
        animate={{ x: open || window.innerWidth >= 1024 ? 0 : -320 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-pink-600 hover:bg-pink-50"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Cities */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="text-pink-600" size={20} />
                <h3 className="font-semibold text-gray-900">Villes</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {cities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => handleCityChange(city.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.city === city.name
                        ? 'bg-pink-100 text-pink-800 border border-pink-300'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="text-pink-600" size={20} />
                <h3 className="font-semibold text-gray-900">Catégories</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filters.category === cat.name
                        ? 'bg-pink-100 text-pink-800 border border-pink-300'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="text-pink-600" size={20} />
                <h3 className="font-semibold text-gray-900">Tranche d’âge</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Âge minimum: {filters.ageRange[0]}</label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={filters.ageRange[0]}
                    onChange={(e) => handleAgeChange(e, 0)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Âge maximum: {filters.ageRange[1]}</label>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={filters.ageRange[1]}
                    onChange={(e) => handleAgeChange(e, 1)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Effacer tous les filtres
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default FilterSidebar;
