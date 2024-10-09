import React, { useState } from 'react';
import { Auction, AuctionState } from '../../types';

interface AuctioneerControlsProps {
  auction: Auction;
  onUpdateAuction: (updatedAuction: Auction) => void;
}

const AuctioneerControls: React.FC<AuctioneerControlsProps> = ({ auction, onUpdateAuction }) => {
  const [newPrice, setNewPrice] = useState('');

  const updateAuctionState = (newState: AuctionState) => {
    const updatedAuction = { ...auction, currentState: newState };
    onUpdateAuction(updatedAuction);
  };

  const updatePrice = () => {
    const price = parseFloat(newPrice);
    if (!isNaN(price) && price > 0) {
      const updatedAuction = {
        ...auction,
        rounds: [
          ...auction.rounds,
          { number: auction.rounds.length + 1, price, traderActivities: [] }
        ]
      };
      onUpdateAuction(updatedAuction);
      setNewPrice('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Auctioneer Controls</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => updateAuctionState('ACTIVE')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={auction.currentState === 'ACTIVE'}
          >
            Start Auction
          </button>
          <button
            onClick={() => updateAuctionState('COMPLETED')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={auction.currentState === 'COMPLETED'}
          >
            End Auction
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="New Price"
            className="flex-grow p-2 border rounded"
          />
          <button
            onClick={updatePrice}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctioneerControls;