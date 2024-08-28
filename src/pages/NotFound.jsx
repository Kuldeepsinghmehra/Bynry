import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
