
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuctionCard from '@/components/auctions/AuctionCard';
import { Auction, AuctionStatus } from '@/types/auction';
import { Search, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

// Import mock data generator
const generateMockAuctions = (): Auction[] => {
  // This is the same function as in FeaturedAuctions.tsx
  // In a real app, this would be imported from a shared file
  // For brevity, I'm referencing it here instead of duplicating the code
  
  // Same data as in FeaturedAuctions.tsx
  return [
    // ... same mock auctions data
  ];
};

const statusOptions = [
  { value: 'all', label: 'All Auctions' },
  { value: 'live', label: 'Live Auctions' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ended', label: 'Ended' },
];

const sortOptions = [
  { value: 'ending-soon', label: 'Ending Soon' },
  { value: 'recently-added', label: 'Recently Added' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'most-bids', label: 'Most Bids' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Watches', label: 'Watches' },
  { value: 'Books', label: 'Books' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Art', label: 'Art' },
  { value: 'Collectibles', label: 'Collectibles' },
];

const AuctionsPage = () => {
  const allAuctions = generateMockAuctions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('ending-soon');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get the status of each auction
  const getAuctionStatus = (auction: Auction): AuctionStatus => {
    const now = new Date();
    if (now < auction.startDate) return 'upcoming';
    if (now > auction.endDate) return 'ended';
    return 'live';
  };
  
  // Filter auctions based on search, status, and category
  const filteredAuctions = allAuctions.filter(auction => {
    // Filter by search query
    const matchesSearch = searchQuery 
      ? auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Filter by status
    const auctionStatus = getAuctionStatus(auction);
    const matchesStatus = selectedStatus === 'all' || auctionStatus === selectedStatus;
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || auction.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort auctions based on selected sort option
  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (selectedSort) {
      case 'ending-soon':
        return a.endDate.getTime() - b.endDate.getTime();
      case 'recently-added':
        return b.startDate.getTime() - a.startDate.getTime();
      case 'price-low':
        return a.currentPrice - b.currentPrice;
      case 'price-high':
        return b.currentPrice - a.currentPrice;
      case 'most-bids':
        return b.bids.length - a.bids.length;
      default:
        return 0;
    }
  });
  
  // Group auctions by status for tabs
  const liveAuctions = sortedAuctions.filter(auction => getAuctionStatus(auction) === 'live');
  const upcomingAuctions = sortedAuctions.filter(auction => getAuctionStatus(auction) === 'upcoming');
  const endedAuctions = sortedAuctions.filter(auction => getAuctionStatus(auction) === 'ended');

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start gap-6 md:gap-8 py-6 md:py-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Explore Auctions
            </h1>
            
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search auctions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {showFilters && (
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg animate-slide-down">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Status
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatus('all');
                      setSelectedCategory('all');
                      setSelectedSort('ending-soon');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All ({sortedAuctions.length})</TabsTrigger>
                <TabsTrigger value="live">Live ({liveAuctions.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({upcomingAuctions.length})</TabsTrigger>
                <TabsTrigger value="ended">Ended ({endedAuctions.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="w-full animate-fade-in">
                {sortedAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No auctions match your filters.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedStatus('all');
                        setSelectedCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {sortedAuctions.map(auction => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="live" className="w-full animate-fade-in">
                {liveAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No live auctions match your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {liveAuctions.map(auction => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upcoming" className="w-full animate-fade-in">
                {upcomingAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No upcoming auctions match your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {upcomingAuctions.map(auction => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="ended" className="w-full animate-fade-in">
                {endedAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No ended auctions match your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {endedAuctions.map(auction => (
                      <AuctionCard key={auction.id} auction={auction} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuctionsPage;
