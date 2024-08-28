import React, { useState, useEffect } from 'react';
import { fetchProfiles, updateProfile, addProfile, deleteProfile } from '../api/profileService';
import LoadingIndicator from './LoadingIndicator';

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProfile, setNewProfile] = useState({ name: '', description: '', location: { latitude: '', longitude: '' } });
  const [editProfile, setEditProfile] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      const profileData = await fetchProfiles();
      setProfiles(profileData);
      setLoading(false);
    };

    getProfiles();
  }, []);

  const handleAdd = async () => {
    if (newProfile.name && newProfile.description) {
      await addProfile(newProfile);
      setNewProfile({ name: '', description: '', location: { latitude: '', longitude: '' } });
      const profileData = await fetchProfiles();
      setProfiles(profileData);
    }
  };

  const handleUpdate = async () => {
    if (editProfile) {
      await updateProfile(editProfile);
      setEditProfile(null);
      const profileData = await fetchProfiles();
      setProfiles(profileData);
    }
  };

  const handleDelete = async (id) => {
    await deleteProfile(id);
    const profileData = await fetchProfiles();
    setProfiles(profileData);
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
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
      
      {/* Add Profile Form */}
      <div className="mb-6 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Profile</h2>
        <input
          type="text"
          name="name"
          value={newProfile.name}
          onChange={handleChange}
          placeholder="Name"
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={newProfile.description}
          onChange={handleChange}
          placeholder="Description"
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="latitude"
          value={newProfile.location.latitude}
          onChange={handleLocationChange}
          placeholder="Latitude"
          className="block mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="longitude"
          value={newProfile.location.longitude}
          onChange={handleLocationChange}
          placeholder="Longitude"
          className="block mb-4 p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add Profile</button>
      </div>

      {/* Update Profile Form */}
      {editProfile && (
        <div className="mb-6 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <input
            type="text"
            value={editProfile.name}
            onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={editProfile.description}
            onChange={(e) => setEditProfile(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="latitude"
            value={editProfile.location.latitude}
            onChange={(e) => setEditProfile(prev => ({ ...prev, location: { ...prev.location, latitude: e.target.value } }))}
            placeholder="Latitude"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="longitude"
            value={editProfile.location.longitude}
            onChange={(e) => setEditProfile(prev => ({ ...prev, location: { ...prev.location, longitude: e.target.value } }))}
            placeholder="Longitude"
            className="block mb-4 p-2 border border-gray-300 rounded"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
        </div>
      )}

      {/* List of Profiles */}
      {profiles.map(profile => (
        <div key={profile.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p>{profile.description}</p>
          <p>Location: {profile.location.latitude}, {profile.location.longitude}</p>
          <button onClick={() => setEditProfile(profile)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
          <button onClick={() => handleDelete(profile.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
