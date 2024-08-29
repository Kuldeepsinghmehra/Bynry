import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from './MapComponent';
import { fetchProfiles, reverseGeocode } from '../api/profileService';

const ProfileDetails = () => {
  const { id } = useParams(); // Get the profile ID from URL
  const [profile, setProfile] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profiles = await fetchProfiles();
        const selectedProfile = profiles.find(profile => profile.id === parseInt(id));
        if (!selectedProfile) {
          throw new Error('Profile not found');
        }
        setProfile(selectedProfile);

        const location = await reverseGeocode(selectedProfile.location.latitude, selectedProfile.location.longitude);
        setLocationName(location);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-32 h-32 rounded-full md:mr-4 mb-4 md:mb-0"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600 mt-2">{profile.description}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Location: {locationName || 'Location unavailable'}</h3>
        <MapComponent latitude={profile.location.latitude} longitude={profile.location.longitude} />
      </div>
    </div>
  );
};

export default ProfileDetails;
