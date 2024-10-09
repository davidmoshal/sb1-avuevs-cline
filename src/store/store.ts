import { create } from 'zustand';
import { User, Host, Auction, Invitation, AuctionTradingGroup, FinancialLimits } from '../types';
import { mockUsers, mockHosts, mockAuctions, mockInvitations, mockTradingGroups } from '../mockData';

interface AppState {
  user: User | null;
  hosts: Host[];
  auctions: Auction[];
  invitations: Invitation[];
  tradingGroups: AuctionTradingGroup[];
  setUser: (user: User | null) => void;
  setHosts: (hosts: Host[]) => void;
  setAuctions: (auctions: Auction[]) => void;
  setInvitations: (invitations: Invitation[]) => void;
  setTradingGroups: (tradingGroups: AuctionTradingGroup[]) => void;
  isSystemAdmin: () => boolean;
  isHostAdmin: (hostId: string) => boolean;
  isTrader: (hostId: string) => boolean;
  getVisibleHosts: () => Host[];
  getVisibleAuctions: () => Auction[];
  getVisibleTradingGroups: () => AuctionTradingGroup[];
  updateTradingGroupLimits: (groupId: string, limits: FinancialLimits) => void;
  createTradingGroup: (name: string, limits: FinancialLimits) => void;
  deleteTradingGroup: (groupId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  hosts: [],
  auctions: [],
  invitations: [],
  tradingGroups: [],
  setUser: (user) => set({ user }),
  setHosts: (hosts) => set({ hosts }),
  setAuctions: (auctions) => set({ auctions }),
  setInvitations: (invitations) => set({ invitations }),
  setTradingGroups: (tradingGroups) => set({ tradingGroups }),
  isSystemAdmin: () => get().user?.role === 'SYSTEM_ADMIN',
  isHostAdmin: (hostId) => get().user?.role === 'SYSTEM_ADMIN' || get().user?.hostRoles?.[hostId] === 'HOST_ADMIN',
  isTrader: (hostId) => get().user?.hostRoles?.[hostId] === 'TRADER',
  getVisibleHosts: () => {
    const { user, hosts } = get();
    if (user?.role === 'SYSTEM_ADMIN') return hosts;
    return hosts.filter(host => user?.hostRoles?.[host.id]);
  },
  getVisibleAuctions: () => {
    const { user, auctions } = get();
    if (user?.role === 'SYSTEM_ADMIN') return auctions;
    return auctions.filter(auction => user?.hostRoles?.[auction.hostId]);
  },
  getVisibleTradingGroups: () => {
    const { user, tradingGroups } = get();
    if (user?.role === 'SYSTEM_ADMIN') return tradingGroups;
    return tradingGroups.filter(group => user?.hostRoles?.[group.id]);
  },
  updateTradingGroupLimits: (groupId, limits) => {
    set(state => ({
      tradingGroups: state.tradingGroups.map(group =>
        group.id === groupId ? { ...group, limits } : group
      )
    }));
  },
  createTradingGroup: (name, limits) => {
    set(state => ({
      tradingGroups: [
        ...state.tradingGroups,
        {
          id: `tg${state.tradingGroups.length + 1}`,
          name,
          traders: [],
          limits
        }
      ]
    }));
  },
  deleteTradingGroup: (groupId) => {
    set(state => ({
      tradingGroups: state.tradingGroups.filter(group => group.id !== groupId)
    }));
  },
}));

export const mockAsSystemAdmin = () => {
  const systemAdmin = mockUsers.find(u => u.role === 'SYSTEM_ADMIN');
  if (systemAdmin) {
    useAppStore.getState().setUser(systemAdmin);
    useAppStore.getState().setHosts(mockHosts);
    useAppStore.getState().setAuctions(mockAuctions);
    useAppStore.getState().setInvitations(mockInvitations);
    useAppStore.getState().setTradingGroups(mockTradingGroups);
  }
};

export const mockAsHostAdmin = () => {
  const hostAdmin = mockUsers.find(u => Object.values(u.hostRoles || {}).includes('HOST_ADMIN'));
  if (hostAdmin) {
    useAppStore.getState().setUser(hostAdmin);
    const userHosts = mockHosts.filter(h => hostAdmin.hostRoles?.[h.id] === 'HOST_ADMIN');
    useAppStore.getState().setHosts(userHosts);
    const userAuctions = mockAuctions.filter(a => userHosts.some(h => h.id === a.hostId));
    useAppStore.getState().setAuctions(userAuctions);
    const userInvitations = mockInvitations.filter(i => userHosts.some(h => h.id === i.hostId));
    useAppStore.getState().setInvitations(userInvitations);
    const userTradingGroups = mockTradingGroups.filter(g => userHosts.some(h => h.id === g.id));
    useAppStore.getState().setTradingGroups(userTradingGroups);
  }
};

export const mockAsTrader = () => {
  const trader = mockUsers.find(u => Object.values(u.hostRoles || {}).includes('TRADER'));
  if (trader) {
    useAppStore.getState().setUser(trader);
    const userHosts = mockHosts.filter(h => trader.hostRoles?.[h.id] === 'TRADER');
    useAppStore.getState().setHosts(userHosts);
    const userAuctions = mockAuctions.filter(a => userHosts.some(h => h.id === a.hostId));
    useAppStore.getState().setAuctions(userAuctions);
    const userTradingGroups = mockTradingGroups.filter(g => g.traders.some(t => t.id === trader.id));
    useAppStore.getState().setTradingGroups(userTradingGroups);
  }
};
