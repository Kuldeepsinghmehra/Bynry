import React, { useState, useEffect } from 'react';
import { fetchProfiles, updateProfile, addProfile, deleteProfile, reverseGeocode } from '../api/profileService';
import LoadingIndicator from './LoadingIndicator';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfile, setNewProfile] = useState({ name: '', description: '', location: { latitude: '', longitude: '' } });
  const [editProfile, setEditProfile] = useState(null);
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    const getProfiles = async () => {
      const profileData = await fetchProfiles();
      setProfiles(profileData);
      setLoading(false);


      const locationPromises = profileData.map(profile =>
        reverseGeocode(profile.location.latitude, profile.location.longitude)
      );
      const locations = await Promise.all(locationPromises);

      const locationMapping = profileData.reduce((acc, profile, index) => {
        acc[profile.id] = locations[index];
        return acc;
      }, {});

      setLocationNames(locationMapping);
    };

    getProfiles();
  }, []);

  const handleAdd = async () => {
    if (newProfile.name && newProfile.description) {
      const addedProfile = await addProfile(newProfile);
      setProfiles([...profiles, addedProfile]);
      setNewProfile({ name: '', description: '', location: { latitude: '', longitude: '' } });
    }
  };

  const handleUpdate = async () => {
    if (editProfile) {
      const updatedProfile = await updateProfile(editProfile);
      setProfiles(profiles.map(profile => profile.id === updatedProfile.id ? updatedProfile : profile));
      setEditProfile(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteProfile(id);
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewProfile(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
  };
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Panel</h1>
      
      {/* Add Profile Form */}
      <div className="mb-8 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
        <h2 className="text-3xl font-semibold mb-6">Add New Profile</h2>
        <input
          type="text"
          name="name"
          value={newProfile.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          name="description"
          value={newProfile.description}
          onChange={handleChange}
          placeholder="Description"
          className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="latitude"
          value={newProfile.location.latitude}
          onChange={handleLocationChange}
          placeholder="Latitude"
          className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="longitude"
          value={newProfile.location.longitude}
          onChange={handleLocationChange}
          placeholder="Longitude"
          className="block w-full mb-6 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button onClick={handleAdd} className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">Add Profile</button>
      </div>

      {/* Update Profile Form */}
      {editProfile && (
        <div className="mb-8 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
          <h2 className="text-3xl font-semibold mb-6">Edit Profile</h2>
          <input
            type="text"
            value={editProfile.name}
            onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editProfile.description}
            onChange={(e) => setEditProfile(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="latitude"
            value={editProfile.location.latitude}
            onChange={(e) => setEditProfile(prev => ({ ...prev, location: { ...prev.location, latitude: e.target.value } }))}
            placeholder="Latitude"
            className="block w-full mb-3 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="longitude"
            value={editProfile.location.longitude}
            onChange={(e) => setEditProfile(prev => ({ ...prev, location: { ...prev.location, longitude: e.target.value } }))}
            placeholder="Longitude"
            className="block w-full mb-6 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleUpdate} className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">Update Profile</button>
        </div>
      )}

      {/* Profiles List */}
      {profiles.map(profile => (
        <div key={profile.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
          <p className="text-gray-700 mb-2">{profile.description}</p>
          <p className="text-gray-600 mb-4">Location: {locationNames[profile.id] || `${profile.location.latitude}, ${profile.location.longitude}`}</p>
          <div className="flex space-x-2">
            <button onClick={() => setEditProfile(profile)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">Edit</button>
            <button onClick={() => handleDelete(profile.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
