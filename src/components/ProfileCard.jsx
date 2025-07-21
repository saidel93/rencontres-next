import React from 'react';
import { MapPin, Edit, Trash2, Heart, Ghost, Phone, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, cities = [], onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this profile?')) {
      onDelete();
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const stored = localStorage.getItem('favoris') || '[]';
    const favoris = JSON.parse(stored);

    const alreadyAdded = favoris.find((p) => p.id === profile.id);
    if (!alreadyAdded) {
      favoris.push(profile);
      localStorage.setItem('favoris', JSON.stringify(favoris));
    }

    navigate('/favoris');
  };

  const interests = Array.isArray(profile.interests)
    ? profile.interests
    : typeof profile.interests === 'string'
    ? profile.interests.split(',').map((i) => i.trim()).filter(Boolean)
    : [];

  const loisirsList = profile.loisirs
    ? profile.loisirs.split(' ').slice(0, 3)
    : [];

  const maskSnapchat = (snap) => (snap ? '****' + snap.slice(-3) : null);
  const maskWhatsapp = (num) => (num ? '****' + num.slice(-3) : null);
  const cityName = cities.find((c) => c.id === profile.city_id)?.name || '';
  const categoryName = profile.Categories?.name || '';

  return (
    <Link to={`/profile/${profile.slug}`}>
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <img
            src={profile.image_url || '/fallback.jpg'}
            alt={profile.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Edit size={16} className="text-gray-700" />
            </button>
            <button
              onClick={handleDelete}
              className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>

          {categoryName && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-gray-900 line-clamp-1">
              {profile.titre_annonce}
            </h2>
            {profile.age && (
              <span className="text-pink-600 font-semibold text-sm">{profile.age} ans</span>
            )}
          </div>

          {cityName && (
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">{cityName}</span>
            </div>
          )}

          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{profile.description}</p>

          <div className="space-y-2 text-sm text-gray-700 mb-3">
            {profile.snapchat && (
              <div className="flex items-center gap-1">
                <Ghost size={14} className="text-yellow-500" />
                <span>Snapchat: {maskSnapchat(profile.snapchat)}</span>
              </div>
            )}
            {profile.whatsapp && (
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-green-600" />
                <span>WhatsApp: {maskWhatsapp(profile.whatsapp)}</span>
              </div>
            )}
            {loisirsList.length > 0 && (
              <div className="flex items-center gap-2">
                <Smile size={14} className="text-blue-500" />
                <div className="flex flex-wrap gap-1">
                  {loisirsList.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {interests.length > 3 && (
              <span className="text-gray-500 text-xs px-2 py-1">
                +{interests.length - 3} autres
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-pink-600 font-medium text-sm">Voir le profil</span>
            <div
              className="bg-pink-50 p-2 rounded-full hover:bg-pink-100 cursor-pointer transition"
              onClick={handleHeartClick}
              title="Ajouter aux favoris"
            >
              <Heart size={16} className="text-pink-600" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProfileCard;
