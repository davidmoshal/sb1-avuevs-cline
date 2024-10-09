import React, { useState } from 'react';
import { PlusCircle, Trash2, Play, Pause, StopCircle } from 'lucide-react';

interface Auction {
  id: string;
  name: string;
  status: 'PENDING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  startingPrice: number;
  currentPrice: number;
}

const AuctionManagement: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([
    { id: '1', name: 'Auction 1', status: 'PENDING', startingPrice: 100, currentPrice: 100 },
    { id: '2', name: 'Auction 2', status: 'ACTIVE', startingPrice: 200, currentPrice: 250 },
  ]);
  const [newAuctionName, setNewAuctionName] = useState('');
  const [newStartingPrice, setNewStartingPrice] = useState('');

  const addAuction = () => {
    if (newAuctionName.trim() && newStartingPrice) {
      const startingPrice = parseFloat(newStartingPrice);
      setAuctions([...auctions, {
        id: Date.now().toString(),
        name: newAuctionName,
        status: 'PENDING',
        startingPrice,
        currentPrice: startingPrice,
      }]);
      setNewAuctionName('');
      setNewStartingPrice('');
    }
  };

  const deleteAuction = (id: string) => {
    setAuctions(auctions.filter(auction => auction.id !== id));
  };

  const updateAuctionStatus = (id: string, newStatus: Auction['status']) => {
    setAuctions(auctions.map(auction =>
      auction.id === id ? { ...auction, status: newStatus } : auction
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Auction Management</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newAuctionName}
          onChange={(e) => setNewAuctionName(e.target.value)}
          placeholder="New Auction Name"
          className="flex-grow p-2 border rounded"
        />
        <input
          type="number"
          value={newStartingPrice}
          onChange={(e) => setNewStartingPrice(e.target.value)}
          placeholder="Starting Price"
          className="w-32 p-2 border rounded"
        />
        <button onClick={addAuction} className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <PlusCircle size={20} />
          <span>Add Auction</span>
        </button>
      </div>
      <ul className="space-y-2">
        {auctions.map(auction => (
          <li key={auction.id} className="flex items-center justify-between p-3 bg-white shadow rounded">
            <div>
              <span className="font-medium">{auction.name}</span>
              <span className="ml-2 text-sm text-gray-500">
                Current Price: ${auction.currentPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {auction.status === 'PENDING' && (
                <button
                  onClick={() => updateAuctionStatus(auction.id, 'ACTIVE')}
                  className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <Play size={20} />
                  <span>Start</span>
                </button>
              )}
              {auction.status === 'ACTIVE' && (
                <button
                  onClick={() => updateAuctionStatus(auction.id, 'PAUSED')}
                  className="flex items-center space-x-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  <Pause size={20} />
                  <span>Pause</span>
                </button>
              )}
              {auction.status === 'PAUSED' && (
                <button
                  onClick={() => updateAuctionStatus(auction.id, 'ACTIVE')}
                  className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <Play size={20} />
                  <span>Resume</span>
                </button>
              )}
              {['ACTIVE', 'PAUSED'].includes(auction.status) && (
                <button
                  onClick={() => updateAuctionStatus(auction.id, 'COMPLETED')}
                  className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <StopCircle size={20} />
                  <span>End</span>
                </button>
              )}
              <button
                onClick={() => deleteAuction(auction.id)}
                className="flex items-center space-x-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                <Trash2 size={20} />
                <span>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionManagement;