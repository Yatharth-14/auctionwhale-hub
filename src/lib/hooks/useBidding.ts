
import { useState } from 'react';
import { Auction, Bid } from '@/types/auction';
import { useToast } from '@/components/ui/use-toast';

// Mock user for demo purposes
const mockUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
};

export const useBidding = (auction: Auction) => {
  const { toast } = useToast();
  const [currentAuction, setCurrentAuction] = useState<Auction>(auction);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeBid = async (amount: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validation checks
      if (amount <= currentAuction.currentPrice) {
        throw new Error(`Bid must be higher than current price: $${currentAuction.currentPrice}`);
      }
      
      if (amount < currentAuction.currentPrice + currentAuction.incrementAmount) {
        throw new Error(`Minimum bid increment is $${currentAuction.incrementAmount}`);
      }
      
      const now = new Date();
      if (now > currentAuction.endDate) {
        throw new Error('Auction has ended');
      }
      
      // In a real app, this would be an API call
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Create new bid
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        auctionId: currentAuction.id,
        userId: mockUser.id,
        userName: mockUser.name,
        amount: amount,
        timestamp: new Date()
      };
      
      // Update auction with new bid
      setCurrentAuction(prev => ({
        ...prev,
        currentPrice: amount,
        bids: [newBid, ...prev.bids]
      }));
      
      return Promise.resolve();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to place bid';
      setError(message);
      toast({
        title: "Bid Error",
        description: message,
        variant: "destructive"
      });
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAuctionStatus = (): 'upcoming' | 'live' | 'ended' => {
    const now = new Date();
    
    if (now < currentAuction.startDate) {
      return 'upcoming';
    } else if (now > currentAuction.endDate) {
      return 'ended';
    } else {
      return 'live';
    }
  };

  const watchAuction = async (): Promise<void> => {
    // In a real app, this would be an API call
    // For now we'll just increment the watch count
    setCurrentAuction(prev => ({
      ...prev,
      watchCount: prev.watchCount + 1
    }));
    
    toast({
      title: "Added to watchlist",
      description: "You'll receive notifications about this auction"
    });
  };

  return {
    auction: currentAuction,
    placeBid,
    isLoading,
    error,
    getAuctionStatus,
    watchAuction
  };
};
