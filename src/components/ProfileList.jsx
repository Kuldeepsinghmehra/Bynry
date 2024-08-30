
import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { fetchProfiles } from '../api/profileService';
import LoadingIndicator from './LoadingIndicator';
import SearchFilter from './SearchFilter';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfiles = async () => {
      const profileData = await fetchProfiles();
      setProfiles(profileData);
      setFilteredProfiles(profileData);
      setLoading(false);
    };

    getProfiles();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredProfiles(filtered);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="p-4">
      <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-8 animate-bounce ">Profile Display</h1>
      <SearchFilter profiles={profiles} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProfiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default ProfileList;
