
export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentPrice: number;
  incrementAmount: number;
  startDate: Date;
  endDate: Date;
  seller: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  bids: Bid[];
  watchCount: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  featured?: boolean;
  isDeleted?: boolean;
  status: 'draft' | 'published' | 'deleted';
  duration?: number; // Duration in hours
}

export type AuctionStatus = 'upcoming' | 'live' | 'ended';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  watchlist: string[]; // Array of auction IDs
  listings?: string[]; // Array of auction IDs created by the user
  bids?: string[]; // Array of auction IDs user has bid on
}
