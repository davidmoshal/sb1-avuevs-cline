import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-4">You do not have permission to access this page.</p>
      <Link to="/" className="text-blue-600 hover:underline">Return to Dashboard</Link>
    </div>
  );
};

export default Unauthorized;