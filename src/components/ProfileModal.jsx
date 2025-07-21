
import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Edit2, Save, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from './DataManager';


const ProfileModal = ({ profile, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const { cities, categories } = useData();



  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name,
        age: profile.age,
        city: profile.city,
        category: profile.category,
        bio: profile.bio,
        interests: profile.interests.join(', ')
      });
    }
  }, [profile]);

  const handleSave = () => {
    const updatedProfile = {
      ...editData,
      interests: editData.interests.split(',').map(i => i.trim()).filter(i => i)
    };
    onUpdate(profile.id, updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: profile.name,
      age: profile.age,
      city: profile.city,
      category: profile.category,
      bio: profile.bio,
      interests: profile.interests.join(', ')
    });
    setIsEditing(false);
  };

  if (!profile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
              >
                <X size={20} className="text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {isEditing ? (
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-transparent text-white border-none outline-none"
                    >
                     {categories.map(cat => (
  <option key={cat.id} value={cat.name} className="text-black">{cat.name}</option>
))}

                    </select>
                  ) : (
                    profile.category
                  )}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-pink-300 outline-none bg-transparent w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.age}
                          onChange={(e) => setEditData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                          className="w-16 border-b border-pink-300 outline-none bg-transparent"
                        />
                      ) : (
                        <span>{profile.age} ans</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {isEditing ? (
                        <select
                          value={editData.city}
                          onChange={(e) => setEditData(prev => ({ ...prev, city: e.target.value }))}
                          className="border-b border-pink-300 outline-none bg-transparent"
                        >
                          {cities.map(city => (
  <option key={city.id} value={city.name}>{city.name}</option>
))}

                        </select>
                      ) : (
                        <span>{profile.city}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">À propos</h3>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full p-3 border border-pink-300 rounded-lg outline-none focus:border-pink-500 resize-none"
                    rows="3"
                  />
                ) : (
                  <p className="text-gray-700">{profile.bio}</p>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Centres d'intérêt</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.interests}
                    onChange={(e) => setEditData(prev => ({ ...prev, interests: e.target.value }))}
                    className="w-full p-3 border border-pink-300 rounded-lg outline-none focus:border-pink-500"
                    placeholder="Séparez les centres d'intérêt par des virgules"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => window.open('https://t.mbdaad.link/341603/5165?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN', '_blank')}
                  className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                >
                  Connecter ou Envoyer un Message
                </button>
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Ajouter aux Favoris
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
