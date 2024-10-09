import React from 'react';
import { Bid, Auction } from '../../types';

interface BidHistoryProps {
  auction: Auction;
}

const BidHistory: React.FC<BidHistoryProps> = ({ auction }) => {
  // Ensure bids is always an array, even if it's undefined in the auction object
  const bids: Bid[] = auction.rounds.flatMap(round => round.traderActivities.map(activity => ({
    amount: round.price,
    bidder: activity.tradingGroup.name,
    timestamp: new Date(), // You might want to add a timestamp to the Round or TraderActivity type
    side: activity.side
  })));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Bid History</h2>
      {bids.length === 0 ? (
        <p>No bids have been placed yet.</p>
      ) : (
        <ul className="space-y-2">
          {bids.map((bid, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {bid.bidder} - {bid.side}: ${bid.amount}
              </span>
              <span className="text-sm text-gray-500">
                {bid.timestamp.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BidHistory;