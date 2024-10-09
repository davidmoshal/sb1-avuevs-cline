import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/store';
import AuctioneerView from '../components/auction/AuctioneerView';
import TraderView from '../components/auction/TraderView';

const AuctionView: React.FC = () => {
  const { hostId, auctionId } = useParams<{ hostId: string; auctionId: string }>();
  const { user, auctions } = useAppStore();
  const auction = auctions.find(a => a.id === auctionId && a.hostId === hostId);
  const userRole = user?.hostRoles?.[hostId || ''];

  if (!auction) {
    return <div>Auction not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{auction.name}</h1>
      {userRole === 'HOST_ADMIN' ? (
        <AuctioneerView auction={auction} />
      ) : (
        <TraderView auction={auction} />
      )}
    </div>
  );
};

export default AuctionView;