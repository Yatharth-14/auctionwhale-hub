
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Edit, PlusCircle, Trash } from 'lucide-react';
import { Auction } from '@/types/auction';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';

// Mock function to get user's auctions
const getUserAuctions = (userId: string): Promise<Auction[]> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call
    console.log('Getting auctions for user:', userId);
    
    // Generate some mock auctions
    const mockAuctions: Auction[] = [
      {
        id: '1',
        title: 'Vintage Camera',
        description: 'A beautiful vintage camera in working condition',
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3164&q=80',
        startingPrice: 50,
        currentPrice: 50,
        incrementAmount: 5,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        seller: {
          id: userId,
          name: 'You',
        },
        bids: [],
        watchCount: 3,
        category: 'Electronics',
        condition: 'Good',
        status: 'published',
      },
      {
        id: '2',
        title: 'Antique Watch',
        description: 'A rare antique watch from the 1920s',
        imageUrl: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
        startingPrice: 200,
        currentPrice: 200,
        incrementAmount: 20,
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        seller: {
          id: userId,
          name: 'You',
        },
        bids: [],
        watchCount: 0,
        category: 'Watches',
        condition: 'Fair',
        status: 'draft',
      },
      {
        id: '3',
        title: 'Collectors Book',
        description: 'A rare first edition book',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
        startingPrice: 100,
        currentPrice: 125,
        incrementAmount: 10,
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        seller: {
          id: userId,
          name: 'You',
        },
        bids: [
          { id: 'b1', auctionId: '3', userId: 'user1', userName: 'Bidder 1', amount: 110, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
          { id: 'b2', auctionId: '3', userId: 'user2', userName: 'Bidder 2', amount: 125, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        ],
        watchCount: 5,
        category: 'Books',
        condition: 'Like New',
        status: 'published',
      },
      {
        id: '4',
        title: 'Deleted Item',
        description: 'This item has been deleted',
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
        startingPrice: 75,
        currentPrice: 75,
        incrementAmount: 5,
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        seller: {
          id: userId,
          name: 'You',
        },
        bids: [],
        watchCount: 0,
        category: 'Art',
        condition: 'Good',
        status: 'deleted',
      },
    ];
    
    // Simulate API delay
    setTimeout(() => {
      resolve(mockAuctions);
    }, 1000);
  });
};

// Mock function to delete an auction
const deleteAuction = (auctionId: string): Promise<void> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call
    console.log('Deleting auction:', auctionId);
    
    // Simulate API delay
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// Mock function to publish a draft auction
const publishAuction = (auctionId: string): Promise<void> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call
    console.log('Publishing auction:', auctionId);
    
    // Simulate API delay
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const getAuctionStatus = (auction: Auction) => {
  const now = new Date();
  
  if (auction.status === 'deleted') return 'deleted';
  if (auction.status === 'draft') return 'draft';
  
  if (now < auction.startDate) return 'upcoming';
  if (now > auction.endDate) return 'ended';
  return 'live';
};

