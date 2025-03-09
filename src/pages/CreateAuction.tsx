
import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import CreateAuctionForm from '@/components/auctions/CreateAuctionForm';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

const CreateAuction = () => {
  const { isSignedIn, isLoaded } = useAuth();

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
            <p className="mb-6">You need to sign in to create an auction.</p>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
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
            <h1 className="text-3xl font-bold">Create New Auction</h1>
            <p className="text-muted-foreground mt-2">
              Fill out the form below to list your item for auction
            </p>
          </div>
          
          <CreateAuctionForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
