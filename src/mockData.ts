import { User, Host, Auction, AuctionTradingGroup, Invitation } from './types';

// Mock Users
export const mockUsers: User[] = [
  { id: '1', username: 'user1', email: 'user1@example.com', role: 'SYSTEM_ADMIN', isMock: true },
  { id: '2', username: 'user2', email: 'user2@example.com', role: 'HOST', hostRoles: { '1': 'HOST_ADMIN', '2': 'TRADER' }, isMock: true },
  { id: '3', username: 'user3', email: 'user3@example.com', role: 'HOST', hostRoles: { '1': 'TRADER', '2': 'HOST_ADMIN' }, isMock: true }
];

// Mock Trading Groups
export const host1_traders: AuctionTradingGroup = {
  id: 'tg1',
  name: 'Host 1 Traders',
  role: 'TRADER',
  users: [mockUsers[2]],
  limits: {
    maxExposure: 1000000,
    maxTotalQuantity: 10000,
    counterpartyLimits: {}
  }
};

export const host2_traders: AuctionTradingGroup = {
  id: 'tg2',
  name: 'Host 2 Traders',
  role: 'TRADER',
  users: [mockUsers[1]],
  limits: {
    maxExposure: 2000000,
    maxTotalQuantity: 20000,
    counterpartyLimits: {}
  }
};

// Mock Auction for Host 1
export const host1_auction1: Auction = {
  id: '1',
  name: 'Host 1 Auction 1',
  hostId: '1',
  isMock: true,
  tags: ['tag1', 'tag2'],
  currentState: 'ACTIVE',
  createdBy: mockUsers[1],
  settings: {
    auctionType: 'ONE_SIDED',
    startTime: new Date(),
    endTime: new Date(Date.now() + 3600000),
    initialPrice: 100,
    reservePrice: 90,
    minIncrement: 5,
  },
  rounds: [
    {
      number: 1,
      price: 100,
      traderActivities: [],
    },
  ],
  traders: [host1_traders],
  isActive: true,
};

// Mock Auction for Host 2
export const host2_auction1: Auction = {
  id: '2',
  name: 'Host 2 Auction 1',
  hostId: '2',
  isMock: true,
  tags: ['tag3', 'tag4'],
  currentState: 'ACTIVE',
  createdBy: mockUsers[2],
  settings: {
    auctionType: 'ONE_SIDED',
    startTime: new Date(),
    endTime: new Date(Date.now() + 3600000),
    initialPrice: 200,
    reservePrice: 180,
    minIncrement: 10,
  },
  rounds: [
    {
      number: 1,
      price: 200,
      traderActivities: [],
    },
  ],
  traders: [host2_traders],
  isActive: true,
};

// Mock Hosts
export const mockHosts: Host[] = [
  {
    id: '1',
    name: 'Host 1',
    auctions: [host1_auction1],
    adminGroup: { id: 'admin1', name: 'Host 1 Admins', role: 'HOST_ADMIN', users: [mockUsers[0], mockUsers[1]] },
    traderGroup: [host1_traders],
    isMock: true,
  },
  {
    id: '2',
    name: 'Host 2',
    auctions: [host2_auction1],
    adminGroup: { id: 'admin2', name: 'Host 2 Admins', role: 'HOST_ADMIN', users: [mockUsers[0], mockUsers[2]] },
    traderGroup: [host2_traders],
    isMock: true,
  },
];

export const mockInvitations: Invitation[] = [
  { id: '1', email: 'pending@example.com', hostId: '1', status: 'PENDING' },
  { id: '2', email: 'accepted@example.com', hostId: '1', status: 'ACCEPTED' },
  { id: '3', email: 'rejected@example.com', hostId: '2', status: 'REJECTED' },
];

// Export all mock data
export const mockData = {
  users: mockUsers,
  hosts: mockHosts,
  auctions: [host1_auction1, host2_auction1],
  invitations: mockInvitations,
  tradingGroups: [host1_traders, host2_traders],
};

export const mockAuctions: Auction[] = [
  host1_auction1,
  host2_auction1,
];

export const mockTradingGroups: AuctionTradingGroup[] = [
  host1_traders,
  host2_traders,
];
