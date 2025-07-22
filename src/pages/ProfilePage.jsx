import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '../supabaseClient';
import { FaSnapchatGhost, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useData } from '../components/DataManager';

const ProfilePage = () => {
  const { slug } = useParams();
  const { categories, cities, profiles } = useData();

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

  if (loading) return <div className="p-8 text-center text-gray-500">Chargement du profil...</div>;
  if (notFound) return <div className="p-8 text-center text-red-500">Profil non trouvé.</div>;

  const metaDescription =
    profile.meta_description ||
    profile.description?.split(' ').slice(0, 25).join(' ') + '...';

  const formatPartial = (value = '') => {
    if (!value || value.length < 3) return '***';
    return '***' + value.slice(-3);
  };

  const otherProfiles = profiles
    .filter((p) => p.city === profile.city && p.slug !== slug)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{profile.meta_title || profile.title || 'Profil Sexy Québec'}</title>
        <meta
          name="description"
          content={
            metaDescription || "Découvrez ce profil sexy prêt à discuter, s’amuser et plus encore."
          }
        />
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-pink-600">❤️ Plus de Profils</h2>
          <div className="space-y-2">
            {profiles.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to={`/profile/${p.slug}`}
                className="block text-sm text-gray-700 hover:text-pink-600 underline"
              >
                {p.title}
              </Link>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-6 text-pink-500">📂 Catégories</h2>
          <ul className="text-sm space-y-1">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.slug}`} className="text-gray-700 hover:text-pink-600">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-6 text-pink-500">🏙️ Villes</h2>
          <ul className="text-sm space-y-1">
            {cities.map((c) => (
              <li key={c.id}>
                <Link to={`/city/${c.slug}`} className="text-gray-700 hover:text-pink-600">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN PROFILE */}
        <div className="col-span-1 lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
          <h1 className="text-4xl font-extrabold text-pink-700 mb-6 text-center">
            💕 {profile.title} 💕
          </h1>

          <div className="flex flex-col lg:flex-row-reverse gap-6">
            {/* Image */}
            <img
              src={profile.image_url || 'https://via.placeholder.com/300x300'}
              alt={profile.title}
              className="w-full lg:w-[300px] h-[280px] object-cover rounded-xl shadow-md"
            />

            {/* Profile Info */}
            <div className="flex-1 space-y-3">
              <p className="text-lg text-gray-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-pink-600" />
                📍 {profile.city}
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">Âge :</span> {profile.age} ans
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-gray-500">Catégorie :</span> {profile.category}
              </p>

              <div className="mt-3 space-y-2">
                {profile.snapchat && (
                  <div className="flex items-center gap-2 text-yellow-600 text-lg">
                    <FaSnapchatGhost size={22} />
                    <span className="font-mono">{formatPartial(profile.snapchat)}</span>
                    <span className="text-sm text-gray-600 ml-2 italic">
                      Laissez-moi un message si vous voulez me rejoindre. 😘
                    </span>
                  </div>
                )}
                {profile.whatsapp && (
                  <div className="flex items-center gap-2 text-green-600 text-lg">
                    <FaWhatsapp size={22} />
                    <span className="font-mono">{formatPartial(profile.whatsapp)}</span>
                    <span className="text-sm text-gray-600 ml-2 italic">
                      Laissez-moi un message si vous voulez me rejoindre. 💌
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-2">💬 À propos</h2>
            <p className="text-gray-800 font-light text-[1.15rem] leading-7 font-serif italic">
              {profile.description} 💋🔥
            </p>
          </div>

          {/* CTA button */}
          <div className="mt-6 text-center">
            <a
              href={profile.affiliate_link || 'https://t.mbdaad.link/default'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-pink-600 text-white px-10 py-3 rounded-full shadow hover:bg-pink-700 transition-all duration-300 text-xl"
            >
              ❤️ Contactez-moi maintenant
            </a>
          </div>
        </div>
      </div>

      {/* More profiles from same city */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold text-center mb-4 text-pink-700">
          💘 Vous voulez connaître d'autres femmes de {profile.city} ?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherProfiles.map((p) => (
            <Link
              to={`/profile/${p.slug}`}
              key={p.id}
              className="bg-white border border-pink-200 rounded-xl shadow-md hover:shadow-lg p-2 text-center"
            >
              <img
                src={p.image_url}
                alt={p.title}
                className="h-[160px] w-full object-cover rounded-lg mb-2"
              />
              <h3 className="text-pink-600 font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.city}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
