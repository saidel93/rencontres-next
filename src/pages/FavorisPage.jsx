import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { supabase } from '../supabaseClient';

const FavorisPage = () => {
  const [favoris, setFavoris] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoris');
    if (stored) {
      setFavoris(JSON.parse(stored));
    }

    // Fetch cities for display
    const fetchCities = async () => {
      const { data, error } = await supabase.from('Cities').select('*');
      if (!error && data) setCities(data);
    };

    fetchCities();
  }, []);

  const removeFromFavoris = (id) => {
    const updated = favoris.filter((p) => p.id !== id);
    localStorage.setItem('favoris', JSON.stringify(updated));
    setFavoris(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Vos profils favoris</h1>

      {favoris.length === 0 ? (
        <p className="text-center text-gray-600">Aucun profil ajouté pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              cities={cities}
              onEdit={() => {}}
              onDelete={() => removeFromFavoris(profile.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavorisPage;
