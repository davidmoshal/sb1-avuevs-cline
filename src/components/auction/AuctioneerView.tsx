import React from 'react';
import { Auction } from '../../types';
import AuctioneerControls from './AuctioneerControls';
import BidHistory from './BidHistory';

interface AuctioneerViewProps {
  auction: Auction;
}

const AuctioneerView: React.FC<AuctioneerViewProps> = ({ auction }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Auction Details</h2>
        <p>Status: {auction.currentState}</p>
        <p>Current Price: ${auction.rounds[auction.rounds.length - 1]?.price || auction.settings.initialPrice}</p>
        <p>Start Time: {auction.settings.startTime.toLocaleString()}</p>
        <p>End Time: {auction.settings.endTime.toLocaleString()}</p>
      </div>
      <AuctioneerControls auction={auction} onUpdateAuction={() => {/* TODO: Implement update logic */}} />
      <BidHistory auction={auction} />
    </div>
  );
};

export default AuctioneerView;