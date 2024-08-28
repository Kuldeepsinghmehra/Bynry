// MapComponent.jsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ latitude, longitude }) => {
  useEffect(() => {
    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

    return () => {
      map.remove(); // Cleanup on unmount
    };
  }, [latitude, longitude]);

  return (
    <div id="map" className="w-full h-64 md:h-96"></div>
  );
};

export default MapComponent;
