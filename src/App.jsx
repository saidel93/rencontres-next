import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import SwipeableProfiles from './components/SwipeableProfiles';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';
import { DataProvider, useData } from './components/DataManager';

import CategoryPage from './pages/CategoryPage';
import CityPage from './pages/CityPage';
import LegalPage from './components/LegalPage';
import AllCategoriesPage from './pages/AllCategoriesPage';
import CitiesPage from './pages/CitiesPage';
import BlogsPage from './pages/BlogsPage';
import Footer from './components/Footer';
import LegalDisclaimerModal from './components/LegalDisclaimerModal';
import HomePage from './pages/HomePage';
import FavorisPage from './pages/FavorisPage';
import ProfilePage from './pages/ProfilePage'; // ✅ ✅ ✅ THIS LINE FIXES THE ERROR

const AFFILIATE_LINK =
  'https://t.mbdaad.link/341603/5165?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN';

const AppContent = () => {
  const {
    profiles,
    setProfiles,
    categories,
    setCategories,
    cities,
    setCities,
    metadata,
    setMetadata,
  } = useData();

  const [filters, setFilters] = useState({
    city: '',
    category: '',
    ageRange: [18, 50],
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSwipeRight = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  const handleSwipeLeft = () => {
    console.log('Swiped left');
  };

  const addProfile = async (newProfile) => {
    const { data, error } = await supabase.from('profiles').insert([newProfile]);
    if (!error) setProfiles((prev) => [...prev, data[0]]);
  };

  const updateProfile = async (id, updatedProfile) => {
    const { data, error } = await supabase.from('profiles').update(updatedProfile).eq('id', id);
    if (!error) setProfiles((prev) => prev.map((p) => (p.id === id ? data[0] : p)));
  };

  const deleteProfile = async (id) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProfiles = profiles.filter((profile) => {
    if (filters.city && profile.city !== filters.city) return false;
    if (filters.category && profile.category !== filters.category) return false;
    if (profile.age < filters.ageRange[0] || profile.age > filters.ageRange[1]) return false;
    return true;
  });

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
        <LegalDisclaimerModal />
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-1">
          <FilterSidebar
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            filters={filters}
            setFilters={setFilters}
          />
          <motion.main
            className="flex-1 p-4 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    profiles={filteredProfiles}
                    categories={categories}
                    cities={cities}
                    onAddProfile={addProfile}
                    onUpdateProfile={updateProfile}
                    onDeleteProfile={deleteProfile}
                  />
                }
              />
              <Route
                path="/swipe"
                element={
                  <SwipeableProfiles
                    profiles={filteredProfiles}
                    onSwipeRight={handleSwipeRight}
                    onSwipeLeft={handleSwipeLeft}
                    affiliateLink={AFFILIATE_LINK}
                  />
                }
              />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/categories" element={<AllCategoriesPage />} />
              <Route path="/city/:slug" element={<CityPage />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/profile/:slug" element={<ProfilePage />} /> {/* ✅ Working now */}
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/favoris" element={<FavorisPage />} />
            </Routes>
          </motion.main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const App = () => (
  <DataProvider>
    <AppContent />
  </DataProvider>
);

export default App;
