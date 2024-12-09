import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center p-12 rounded-xl shadow-lg bg-white bg-opacity-10 backdrop-blur-md border border-white/20 max-w-lg mx-auto">
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-white mb-6">Page Not Found</p>
        <p className="text-lg text-white/80 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-violet-500"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
