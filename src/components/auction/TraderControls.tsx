import React, { useState } from 'react';
import { Auction, Bid, Side } from '../../types';

interface TraderControlsProps {
  auction: Auction;
  onPlaceBid: (bid: Bid) => void;
}

const TraderControls: React.FC<TraderControlsProps> = ({ auction, onPlaceBid }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [bidSide, setBidSide] = useState<Side>('BUY');

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (!isNaN(amount) && amount > 0) {
      const newBid: Bid = {
        amount,
        bidder: 'Current User', // TODO: Replace with actual user name
        timestamp: new Date(),
        side: bidSide
      };
      onPlaceBid(newBid);
      setBidAmount('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Place a Bid</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Bid Amount"
            className="flex-grow p-2 border rounded"
          />
          <select
            value={bidSide}
            onChange={(e) => setBidSide(e.target.value as Side)}
            className="p-2 border rounded"
          >
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
        </div>
        <button
          onClick={handlePlaceBid}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default TraderControls;