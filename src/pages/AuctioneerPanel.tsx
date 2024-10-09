import React, { useState } from 'react';
import AuctionManagement from '../components/auctioneer/AuctionManagement';
import AuctionCreation from '../components/auctioneer/AuctionCreation';

const AuctioneerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manage' | 'create'>('manage');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Auctioneer Panel</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded ${activeTab === 'manage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Auctions
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Create Auction
        </button>
      </div>
      {activeTab === 'manage' && <AuctionManagement />}
      {activeTab === 'create' && <AuctionCreation />}
    </div>
  );
};

export default AuctioneerPanel;