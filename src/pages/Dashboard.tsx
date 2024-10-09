import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/store';

const Dashboard: React.FC = () => {
  const { user, hosts, auctions } = useAppStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <p className="bg-white shadow rounded-lg p-4">
          Welcome, {user.username}! Your role is: {user.role}
        </p>
      )}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Hosts</h2>
        <ul className="space-y-2">
          {hosts.map(host => (
            <li key={host.id} className="border-b pb-2">
              <Link to={`/host/${host.id}`} className="text-blue-600 hover:underline">
                {host.name}
              </Link>
              <p className="text-sm text-gray-600">
                Your Role: {user?.hostRoles?.[host.id] || 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Active Auctions</h2>
        <ul className="space-y-2">
          {auctions.filter(auction => auction.isActive).map(auction => {
            const host = hosts.find(h => h.id === auction.hostId);
            return (
              <li key={auction.id} className="border-b pb-2">
                <Link to={`/auction/${auction.hostId}/${auction.id}`} className="text-blue-600 hover:underline">
                  {auction.name}
                </Link>
                <p className="text-sm text-gray-600">
                  Host: {host?.name} | Your Role: {user?.hostRoles?.[auction.hostId] || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  Current Price: ${auction.rounds[auction.rounds.length - 1]?.price || 'N/A'}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;