import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';
import ProfileModal from './ProfileModal';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const ProfileGrid = () => {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('profiles').select('*');
      if (!error) setProfiles(data);

      const { data: categoryData } = await supabase.from('Categories').select('*');
      setCategories(categoryData || []);

      const { data: cityData } = await supabase.from('Cities').select('*');
      setCities(cityData || []);
    }

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Filters & Tags */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Categories */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  to={`/category/${slugify(category.name)}`}
                  key={category.id}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm hover:bg-pink-200 transition"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Villes</h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Link
                  to={`/city/${slugify(city.name)}`}
                  key={city.id}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Blog Link */}
          <div className="mt-4">
            <Link to="/blogs" className="text-blue-600 hover:underline text-sm">
              👉 Lire nos blogs récents
            </Link>
          </div>
        </div>

        {/* Filter Box on Right */}
        <div className="bg-white p-4 rounded-xl shadow h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtres</h2>
          <label className="block text-sm mb-2">Âge minimum</label>
          <input type="range" min="18" max="60" defaultValue="18" className="w-full mb-4" />
          <label className="block text-sm mb-2">Âge maximum</label>
          <input type="range" min="18" max="60" defaultValue="50" className="w-full mb-4" />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 w-full">
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {/* Profiles */}
      {profiles.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-gray-400 mb-4">
            <Users size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun profil trouvé</h3>
          <p className="text-gray-500">Essayez d'ajuster vos filtres</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, staggerChildren: 0.1 }}
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProfileCard
                profile={profile}
                cities={cities}
                onClick={() => setSelectedProfile(profile)}
                onEdit={() => setSelectedProfile(profile)}
                onDelete={() => console.log('delete profile', profile.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onUpdate={() => console.log('update profile')}
      />
    </div>
  );
};

export default ProfileGrid;
