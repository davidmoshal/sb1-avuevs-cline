import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthProvider';
import { mockAuctions, mockHosts } from '../mockData';

const AuctionList: React.FC = () => {
  const { user } = useAuth();
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [selectedHost, setSelectedHost] = useState<string | 'all'>('all');

  const filteredAuctions = mockAuctions.filter(auction => {
    if (showActiveOnly && !auction.isActive) return false;
    if (selectedHost !== 'all' && auction.hostId !== selectedHost) return false;
    if (user?.role === 'HOST') {
      return user.hostRoles?.[auction.hostId] === 'HOST_ADMIN' || user.hostRoles?.[auction.hostId] === 'TRADER';
    }
    return true;
  });

  const userHosts = user?.role === 'HOST'
    ? mockHosts.filter(host => user.hostRoles?.[host.id])
    : mockHosts;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Auctions</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="activeFilter"
              checked={showActiveOnly}
              onChange={() => setShowActiveOnly(!showActiveOnly)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="activeFilter" className="text-sm font-medium text-gray-700">
              Show active auctions only
            </label>
          </div>
          <select
            value={selectedHost}
            onChange={(e) => setSelectedHost(e.target.value)}
            className="form-select block w-full mt-1"
          >
            <option value="all">All Hosts</option>
            {userHosts.map(host => (
              <option key={host.id} value={host.id}>{host.name}</option>
            ))}
          </select>
        </div>
        <span className="text-sm text-gray-500">
          Showing {filteredAuctions.length} of {mockAuctions.length} auctions
        </span>
      </div>
      <ul className="space-y-4">
        {filteredAuctions.map(auction => {
          const host = mockHosts.find(h => h.id === auction.hostId);
          const userRole = user?.hostRoles?.[auction.hostId];
          return (
            <li key={auction.id} className="bg-white shadow rounded-lg p-4">
              <Link to={`/auction/${auction.id}`} className="text-blue-600 hover:underline">
                <h2 className="text-xl font-semibold">{auction.name}</h2>
              </Link>
              <p>Status: {auction.currentState}</p>
              <p>Host: {host?.name}</p>
              <p>Your Role: {userRole || 'N/A'}</p>
              <p>Created by: {auction.createdBy.username}</p>
              {auction.isActive && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                  Active
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AuctionList;