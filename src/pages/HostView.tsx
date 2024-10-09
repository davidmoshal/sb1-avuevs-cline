import React from 'react';
import { useParams, Routes, Route, Link } from 'react-router-dom';
import { useAppStore } from '../store/store';
import HostManagement from '../components/host/HostManagement';
import UserManagement from '../components/host/UserManagement';
import AuctionManagement from '../components/host/AuctionManagement';
import AuctionList from '../components/auction/AuctionList';

const HostView: React.FC = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const { hosts, isHostAdmin } = useAppStore();
  const host = hosts.find(h => h.id === hostId);

  if (!host) {
    return <div>Host not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{host.name}</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to={`/host/${hostId}/auctions`} className="text-blue-600 hover:underline">
              Auctions
            </Link>
          </li>
          {isHostAdmin(hostId) && (
            <>
              <li>
                <Link to={`/host/${hostId}/manage`} className="text-blue-600 hover:underline">
                  Manage Host
                </Link>
              </li>
              <li>
                <Link to={`/host/${hostId}/users`} className="text-blue-600 hover:underline">
                  Manage Users
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="auctions" element={<AuctionList hostId={hostId} />} />
        {isHostAdmin(hostId) && (
          <>
            <Route path="manage" element={<HostManagement host={host} />} />
            <Route path="users" element={<UserManagement host={host} />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default HostView;