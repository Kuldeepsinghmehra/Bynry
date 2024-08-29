// src/components/SearchFilter.jsx
import React, { useState, useEffect } from 'react';
import { reverseGeocode } from '../api/profileService'; 

const SearchFilter = ({ profiles, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      const locationPromises = profiles.map(profile =>
        reverseGeocode(profile.location.latitude, profile.location.longitude)
      );
      const locations = await Promise.all(locationPromises);

      const locationMapping = profiles.reduce((acc, profile, index) => {
        acc[profile.id] = locations[index];
        return acc;
      }, {});

      setLocationNames(locationMapping);
    };

    fetchLocations();
  }, [profiles]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterProfiles(event.target.value, filterLocation);
  };

  const handleFilterLocation = (event) => {
    setFilterLocation(event.target.value);
    filterProfiles(searchTerm, event.target.value);
  };

  const filterProfiles = (term, location) => {
    const filtered = profiles.filter(profile =>
      profile.name.toLowerCase().includes(term.toLowerCase()) &&
      (location ? locationNames[profile.id]?.toLowerCase().includes(location.toLowerCase()) : true)
    );
    onFilter(filtered);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Search by location"
        value={filterLocation}
        onChange={handleFilterLocation}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default SearchFilter;
