
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import CreateAuctionForm from '@/components/auctions/CreateAuctionForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import { Auction } from '@/types/auction';

// Mock function to get an auction by ID
const getAuctionById = (auctionId: string): Promise<Auction | null> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call
    console.log('Getting auction by ID:', auctionId);
    
    // Generate a mock auction
    const mockAuction: Auction = {
      id: auctionId,
      title: 'Vintage Camera',
      description: 'A beautiful vintage camera in working condition',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3164&q=80',
      startingPrice: 50,
      currentPrice: 50,
      incrementAmount: 5,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      seller: {
        id: 'mock-user-id',
        name: 'Mock User',
      },
      bids: [],
      watchCount: 3,
      category: 'Electronics',
      condition: 'Good',
      status: 'draft',
    };
    
    // Simulate API delay
    setTimeout(() => {
      resolve(mockAuction);
    }, 1000);
  });
};

const EditAuction = () => {
  const { id } = useParams<{ id: string }>();
  const { userId, isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuction = async () => {
      if (!id) {
        setError('Auction ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const auctionData = await getAuctionById(id);
        
        if (!auctionData) {
          setError('Auction not found');
        } else if (isSignedIn && userId && auctionData.seller.id !== userId) {
          setError('You do not have permission to edit this auction');
        } else {
          setAuction(auctionData);
        }
      } catch (err) {
        console.error('Error loading auction:', err);
        setError('Failed to load auction details');
        toast.error('Failed to load auction details');
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      loadAuction();
    }
  }, [id, isLoaded, isSignedIn, userId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
            <p className="mb-6">You need to sign in to edit an auction.</p>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <p>Loading auction details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !auction) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Error</h1>
            <p className="mb-6">{error || 'Auction not found'}</p>
            <Button asChild>
              <Link to="/my-listings">Back to My Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-20 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Auction</h1>
            <p className="text-muted-foreground mt-2">
              Make changes to your auction listing
            </p>
          </div>
          
          <CreateAuctionForm existingAuction={auction} mode="edit" />
        </div>
      </div>
    </div>
  );
};

export default EditAuction;
