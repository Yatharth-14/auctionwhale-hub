
import React from 'react';
import { Link } from 'react-router-dom';
import { Auction, AuctionStatus } from '@/types/auction';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CountdownTimer from '@/components/ui/CountdownTimer';
import BidButton from '@/components/ui/BidButton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
  className?: string;
  featured?: boolean;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ 
  auction, 
  className,
  featured = false
}) => {
  const { toast } = useToast();
  const now = new Date();
  
  let status: AuctionStatus = 'live';
  if (now < auction.startDate) status = 'upcoming';
  if (now > auction.endDate) status = 'ended';
  
  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to watchlist",
      description: `${auction.title} has been added to your watchlist`
    });
  };

  return (
    <Link to={`/auction/${auction.id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md group",
          featured ? "md:col-span-2 lg:col-span-2" : "",
          className
        )}
      >
        <div className="relative overflow-hidden">
          {/* Status badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              className={cn(
                "px-2 py-1 text-xs capitalize",
                status === 'live' ? "bg-green-500 hover:bg-green-600" : 
                status === 'upcoming' ? "bg-blue-500 hover:bg-blue-600" : 
                "bg-gray-500 hover:bg-gray-600"
              )}
            >
              {status}
            </Badge>
          </div>
          
          {/* Watchlist button */}
          <button 
            onClick={handleWatchClick}
            className="absolute top-3 right-3 z-10 rounded-full p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          
          {/* Image */}
          <div 
            className={cn(
              "relative w-full overflow-hidden bg-gray-100",
              featured ? "aspect-[21/9]" : "aspect-square"
            )}
          >
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              )}
            />
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold tracking-tight mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200">
            {auction.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-muted-foreground text-sm">
              {auction.category}
            </span>
            •
            <span className="text-muted-foreground text-sm">
              {auction.condition}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {auction.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current bid</p>
              <p className="text-2xl font-semibold">
                ${auction.currentPrice.toLocaleString()}
              </p>
            </div>
            
            <CountdownTimer 
              endDate={auction.endDate} 
              compact={true} 
            />
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {auction.bids.length} {auction.bids.length === 1 ? 'bid' : 'bids'}
          </div>
          
          {status === 'live' && (
            <BidButton 
              auction={auction} 
              variant="outline"
            />
          )}
          
          {status === 'upcoming' && (
            <span className="text-sm font-medium text-muted-foreground">
              Starts {auction.startDate.toLocaleDateString()}
            </span>
          )}
          
          {status === 'ended' && (
            <span className="text-sm font-medium text-muted-foreground">
              Auction ended
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AuctionCard;
