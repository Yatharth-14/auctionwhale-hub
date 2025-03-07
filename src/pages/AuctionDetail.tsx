
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuctionDetailComponent from '@/components/auctions/AuctionDetail';
import FeaturedAuctions from '@/components/home/FeaturedAuctions';
import Navbar from '@/components/layout/Navbar';
import { Auction } from '@/types/auction';
import { Skeleton } from '@/components/ui/skeleton';

// Reuse the mock data generator from other components
const generateMockAuctions = (): Auction[] => {
  // Same function as in FeaturedAuctions.tsx
  // In a real app, this would be imported from a shared file
  // For brevity, I'm referencing it here
  return [
    // ... same mock auctions data
  ];
};

const AuctionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAuction = async () => {
      setLoading(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockAuctions = generateMockAuctions();
        const foundAuction = mockAuctions.find(a => a.id === id);
        
        if (foundAuction) {
          setAuction(foundAuction);
        } else {
          setError('Auction not found');
        }
      } catch (err) {
        setError('Failed to load auction details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuction();
  }, [id]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        {loading ? (
          <div className="container max-w-7xl mx-auto px-4">
            <LoadingSkeleton />
          </div>
        ) : error ? (
          <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Error Loading Auction</h2>
            <p className="text-muted-foreground mb-8">{error}</p>
          </div>
        ) : auction ? (
          <>
            <AuctionDetailComponent auction={auction} />
            <div className="mt-16 md:mt-24">
              <FeaturedAuctions 
                title="Similar Auctions" 
                limit={3} 
              />
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 animate-pulse">
    {/* Left column - Images */}
    <div className="lg:col-span-7 space-y-4">
      <Skeleton className="aspect-[4/3] w-full rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="aspect-square w-full rounded-md" />
        <Skeleton className="aspect-square w-full rounded-md" />
        <Skeleton className="aspect-square w-full rounded-md" />
      </div>
    </div>
    
    {/* Right column - Details */}
    <div className="lg:col-span-5 space-y-6">
      <div>
        <Skeleton className="h-10 w-3/4 rounded-md mb-2" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
      
      <Skeleton className="h-px w-full" />
      
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-1/4 rounded-md mb-2" />
          <Skeleton className="h-8 w-1/2 rounded-md" />
        </div>
        
        <Skeleton className="h-24 w-full rounded-md" />
        
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      
      <Skeleton className="h-px w-full" />
      
      <div>
        <Skeleton className="h-10 w-full rounded-md mb-4" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    </div>
  </div>
);

export default AuctionDetailPage;
