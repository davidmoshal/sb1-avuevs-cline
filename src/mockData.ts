import { User, Host, UserGroup, Auction, AuctionSettings, AuctionTradingGroup, Round, GroupedCounterpartyLimits, FinancialLimits, Invitation } from './types';

// Mock Users
export const mockUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', role: 'SYSTEM_ADMIN', isMock: true },
  { id: '2', username: 'host1', email: 'host1@example.com', role: 'HOST', hostRoles: { '1': 'HOST_ADMIN' }, isMock: true },
  { id: '3', username: 'trader1', email: 'trader1@example.com', role: 'HOST', hostRoles: { '1': 'TRADER' }, isMock: true },
];

// Mock Hosts
export const mockHosts: Host[] = [
  {
    id: '1',
    name: 'Host 1',
    auctions: [],
    adminGroup: { id: 'admin1', name: 'Host 1 Admins', role: 'HOST_ADMIN', users: [mockUsers[1]] },
    traderGroup: { id: 'trader1', name: 'Host 1 Traders', role: 'TRADER', users: [mockUsers[2]] },
    isMock: true,
  },
];

// Mock Auctions
export const mockAuctions: Auction[] = [
  {
    id: '1',
    name: 'Auction 1',
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
    traders: [],
    isActive: true,
  },
];

export const mockInvitations: Invitation[] = [
  { id: '1', email: 'pending@example.com', hostId: '1', status: 'PENDING' },
  { id: '2', email: 'accepted@example.com', hostId: '1', status: 'ACCEPTED' },
  { id: '3', email: 'rejected@example.com', hostId: '2', status: 'REJECTED' },
];

// Mock Trading Groups
export const mockTradingGroups: AuctionTradingGroup[] = [
  {
    id: 'tg1',
    name: 'Trading Group 1',
    traders: [mockUsers[2]],
    limits: {
      maxExposure: 1000000,
      maxTotalQuantity: 10000,
      counterpartyLimits: {
        'tg2': 500000,
        'tg3': 750000
      }
    }
  },
  {
    id: 'tg2',
    name: 'Trading Group 2',
    traders: [],
    limits: {
      maxExposure: 2000000,
      maxTotalQuantity: 20000,
      counterpartyLimits: {
        'tg1': 1000000,
        'tg3': 1500000
      }
    }
  },
  {
    id: 'tg3',
    name: 'Trading Group 3',
    traders: [],
    limits: {
      maxExposure: 3000000,
      maxTotalQuantity: 30000,
      counterpartyLimits: {
        'tg1': 1500000,
        'tg2': 2000000
      }
    }
  }
];

// Export all mock data
export const mockData = {
  users: mockUsers,
  hosts: mockHosts,
  auctions: mockAuctions,
  invitations: mockInvitations,
  tradingGroups: mockTradingGroups,
};
