import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const RedirectById = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('slug')
        .eq('id', id)
        .single();

      if (data?.slug) {
        navigate(`/profile/${data.slug}`, { replace: true });
      } else {
        // Handle if slug not found or invalid ID
        navigate('/', { replace: true });
      }
    };

    fetchAndRedirect();
  }, [id, navigate]);

  return null;
};

export default RedirectById;
