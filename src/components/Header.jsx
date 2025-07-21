import React, { useState, useEffect } from 'react';
import { Menu, Heart, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Header = ({ setSidebarOpen }) => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: catData } = await supabase.from('Categories').select('*');
      const { data: cityData } = await supabase.from('Cities').select('*');
      if (catData) setCategories(catData);
      if (cityData) setCities(cityData);
    };
    fetchData();
  }, []);

  const navLinkClass = (path) =>
    `text-gray-700 hover:text-pink-600 font-medium transition-colors ${
      location.pathname === path ? 'text-pink-600 font-semibold' : ''
    }`;

  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <motion.header
      className="bg-white shadow-lg sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Sidebar */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="text-pink-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">RencontresQuébec</h1>
            </div>
          </div>

          {/* Right: Navigation */}
          <nav className="hidden md:flex space-x-6 relative items-center">
            <Link to="/" className={navLinkClass('/')}>Parcourir</Link>
            <Link to="/swipe" className={navLinkClass('/swipe')}>Swipe</Link>

            {/* Catégories with dropdown and link */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <Link
                to="/categories"
                className="flex items-center text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Catégories
                <ChevronDown size={18} className="ml-1" />
              </Link>
              {showCategoryDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50">
                  {categories.map((cat) => (
                    <Link
                      to={`/category/${slugify(cat.name)}`}
                      key={cat.id}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Villes with dropdown and link */}
            <div
              className="relative"
              onMouseEnter={() => setShowCityDropdown(true)}
              onMouseLeave={() => setShowCityDropdown(false)}
            >
              <Link
                to="/cities"
                className="flex items-center text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Villes
                <ChevronDown size={18} className="ml-1" />
              </Link>
              {showCityDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50">
                  {cities.map((city) => (
                    <Link
                      to={`/city/${slugify(city.name)}`}
                      key={city.id}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 transition"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blogs" className={navLinkClass('/blogs')}>Blogs</Link>

            {/* ✅ Favoris Link */}
            <Link
              to="/favoris"
              className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium hover:bg-pink-200 transition"
            >
              ❤️ Favoris
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
