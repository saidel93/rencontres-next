import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const CitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [profilesByCity, setProfilesByCity] = useState({});

  useEffect(() => {
    const fetchCitiesAndProfiles = async () => {
      const { data: cityData, error: cityError } = await supabase.from('Cities').select('*');
      if (cityError) {
        console.error('Error fetching cities:', cityError);
        return;
      }
      setCities(cityData);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*');

      if (profileError) {
        console.error('Error fetching profiles:', profileError);
        return;
      }

      // Group profiles by city slug
      const grouped = {};
      for (const city of cityData) {
        const slug = slugify(city.name);
        grouped[slug] = profileData
          .filter((p) => p.city?.toLowerCase() === city.name.toLowerCase())
          .slice(0, 5); // show only first 5
      }

      setProfilesByCity(grouped);
    };

    fetchCitiesAndProfiles();
  }, []);

  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Découvrez les profils par ville</h1>
      {cities.map((city) => {
        const slug = slugify(city.name);
        const cityProfiles = profilesByCity[slug] || [];

        return (
          <div key={city.id} className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-pink-700">{city.name}</h2>
              <Link
                to={`/city/${slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Voir plus &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cityProfiles.length === 0 ? (
                <p className="text-gray-500 col-span-full">Aucun profil trouvé pour cette ville.</p>
              ) : (
                cityProfiles.map((profile) => (
                  <div key={profile.id} className="text-center">
                    <img
                      src={profile.image_url || '/placeholder.jpg'}
                      alt={profile.name}
                      className="w-20 h-20 object-cover rounded-full mx-auto mb-2 border border-pink-300"
                    />
                    <p className="text-sm font-medium">{profile.name}</p>
                    <p className="text-xs text-gray-500">Âge: {profile.age}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CitiesPage;
