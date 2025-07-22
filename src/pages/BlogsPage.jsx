import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../supabaseClient';

const BlogsPage = () => {
  const [seoMeta, setSeoMeta] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchSEO = async () => {
      const { data, error } = await supabase
        .from('seo_metadata')
        .select('title, description')
        .eq('type', 'blogs')
        .eq('slug', 'main') // or null if you prefer
        .single();

      if (!error && data) {
        setSeoMeta(data);
      }
    };

    fetchSEO();
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoMeta.title || 'SEO Blogs – Rencontres'}</title>
        <meta
          name="description"
          content={
            seoMeta.description ||
            'Découvrez nos meilleurs articles SEO et contenus pour booster votre trafic, vos conversions et vos revenus.'
          }
        />
      </Helmet>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">SEO Blogs</h1>
        <p className="text-gray-600 mb-4">
          This is where your SEO articles or affiliate content will appear.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Blog 1 - Coming soon...</li>
          <li>Blog 2 - Coming soon...</li>
        </ul>
      </div>
    </>
  );
};

export default BlogsPage;
