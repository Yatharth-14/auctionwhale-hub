
import React, { useState } from 'react';
import { Auction } from '@/types/auction';
import { useBidding } from '@/lib/hooks/useBidding';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CountdownTimer from '@/components/ui/CountdownTimer';
import BidButton from '@/components/ui/BidButton';
import { ArrowLeft, Check, Clock, Heart, Info, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuctionDetailProps {
  auction: Auction;
}

const AuctionDetail: React.FC<AuctionDetailProps> = ({ auction }) => {
  const { 
    auction: currentAuction,
    placeBid, 
    isLoading,
    getAuctionStatus,
    watchAuction
  } = useBidding(auction);
  
  const [activeImage, setActiveImage] = useState(0);
  const status = getAuctionStatus();
  
  // Mock images for gallery
  const images = [
    currentAuction.imageUrl,
    'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
    'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3174&q=80',
  ];

  return (
    <div className="animate-fade-in container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8 space-x-4">
        <Link to="/auctions" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5 inline mr-1" />
          <span>Back to auctions</span>
        </Link>
        
        <Badge
          className={cn(
            "ml-auto px-2 py-1",
            status === 'live' ? "bg-green-500 hover:bg-green-600" : 
            status === 'upcoming' ? "bg-blue-500 hover:bg-blue-600" : 
            "bg-gray-500 hover:bg-gray-600"
          )}
        >
          {status.toUpperCase()}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-muted rounded-lg overflow-hidden aspect-[4/3] relative">
            <img
              src={images[activeImage]}
              alt={currentAuction.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-square rounded-md overflow-hidden transition-all hover:opacity-100",
                  activeImage === idx ? "ring-2 ring-primary" : "opacity-70"
                )}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {currentAuction.title}
            </h1>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-muted-foreground">
                {currentAuction.category}
              </span>
              •
              <span className="text-muted-foreground">
                {currentAuction.condition}
              </span>
              •
              <span className="text-muted-foreground flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {currentAuction.watchCount} watching
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">Current bid</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  ${currentAuction.currentPrice.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  {currentAuction.bids.length} {currentAuction.bids.length === 1 ? 'bid' : 'bids'}
                </span>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-4">
              <CountdownTimer endDate={currentAuction.endDate} />
            </div>
            
            <div className="space-y-2">
              {status === 'live' && (
                <BidButton 
                  auction={currentAuction} 
                  onBid={placeBid}
                  variant="quick"
                />
              )}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => watchAuction()}
              >
                <Heart className="mr-2 h-4 w-4" /> 
                Add to Watchlist
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentAuction.seller.avatarUrl} />
                <AvatarFallback>
                  {currentAuction.seller.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{currentAuction.seller.name}</p>
                <p className="text-muted-foreground">Seller</p>
              </div>
              <Button size="sm" variant="ghost" className="ml-auto">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="bids">Bid History</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 py-4">
              <p className="text-muted-foreground">
                {currentAuction.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <DetailItem 
                  icon={<Clock className="h-4 w-4" />}
                  label="Start Date"
                  value={currentAuction.startDate.toLocaleDateString()}
                />
                <DetailItem 
                  icon={<Clock className="h-4 w-4" />}
                  label="End Date"
                  value={currentAuction.endDate.toLocaleDateString()}
                />
                <DetailItem 
                  icon={<Info className="h-4 w-4" />}
                  label="Condition"
                  value={currentAuction.condition}
                />
                <DetailItem 
                  icon={<Check className="h-4 w-4" />}
                  label="Min. Increment"
                  value={`$${currentAuction.incrementAmount}`}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="bids" className="py-4">
              <Card>
                <CardContent className="p-0">
                  {currentAuction.bids.length === 0 ? (
                    <p className="p-4 text-center text-muted-foreground">
                      No bids yet. Be the first to bid!
                    </p>
                  ) : (
                    <ul className="divide-y">
                      {currentAuction.bids.map((bid) => (
                        <li key={bid.id} className="flex justify-between items-center p-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{bid.userName}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${bid.amount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              {bid.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="py-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground mb-4">
                    This item ships worldwide. Estimated delivery time is 3-5 business days.
                  </p>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Domestic shipping:</span>
                      <span className="font-medium">$10.00</span>
                    </p>
                    <p className="flex justify-between">
                      <span>International shipping:</span>
                      <span className="font-medium">$25.00</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-muted-foreground">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const Eye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default AuctionDetail;
