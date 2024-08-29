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
    <div className="p-4">
      <img src={photo} alt={name} className="w-48 h-48 object-cover rounded-full mb-4" />
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-600 mb-2"><strong>Email:</strong> {email}</p>
      <p className="text-gray-600 mb-2"><strong>Phone:</strong> {phone}</p>
      <p className="text-gray-600 mb-4"><strong>Interests:</strong> {interests.join(', ')}</p>
      <p className="text-gray-600 mb-2"><strong>Twitter:</strong> <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">@{social.twitter}</a></p>
      <p className="text-gray-600"><strong>LinkedIn:</strong> <a href={`https://${social.linkedin}`} target="_blank" rel="noopener noreferrer">{social.linkedin}</a></p>
    </div>
  );
};

export default ProfileDetailsExtended;
