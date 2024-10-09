import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';
import { useAppStore } from '../store/store';

const Header: React.FC = () => {
  const { user, isSystemAdmin } = useAppStore();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Gavel size={24} />
          <span className="text-xl font-bold">Auction Platform</span>
        </Link>
        <nav>
          <ul className="flex flex-wrap space-x-4">
            {user && (
              <>
                <li><Link to="/" className="hover:underline">Dashboard</Link></li>
                {isSystemAdmin() && (
                  <li><Link to="/admin" className="hover:underline">Admin Panel</Link></li>
                )}
                <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                <li>
                  <button onClick={() => useAppStore.getState().setUser(null)} className="hover:underline">
                    Logout ({user.username})
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;