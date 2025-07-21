import React, { useState } from 'react';
import { Settings, Users, Tag, MapPin, FileText, Eye, EyeOff, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from './DataManager';


const AdminPanel = ({ profiles, setProfiles, categories, setCategories, cities, setCities, metadata, setMetadata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profiles');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingProfile, setEditingProfile] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingCity, setEditingCity] = useState(null);
  const [newItem, setNewItem] = useState('');

  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  const addProfile = () => {
    const newProfile = {
      id: Date.now(),
      name: 'Nouveau Profil',
      age: 25,
      city: cities[0] || 'Québec',
      category: categories[0] || 'femme cherche amour',
      bio: 'Nouvelle bio à modifier...',
      interests: ['Nouveau', 'Intérêt'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
      whatsapp: '**99',
      snapchat: '@nouveau',
      status: 'Célibataire',
      tags: ['nouveau']
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const updateProfile = (id, updatedData) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    setEditingProfile(null);
  };

  const deleteProfile = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce profil?')) {
      setProfiles(prev => prev.filter(p => p.id !== id));
    }
  };

  const addCategory = () => {
    if (newItem.trim() && !categories.includes(newItem.trim())) {
      setCategories(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const deleteCategory = (category) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      setCategories(prev => prev.filter(c => c !== category));
    }
  };

  const addCity = () => {
    if (newItem.trim() && !cities.includes(newItem.trim())) {
      setCities(prev => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const deleteCity = (city) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ville?')) {
      setCities(prev => prev.filter(c => c !== city));
    }
  };

  const updateMetadata = (field, value) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-6xl h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {!isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                      placeholder="Entrez le mot de passe"
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Se connecter
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profiles')}
                    className={`w-full text-left p-3 rounded flex items-center space-x-2 ${activeTab === 'profiles' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <Users size={20} />
                    <span>Profils ({profiles.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className={`w-full text-left p-3 rounded flex items-center space-x-2 ${activeTab === 'categories' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <Tag size={20} />
                    <span>Catégories ({categories.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cities')}
                    className={`w-full text-left p-3 rounded flex items-center space-x-2 ${activeTab === 'cities' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <MapPin size={20} />
                    <span>Villes ({cities.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('metadata')}
                    className={`w-full text-left p-3 rounded flex items-center space-x-2 ${activeTab === 'metadata' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <FileText size={20} />
                    <span>Métadonnées</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 rounded hover:bg-red-600 text-red-300 mt-8"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!isAuthenticated ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <EyeOff size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Accès restreint</h3>
                  <p className="text-gray-500">Veuillez vous connecter pour accéder au panneau d'administration</p>
                </div>
              ) : (
                <div>
                  {activeTab === 'profiles' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Gestion des Profils</h3>
                        <button
                          onClick={addProfile}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus size={20} />
                          <span>Ajouter un profil</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profiles.map(profile => (
                          <div key={profile.id} className="bg-white border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => setEditingProfile(profile)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => deleteProfile(profile.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{profile.age} ans • {profile.city}</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{profile.bio}</p>
                            <div className="mt-2">
                              <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                                {profile.category}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'categories' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h3>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Nouvelle catégorie"
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <button
                            onClick={addCategory}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center">
                            <span className="font-medium text-gray-900">{category}</span>
                            <button
                              onClick={() => deleteCategory(category)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'cities' && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Gestion des Villes</h3>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Nouvelle ville"
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          />
                          <button
                            onClick={addCity}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cities.map((city, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center">
                            <span className="font-medium text-gray-900">{city}</span>
                            <button
                              onClick={() => deleteCity(city)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'metadata' && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Métadonnées du Site</h3>
                      <div className="space-y-6 max-w-2xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Titre du site</label>
                          <input
                            type="text"
                            value={metadata.title}
                            onChange={(e) => updateMetadata('title', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={metadata.description}
                            onChange={(e) => updateMetadata('description', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none resize-none"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mots-clés</label>
                          <input
                            type="text"
                            value={metadata.keywords}
                            onChange={(e) => updateMetadata('keywords', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Profile Edit Modal */}
      <AnimatePresence>
          {editingProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Modifier le Profil</h3>
                  <button
                    onClick={() => setEditingProfile(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingProfile.name}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                      <input
                        type="number"
                        value={editingProfile.age}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                      <select
                        value={editingProfile.city}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {cities.map(city => (
                          <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                      <select
                        value={editingProfile.category}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={editingProfile.bio}
                      onChange={(e) => setEditingProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded resize-none"
                      rows="4"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      <input
                        type="text"
                        value={editingProfile.whatsapp || ''}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="**99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Snapchat</label>
                      <input
                        type="text"
                        value={editingProfile.snapchat || ''}
                        onChange={(e) => setEditingProfile(prev => ({ ...prev, snapchat: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="@username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select
                      value={editingProfile.status || 'Célibataire'}
                      onChange={(e) => setEditingProfile(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Célibataire">Célibataire</option>
                      <option value="Mariée">Mariée</option>
                      <option value="C'est compliqué">C'est compliqué</option>
                    </select>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => setEditingProfile(null)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => updateProfile(editingProfile.id, editingProfile)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default AdminPanel;