const MyListings = () => {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auctionToDelete, setAuctionToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  React.useEffect(() => {
    const loadAuctions = async () => {
      if (isLoaded && isSignedIn && userId) {
        setIsLoading(true);
        try {
          const userAuctions = await getUserAuctions(userId);
          setAuctions(userAuctions);
        } catch (error) {
          console.error('Error loading auctions:', error);
          toast.error("Failed to load your listings");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadAuctions();
  }, [isLoaded, isSignedIn, userId]);
  
  const handleDeleteAuction = async () => {
    if (!auctionToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteAuction(auctionToDelete);
      // Update local state - in a real app we'd refetch from the server
      setAuctions(auctions.map(auction => 
        auction.id === auctionToDelete 
          ? { ...auction, status: 'deleted' } 
          : auction
      ));
      toast.success("Auction deleted successfully");
    } catch (error) {
      console.error('Error deleting auction:', error);
      toast.error("Failed to delete auction");
    } finally {
      setIsDeleting(false);
      setAuctionToDelete(null);
    }
  };
  
  const handlePublishDraft = async (auctionId: string) => {
    try {
      await publishAuction(auctionId);
      // Update local state - in a real app we'd refetch from the server
      setAuctions(auctions.map(auction => 
        auction.id === auctionId 
          ? { ...auction, status: 'published' } 
          : auction
      ));
      toast.success("Auction published successfully");
    } catch (error) {
      console.error('Error publishing auction:', error);
      toast.error("Failed to publish auction");
    }
  };
  
  // Filter auctions by status
  const publishedAuctions = auctions.filter(a => a.status === 'published');
  const draftAuctions = auctions.filter(a => a.status === 'draft');
  const deletedAuctions = auctions.filter(a => a.status === 'deleted');

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
            <p className="mb-6">You need to sign in to view your listings.</p>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Listings</h1>
            <Button asChild>
              <Link to="/create-auction">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Auction
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading your listings...</p>
            </div>
          ) : (
            <>
              {auctions.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-2">No Listings Yet</h2>
                  <p className="text-muted-foreground mb-6">
                    You haven't created any auctions yet. Create your first listing to get started!
                  </p>
                  <Button asChild>
                    <Link to="/create-auction">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Auction
                    </Link>
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="mb-8 grid w-full grid-cols-4">
                    <TabsTrigger value="active">Active ({publishedAuctions.length})</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts ({draftAuctions.length})</TabsTrigger>
                    <TabsTrigger value="deleted">Deleted ({deletedAuctions.length})</TabsTrigger>
                    <TabsTrigger value="all">All ({auctions.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="w-full animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {publishedAuctions.length === 0 ? (
                        <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                          <p>You don't have any active listings.</p>
                        </div>
                      ) : (
                        publishedAuctions.map(auction => (
                          <AuctionListingCard
                            key={auction.id}
                            auction={auction}
                            onEdit={() => navigate(`/edit-auction/${auction.id}`)}
                            onDelete={() => setAuctionToDelete(auction.id)}
                            onView={() => navigate(`/auction/${auction.id}`)}
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="drafts" className="w-full animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {draftAuctions.length === 0 ? (
                        <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                          <p>You don't have any draft listings.</p>
                        </div>
                      ) : (
                        draftAuctions.map(auction => (
                          <AuctionListingCard
                            key={auction.id}
                            auction={auction}
                            onEdit={() => navigate(`/edit-auction/${auction.id}`)}
                            onDelete={() => setAuctionToDelete(auction.id)}
                            onPublish={() => handlePublishDraft(auction.id)}
                            isDraft
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="deleted" className="w-full animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {deletedAuctions.length === 0 ? (
                        <div className="col-span-full text-center py-8 bg-muted/30 rounded-lg">
                          <p>You don't have any deleted listings.</p>
                        </div>
                      ) : (
                        deletedAuctions.map(auction => (
                          <AuctionListingCard
                            key={auction.id}
                            auction={auction}
                            isDeleted
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="all" className="w-full animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {auctions.map(auction => (
                        <AuctionListingCard
                          key={auction.id}
                          auction={auction}
                          onEdit={auction.status !== 'deleted' ? () => navigate(`/edit-auction/${auction.id}`) : undefined}
                          onDelete={auction.status !== 'deleted' ? () => setAuctionToDelete(auction.id) : undefined}
                          onView={auction.status === 'published' ? () => navigate(`/auction/${auction.id}`) : undefined}
                          onPublish={auction.status === 'draft' ? () => handlePublishDraft(auction.id) : undefined}
                          isDraft={auction.status === 'draft'}
                          isDeleted={auction.status === 'deleted'}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </>
          )}
        </div>
      </main>
      
      <Dialog open={!!auctionToDelete} onOpenChange={(open) => !open && setAuctionToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Auction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this auction? This action cannot be undone.
              {auctions.find(a => a.id === auctionToDelete)?.bids.length ? (
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-800 dark:text-amber-200">
                    This auction has active bids. Deleting it will hide it from other users, but bidders will still be able to see it in their history.
                  </span>
                </div>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAuctionToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAuction}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Auction"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface AuctionListingCardProps {
  auction: Auction;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onPublish?: () => void;
  isDraft?: boolean;
  isDeleted?: boolean;
}

const AuctionListingCard: React.FC<AuctionListingCardProps> = ({
  auction,
  onEdit,
  onDelete,
  onView,
  onPublish,
  isDraft = false,
  isDeleted = false,
}) => {
  const dynamicStatus = getAuctionStatus(auction);
  
  return (
    <Card className={isDeleted ? "opacity-70" : ""}>
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{auction.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ${auction.currentPrice.toFixed(2)} • {auction.bids.length} bids
            </p>
          </div>
          <div>
            {isDeleted ? (
              <Badge variant="destructive">Deleted</Badge>
            ) : isDraft ? (
              <Badge variant="outline">Draft</Badge>
            ) : (
              <Badge
                className={
                  dynamicStatus === 'live' ? "bg-green-500 hover:bg-green-600" :
                  dynamicStatus === 'upcoming' ? "bg-blue-500 hover:bg-blue-600" :
                  "bg-gray-500 hover:bg-gray-600"
                }
              >
                {dynamicStatus.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm line-clamp-2 min-h-[40px]">{auction.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 flex-wrap">
        {isDeleted ? (
          <p className="w-full text-center text-sm text-muted-foreground">
            This listing has been deleted
          </p>
        ) : (
          <>
            {onView && (
              <Button size="sm" onClick={onView} className="flex-1">
                View
              </Button>
            )}
            {onPublish && (
              <Button size="sm" onClick={onPublish} className="flex-1">
                Publish
              </Button>
            )}
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={onEdit}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={onDelete}
                className="flex-1"
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default MyListings;
