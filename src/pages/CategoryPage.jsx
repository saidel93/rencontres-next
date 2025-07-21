import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProfileCard from '../components/ProfileCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: category, error: catError } = await supabase
          .from('Categories')
          .select('*')
          .eq('slug', slug)
          .single();

        if (catError || !category) {
          setErrorMsg("Catégorie introuvable.");
          setLoading(false);
          return;
        }

        setCategoryData(category);

        const { data: profileList, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('category_id', category.id)
          .limit(10);

        if (profileError) {
          setErrorMsg("Impossible de charger les profils.");
        } else {
          setProfiles(profileList);
        }

        const { data: cityList } = await supabase.from('Cities').select('*');
        if (cityList) setCities(cityList);
      } catch (e) {
        console.error(e);
        setErrorMsg("Erreur inconnue.");
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center text-lg font-semibold mt-8">Chargement...</p>;

  if (errorMsg) {
    return (
      <div className="text-center text-red-600 mt-8">
        <h2 className="text-xl font-bold mb-2">Erreur</h2>
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-pink-600">{categoryData.title}</h1>
      <p className="mb-4 text-center text-gray-700">{categoryData.description}</p>

      {categoryData.content && (
        <div
          className="prose prose-pink prose-sm sm:prose-base mb-8 mx-auto"
          dangerouslySetInnerHTML={{ __html: categoryData.content }}
        />
      )}

      <h2 className="text-2xl font-semibold mb-4">Profils en vedette</h2>

      {profiles.length === 0 ? (
        <p className="text-center text-gray-600">Aucun profil trouvé dans cette catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              cities={cities}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          to={`/category/${slug}`}
          className="inline-block px-6 py-2 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition"
        >
          Voir tous les profils
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
