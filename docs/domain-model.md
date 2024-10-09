# Domain Model

```typescript
type UserRole = 'SYSTEM_ADMIN' | 'HOST_ADMIN' | 'TRADER';
type GroupRole = 'HOST_ADMIN' | 'TRADER';
type AuctionState = 'CREATED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
type AuctionType = 'ONE_SIDED' | 'TWO_SIDED_BROKER' | 'TWO_SIDED_DEALER';
type Side = 'BUY' | 'SELL';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  hostRoles?: { [hostId: string]: GroupRole };
  isMock: boolean;
}

interface UserGroup {
  id: string;
  name: string;
  role: GroupRole;
  users: User[];
}

interface Host {
  id: string;
  name: string;
  auctions: Auction[];
  adminGroup: UserGroup;
  traderGroup: UserGroup;
  isMock: boolean;
}

interface Auction {
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

interface AuctionSettings {
  auctionType: AuctionType;
  startTime: Date;
  endTime: Date;
  initialPrice: number;
  reservePrice: number;
  minIncrement: number;
}

interface Round {
  number: number;
  price: number;
  traderActivities: TraderActivity[];
}

interface TraderActivity {
  tradingGroup: AuctionTradingGroup;
  quantity: number;
  side: Side;
}

interface AuctionTradingGroup {
  id: string;
  name: string;
  traders: User[];
  limits: FinancialLimits;
}

interface FinancialLimits {
  maxExposure: number;
  maxTotalQuantity: number;
  counterpartyLimits: GroupedCounterpartyLimits;
}

interface GroupedCounterpartyLimits {
  [groupId: string]: number;
}

interface Bid {
  amount: number;
  bidder: string;
  timestamp: Date;
  side: Side;
}

interface Invitation {
  id: string;
  email: string;
  hostId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
```