import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          Cities (
            name,
            slug
          ),
          Categories (
            name
          )
        `)
        .limit(100);

      console.log("✅ Supabase response:", { data, error });

      if (error) {
        console.error('❌ Error fetching profiles:', error);
      } else {
        setProfiles(data);
      }

      setLoading(false);
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Chargement des profils...</p>;

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>🔥 Tous les Profils</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {profiles.length === 0 ? (
          <p>Aucun profil trouvé</p>
        ) : (
          profiles.map((profile) => (
            <Link
              to={`/city/${profile.Cities?.slug}`}
              key={profile.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  width: '220px',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <img
                  src={profile.image_url || 'https://via.placeholder.com/220x150?text=Profil'}
                  alt={profile.name}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                  }}
                />
                <h3>{profile.name}</h3>
                <p>Âge: {profile.age}</p>
                <p>Description: {profile.description}</p>
                <p>Ville: {profile.Cities?.name || 'Inconnue'}</p>
                <p>Catégorie: {profile.Categories?.name || 'Inconnue'}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
