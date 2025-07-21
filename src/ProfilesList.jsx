import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // ✅ Adjust this if your file path differs

const ProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.error('❌ Error fetching profiles:', error.message);
    } else {
      setProfiles(data);
    }

    setLoading(false);
  };

  if (loading) return <p>Chargement des profils...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🔥 Tous les Profils</h2>

      {profiles.length === 0 ? (
        <p>Aucun profil trouvé</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {profiles.map((profile) => (
            <div
              key={profile.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '220px',
                borderRadius: '8px',
                background: '#fff',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={profile.image_url || 'https://via.placeholder.com/220x150?text=No+Image'}
                alt={profile.name || 'Profil'}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
              />
              <h3 style={{ margin: '10px 0 5px' }}>{profile.name}</h3>
              <p style={{ fontSize: '14px', margin: '0 0 5px' }}>{profile.description}</p>
              <p style={{ fontSize: '13px', color: '#666' }}>
                Catégorie: <strong>{profile.Categories?.name || 'Inconnue'}</strong>
              </p>
              <p style={{ fontSize: '13px', color: '#666' }}>
                Ville: <strong>{profile.Cities?.name || 'Inconnue'}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesList;
