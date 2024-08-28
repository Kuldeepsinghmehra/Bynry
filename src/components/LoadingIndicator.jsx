import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
