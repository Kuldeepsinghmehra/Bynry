
import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={profile.photo} alt={profile.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{profile.name}</div>
        <p className="text-gray-700 text-base">{profile.description}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
