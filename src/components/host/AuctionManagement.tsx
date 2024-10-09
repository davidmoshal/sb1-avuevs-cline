import React from 'react';
import { Auction } from '../../types';
import { useAppStore } from '../../store/store';

interface AuctionManagementProps {
  hostId: string;
}

const AuctionManagement: React.FC<AuctionManagementProps> = ({ hostId }) => {
  const { auctions } = useAppStore();
  const hostAuctions = auctions.filter(auction => auction.hostId === hostId);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Auction Management</h2>
      <ul className="space-y-2">
        {hostAuctions.map(auction => (
          <li key={auction.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-medium">{auction.name}</h3>
            <p>Status: {auction.currentState}</p>
            <p>Current Price: ${auction.rounds[auction.rounds.length - 1]?.price || auction.settings.initialPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionManagement;