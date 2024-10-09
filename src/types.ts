export type UserRole = 'SYSTEM_ADMIN' | 'HOST';
export type GroupRole = 'HOST_ADMIN' | 'TRADER';
export type AuctionState = 'CREATED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type AuctionType = 'ONE_SIDED' | 'TWO_SIDED_BROKER' | 'TWO_SIDED_DEALER';
export type Side = 'BUY' | 'SELL';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  hostRoles?: { [hostId: string]: GroupRole };
  isMock: boolean;
}

export interface UserGroup {
  id: string;
  name: string;
  role: GroupRole;
  users: User[];
}

export interface Host {
  id: string;
  name: string;
  auctions: Auction[];
  adminGroup: UserGroup;
  traderGroup: UserGroup;
  isMock: boolean;
}

export interface Auction {
  id: string;
  name: string;
  hostId: string;
  isMock: boolean;
  tags: string[];
  currentState: AuctionState;
  createdBy: User;
  settings: AuctionSettings;
  rounds: Round[];
  traders: AuctionTradingGroup[];
  isActive: boolean;
}

export interface AuctionSettings {
  auctionType: AuctionType;
  startTime: Date;
  endTime: Date;
  initialPrice: number;
  reservePrice: number;
  minIncrement: number;
}

export interface Round {
  number: number;
  price: number;
  traderActivities: TraderActivity[];
}

export interface TraderActivity {
  tradingGroup: AuctionTradingGroup;
  quantity: number;
  side: Side;
}

export interface AuctionTradingGroup {
  id: string;
  name: string;
  traders: User[];
  limits: FinancialLimits;
}

export interface FinancialLimits {
  maxExposure: number;
  maxTotalQuantity: number;
  counterpartyLimits: GroupedCounterpartyLimits;
}

export interface GroupedCounterpartyLimits {
  [groupId: string]: number;
}

export interface Bid {
  amount: number;
  bidder: string;
  timestamp: Date;
  side: Side;
}

export interface Invitation {
  id: string;
  email: string;
  hostId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}