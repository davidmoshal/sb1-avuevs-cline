import React from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';

interface AuctionListProps {
  hostId: string;
}

const AuctionList: React.FC<AuctionListProps> = ({ hostId }) => {
  const { auctions } = useAppStore();
  const hostAuctions = auctions.filter(auction => auction.hostId === hostId);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Auctions</h2>
      {hostAuctions.length === 0 ? (
        <p>No auctions available for this host.</p>
      ) : (
        <ul className="space-y-2">
          {hostAuctions.map(auction => (
            <li key={auction.id} className="bg-white shadow rounded-lg p-4">
              <Link to={`/auction/${hostId}/${auction.id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-medium">{auction.name}</h3>
              </Link>
              <p>Status: {auction.currentState}</p>
              <p>Current Price: ${auction.rounds[auction.rounds.length - 1]?.price || auction.settings.initialPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionList;