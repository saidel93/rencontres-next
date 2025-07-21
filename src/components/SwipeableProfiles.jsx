import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { useNavigate } from 'react-router-dom';

const SwipeableProfiles = ({ profiles }) => {
  const [index, setIndex] = useState(profiles.length - 1);
  const [loadedProfiles, setLoadedProfiles] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (profiles.length > 0) {
      setLoadedProfiles(profiles.slice(-5));
      setIndex(profiles.length - 1);
    }
  }, [profiles]);

  const swiped = (direction, profile, idx) => {
    setSwipeDirection(direction);

    if (direction === 'right') {
      navigate(`/profile/${profile.id}`);
    }

    setTimeout(() => setSwipeDirection(''), 400); // Clear heart after animation
    setIndex(idx - 1);
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  const loadMoreProfiles = () => {
    console.log("🔁 Fetching more...");
  };

  useEffect(() => {
    if (index < 0) loadMoreProfiles();
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 relative overflow-hidden px-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Swipe right if you like ❤️<br />
          Swipe left if you want to see more ⬅️
        </h2>
      </div>

      <div className="relative w-full max-w-md h-[550px] mb-8">
        {loadedProfiles.map((profile, i) => (
          <TinderCard
            key={profile.id}
            onSwipe={(dir) => swiped(dir, profile, i)}
            onCardLeftScreen={() => outOfFrame(profile.title)}
            preventSwipe={['up', 'down']}
            className="absolute w-full h-full"
          >
            <div
              className="w-full h-full bg-white rounded-2xl shadow-xl flex flex-col justify-end overflow-hidden transform transition-transform duration-300 relative"
              style={{
                backgroundImage: `url(${profile.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Heart animation on right swipe */}
              {swipeDirection === 'right' && (
                <div className="absolute top-10 left-10 text-white text-6xl font-bold animate-ping drop-shadow-lg">
                  ❤️
                </div>
              )}
              <div className="bg-black bg-opacity-70 text-white p-4 rounded-b-2xl">
                <h2 className="text-xl font-bold">{profile.title}</h2>
                <p className="text-sm text-pink-200">{profile.city}</p>
                {profile.tags && (
                  <p className="mt-1 text-xs text-pink-300">
                    {Array.isArray(profile.tags) ? profile.tags.join(', ') : profile.tags}
                  </p>
                )}
              </div>
            </div>
          </TinderCard>
        ))}
        {index < 0 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-600">
            <p className="text-lg font-semibold">Plus de profils 🥲</p>
            <button
              onClick={loadMoreProfiles}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
            >
              Charger plus
            </button>
          </div>
        )}
      </div>

      {/* Bottom Filter + French Text */}
      <div className="w-full max-w-md bg-white rounded-xl p-4 shadow-md text-center">
        <p className="text-pink-600 font-medium text-lg">Ces femmes en attente de vos messages 💌</p>
      </div>
    </div>
  );
};

export default SwipeableProfiles;
