import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, mockAsSystemAdmin, mockAsHostAdmin, mockAsTrader } from '../store/store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAppStore(state => state.setUser);

  const handleLogin = async (mockFunction: () => void) => {
    mockFunction();
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="space-y-2">
        <button
          onClick={() => handleLogin(mockAsSystemAdmin)}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Mock Login as System Admin
        </button>
        <button
          onClick={() => handleLogin(mockAsHostAdmin)}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Mock Login as Host Admin
        </button>
        <button
          onClick={() => handleLogin(mockAsTrader)}
          className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
        >
          Mock Login as Trader
        </button>
      </div>
    </div>
  );
};

export default Login;