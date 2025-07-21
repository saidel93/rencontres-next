import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AllCategoriesPage = () => {
  const [categoriesWithProfiles, setCategoriesWithProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: categories, error: catError } = await supabase.from('Categories').select('*');

      if (!catError && categories) {
        const validCategories = categories.filter(cat => cat.title);

        const categoriesWithProfiles = await Promise.all(
          validCategories.map(async (cat) => {
            const { data: profiles, error: profError } = await supabase
              .from('profiles')
              .select('id, name, age, image_url')
              .eq('category_id', cat.id)
              .limit(10);

            return {
              ...cat,
              profiles: profError ? [] : profiles,
            };
          })
        );

        setCategoriesWithProfiles(categoriesWithProfiles);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Toutes les Catégories</h1>

      {categoriesWithProfiles.map((category) => (
        <div key={category.id} className="mb-10 p-4 bg-pink-50 rounded-lg shadow">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-semibold text-pink-600">{category.title}</h2>
            <Link
              to={`/category/${category.slug}`}
              className="text-sm text-pink-600 hover:underline"
            >
              Voir tous les profils →
            </Link>
          </div>

          {category.description && (
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
          )}

          {category.profiles.length === 0 ? (
            <p className="text-gray-500 italic">Aucun profil pour le moment.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {category.profiles.map((profile) => (
                <Link
                  key={profile.id}
                  to={`/profile/${profile.id}`}
                  className="bg-white p-3 rounded shadow hover:shadow-md transition"
                >
                  <img
                    src={profile.image_url}
                    alt={profile.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="text-sm font-bold text-gray-800">{profile.name}</h3>
                  <p className="text-xs text-gray-600">{profile.age} ans</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllCategoriesPage;
