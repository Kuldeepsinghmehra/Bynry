// src/components/SearchFilter.jsx
import React, { useState } from 'react';

const SearchFilter = ({ profiles, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

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
      (location ? profile.location === location : true)
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
      <select value={filterLocation} onChange={handleFilterLocation} className="border p-2 rounded">
        <option value="">All Locations</option>
        <option value="New York">New York</option>
        <option value="San Francisco">San Francisco</option>
        {/* Add more location options as needed */}
      </select>
    </div>
  );
};

export default SearchFilter;
