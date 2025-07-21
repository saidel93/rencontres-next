import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [metadata, setMetadata] = useState({});

  // Fetch all data from Supabase
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [{ data: profileData, error: profileError }, 
               { data: categoryData, error: categoryError }, 
               { data: cityData, error: cityError }] = await Promise.all([
          supabase.from('profiles').select('*'),
          supabase.from('Categories').select('*'),
          supabase.from('Cities').select('*')
        ]);

        console.log('✅ rofiles:', profileData);
        console.log('✅ Categories:', categoryData);
        console.log('✅ Cities:', cityData);

        if (profileError) throw profileError;
        if (categoryError) throw categoryError;
        if (cityError) throw cityError;

        setProfiles(profileData || []);
        setCategories(categoryData || []);
        setCities(cityData || []);

      } catch (err) {
        console.error('❌ Error fetching data from Supabase:', err.message);
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        profiles,
        setProfiles,
        categories,
        setCategories,
        cities,
        setCities,
        metadata,
        setMetadata
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
