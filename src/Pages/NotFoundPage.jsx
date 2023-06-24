import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600">Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
