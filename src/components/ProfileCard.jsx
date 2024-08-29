import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  const { id, name, photo, description } = profile;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={photo} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link
          to={`/profile/${id}`}
          className="text-indigo-600 mt-4 inline-block"
        >
          Summary
        </Link>
        <Link
          to={`/profile/${id}/details`}
          className="text-indigo-600 mt-4 inline-block ml-4"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
