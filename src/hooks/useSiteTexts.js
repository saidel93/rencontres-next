import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const useSiteTexts = (page, language = 'fr') => {
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTexts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_texts')
        .select('section, key, value')
        .eq('page', page)
        .eq('language', language);

      if (error) {
        console.error('Error loading site texts:', error.message);
        setLoading(false);
        return;
      }

      // Organize data like texts[section][key] = value
      const organized = {};
      data.forEach(({ section, key, value }) => {
        if (!organized[section]) organized[section] = {};
        organized[section][key] = value;
      });

      setTexts(organized);
      setLoading(false);
    };

    fetchTexts();
  }, [page, language]);

  return { texts, loading };
};

export default useSiteTexts;
