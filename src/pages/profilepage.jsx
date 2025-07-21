import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '../supabaseClient';

const ProfilePage = () => {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setNotFound(false);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error('Error fetching profile by slug:', error);
        setNotFound(true);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Chargement du profil...</div>;
  }

  if (notFound) {
    return <div className="p-8 text-center text-red-500">Profil non trouvé.</div>;
  }

  const metaDescription = profile.description
    ?.split(' ')
    .slice(0, 25)
    .join(' ') + '...';

  return (
    <>
      <Helmet>
        <title>{profile.title}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">{profile.title}</h1>
        <img
          src={profile.image_url || 'https://via.placeholder.com/400x300'}
          alt={profile.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p><strong>Âge:</strong> {profile.age}</p>
        <p><strong>Ville:</strong> {profile.city}</p>
        <p><strong>Catégorie:</strong> {profile.category}</p>
        <p className="mt-4">{profile.description}</p>
        <a
          href={profile.affiliate_link || 'https://t.mbdaad.link/default'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Contactez-moi
        </a>
      </div>
    </>
  );
};

export default ProfilePage;
