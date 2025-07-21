import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CityPage = () => {
  const { slug } = useParams();
  const [cityData, setCityData] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: city, error: cityError } = await supabase
        .from('Cities')
        .select('*')
        .eq('slug', slug)
        .single();

      if (cityError || !city) {
        setErrorMsg('City not found.');
        setLoading(false);
        return;
      }

      setCityData(city);

      const { data: profileList, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('city_id', city.id);

      if (profileError) {
        setErrorMsg('Could not load profiles.');
      } else {
        setProfiles(profileList);
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (errorMsg) return <div className="text-center text-red-600 mt-8">{errorMsg}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{cityData.name}</h1>

      <h2 className="text-2xl font-semibold mb-4">Profiles in {cityData.name}</h2>

      {profiles.length === 0 ? (
        <p className="text-center text-gray-700">No profiles found in this city.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white shadow-md rounded-lg p-4">
              {profile.image_url && (
                <img
                  src={profile.image_url}
                  alt={profile.name}
                  className="rounded-md w-full h-48 object-cover mb-3"
                />
              )}
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-gray-600">Age: {profile.age}</p>
              <p className="mt-2">{profile.description}</p>
              <button
                className="mt-3 text-blue-600 underline"
                onClick={() =>
                  window.open(
                    'https://t.mbdaad.link/341603/5165?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
                    '_blank'
                  )
                }
              >
                Contactez-moi
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className="prose prose-lg mx-auto mb-10"
        dangerouslySetInnerHTML={{ __html: cityData.content }}
      />
    </div>
  );
};

export default CityPage;
