# Atomic Design

## Pages

| Component | SYSTEM_ADMIN | HOST_ADMIN | TRADER |
|-----------|--------------|------------|--------|
| Dashboard | View all hosts, auctions, and system-wide statistics | View host-specific auctions and statistics | View available auctions and personal trading statistics |
| AdminPanel | Full access to all system management features | N/A | N/A |
| HostManagement | Manage all hosts, including creation, editing, and mock status | Manage host users, groups, and settings (cannot edit host name or mock status) | N/A |
| AuctionList | View and manage all auctions across all hosts | View and manage all auctions for the specific host | View all auctions available to trade |
| AuctionView | View detailed auction information, history, and Auctioneer controls for all hosts | View detailed auction information, history, and Auctioneer controls for specific host | View auction details (TraderView) and place bids |
| UserProfile | View and edit own profile | View and edit own profile | View and edit own profile |
| Login | Login as self, with option to mock as any role | Login as self, with option to mock as HOST_ADMIN or TRADER | Login as self, with option to mock as TRADER |

## Organisms

| Component | SYSTEM_ADMIN | HOST_ADMIN | TRADER |
|-----------|--------------|------------|--------|
| Header | Full navigation menu for all hosts and system management | Host-specific navigation menu | Trader-specific navigation menu |
| HostManagement | List, create, edit, and manage all hosts, including mock status | Same as SYSTEM_ADMIN for specific host, but cannot create hosts or edit host name/mock status | N/A |
| UserManagement | Manage all users across the system and within each host | Manage users within the specific host | N/A |
| InvitationManagement | Manage invitations across all hosts | Manage invitations for the specific host | N/A |
| AuctionManagement | View and manage all auctions across all hosts | Manage auctions for the specific host | N/A |
| AuctioneerControls | Control auction status and pricing for all hosts | Control auction status and pricing for specific host | N/A |
| TraderControls | N/A | N/A | Place bids and view personal trading limits |
| BidHistory | View all bids for any auction across all hosts | View all bids for host's auctions | View own bids and anonymized other bids |

## Molecules

| Component | SYSTEM_ADMIN | HOST_ADMIN | TRADER |
|-----------|--------------|------------|--------|
| UserGroupManagement | Manage user groups across all hosts | Manage user groups within the specific host | N/A |
| AuctionCreation | Create auctions for any host | Create auctions for the specific host | N/A |
| BidForm | N/A | N/A | Submit bids for auctions |
| AuctionFilters | Filter auctions across all hosts | Filter auctions for the specific host | Filter available auctions |
| UserInvitationForm | Invite users to any host | Invite users to the specific host | N/A |
| AuctionStatusToggle | Change status of any auction across all hosts | Change status of auctions for the specific host | N/A |
| TradingLimitsDisplay | View and set limits for any user/group across all hosts | View and set limits for host users/groups | View own trading limits |
| HostCreationForm | Create new hosts and set initial settings | N/A | N/A |
| HostEditForm | Edit host details including name and mock status | Edit host details (excluding name and mock status) | N/A |