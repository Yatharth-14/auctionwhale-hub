
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ArrowUpCircle } from 'lucide-react';
import { Auction } from '@/types/auction';

interface BidButtonProps {
  auction: Auction;
  onBid?: (amount: number) => Promise<void>;
  className?: string;
  variant?: 'default' | 'outline' | 'quick';
}

const BidButton: React.FC<BidButtonProps> = ({ 
  auction, 
  onBid, 
  className,
  variant = 'default'
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickBids, setShowQuickBids] = useState(false);
  
  const currentPrice = auction.currentPrice;
  const minimumBid = currentPrice + auction.incrementAmount;
  
  // Calculate quick bid amounts
  const quickBidAmounts = [
    minimumBid,
    minimumBid + auction.incrementAmount,
    minimumBid + (auction.incrementAmount * 2),
    minimumBid + (auction.incrementAmount * 5)
  ];

  const handleBid = async (amount: number) => {
    if (amount < minimumBid) {
      toast({
        title: "Invalid bid amount",
        description: `Minimum bid must be ${minimumBid}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (onBid) {
        await onBid(amount);
      }
      
      toast({
        title: "Bid placed successfully!",
        description: `Your bid of $${amount.toLocaleString()} has been placed.`
      });
      
      setShowQuickBids(false);
    } catch (error) {
      toast({
        title: "Failed to place bid",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For quick bid variant used in auction detail page
  if (variant === 'quick') {
    return (
      <div className={cn("space-y-3", className)}>
        <Button 
          onClick={() => setShowQuickBids(!showQuickBids)} 
          className="w-full justify-between gap-2 bg-primary hover:bg-primary/90 text-white"
          disabled={isLoading}
        >
          <span className="flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5" />
            Place Bid
          </span>
          <span className="text-sm font-semibold">
            Min: ${minimumBid.toLocaleString()}
          </span>
        </Button>
        
        {showQuickBids && (
          <div className="grid grid-cols-2 gap-2 animate-fade-in">
            {quickBidAmounts.map((amount) => (
              <Button 
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => handleBid(amount)}
                disabled={isLoading}
                className="transition-all hover:scale-[1.02]"
              >
                ${amount.toLocaleString()}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default bid button for cards
  return (
    <Button
      className={cn(
        "transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      variant={variant}
      onClick={() => handleBid(minimumBid)}
      disabled={isLoading}
    >
      Bid ${minimumBid.toLocaleString()}
    </Button>
  );
};

export default BidButton;
