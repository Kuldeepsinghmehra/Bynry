import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfiles } from '../api/profileService';

const ProfileDetailsExtended = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profiles = await fetchProfiles();
      const foundProfile = profiles.find(profile => profile.id === parseInt(id));
      setProfile(foundProfile);
    };

    getProfile();
  }, [id]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  const { name, photo, description, email, phone, interests, social } = profile;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="flex justify-start mt-4">
          <img src={photo} alt={name} className="w-32 h-32 object-cover rounded-full" />
        </div>
      <div className="p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mb-4">
          <p className="text-gray-700 mb-2"><strong>Email:</strong> {email}</p>
          <p className="text-gray-700 mb-2"><strong>Phone:</strong> {phone}</p>
          <p className="text-gray-700 mb-2"><strong>Interests:</strong> {interests.join(', ')}</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <strong>Twitter:</strong> @{social.twitter}
          </a>
          <a
            href={`https://${social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 md:mt-0"
          >
            <strong>LinkedIn:</strong> {social.linkedin}
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProfileDetailsExtended;
