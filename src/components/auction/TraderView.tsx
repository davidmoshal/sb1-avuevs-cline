import React from 'react';
import { Auction } from '../../types';
import TraderControls from './TraderControls';
import BidHistory from './BidHistory';

interface TraderViewProps {
  auction: Auction;
}

const TraderView: React.FC<TraderViewProps> = ({ auction }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Auction Details</h2>
        <p>Status: {auction.currentState}</p>
        <p>Current Price: ${auction.rounds[auction.rounds.length - 1]?.price || auction.settings.initialPrice}</p>
        <p>Start Time: {auction.settings.startTime.toLocaleString()}</p>
        <p>End Time: {auction.settings.endTime.toLocaleString()}</p>
      </div>
      <TraderControls auction={auction} onPlaceBid={() => {/* TODO: Implement bid placement logic */}} />
      <BidHistory auction={auction} />
    </div>
  );
};

export default TraderView;