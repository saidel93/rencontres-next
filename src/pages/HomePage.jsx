import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../supabaseClient';
import ProfileGrid from '../components/ProfileGrid';

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [seoMeta, setSeoMeta] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      // Load profiles, categories, cities
      const { data: profileData } = await supabase.from('Profiles').select('*');
      const { data: categoryData } = await supabase.from('Categories').select('*');
      const { data: cityData } = await supabase.from('Cities').select('*');

      setProfiles(profileData || []);
      setCategories(categoryData || []);
      setCities(cityData || []);

      // Load SEO metadata for homepage
      const { data: seo, error: seoError } = await supabase
        .from('seo_metadata')
        .select('title, description')
        .eq('type', 'homepage')
        .single();

      if (!seoError && seo) {
        setSeoMeta(seo);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoMeta.title || 'Rencontres – Rencontrez des femmes sexy'}</title>
        <meta
          name="description"
          content={
            seoMeta.description ||
            "Découvrez des profils de femmes sexy prêtes à s'amuser, discuter et plus encore."
          }
        />
      </Helmet>

      <div>
        {/* 🔥 Sexy Hero Image Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1 overflow-hidden">
          {profiles.slice(0, 18).map((profile, index) => (
            <div key={index} className="relative group">
              <img
                src={profile.image_url || '/fallback.jpg'}
                alt={profile.titre_annonce}
                className="w-full h-32 sm:h-40 object-cover group-hover:brightness-75 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold text-sm text-center px-2">
                {profile.titre_annonce}
              </div>
            </div>
          ))}
        </div>

        {/* 💖 Headline & CTA */}
        <div className="text-center my-10 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-3">
            Rencontrez des femmes sexy prêtes à s'amuser
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Parcourez les profils, trouvez votre match, et commencez une conversation excitante.
          </p>
          <a
            href="#profiles"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Voir les profils maintenant
          </a>
        </div>

        {/* 💋 Profile Grid Section */}
        <div id="profiles" className="px-4">
          <ProfileGrid
            profiles={profiles}
            categories={categories}
            cities={cities}
            onAddProfile={() => {}}
            onUpdateProfile={() => {}}
            onDeleteProfile={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
