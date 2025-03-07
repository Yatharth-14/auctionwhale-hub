
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Package, Heart, ClockIcon, History } from 'lucide-react';

const UserProfile = () => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please sign in to view your profile</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <img 
                src={user.imageUrl} 
                alt={user.fullName || 'User'} 
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
              />
              <h2 className="text-xl font-bold mt-4">{user.fullName}</h2>
              <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
              <Button variant="outline" size="sm" className="mt-4">
                <Settings className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <Tabs defaultValue="my-bids" className="w-full">
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="my-bids" className="flex gap-1 items-center">
                  <Package className="w-4 h-4" /> My Bids
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="flex gap-1 items-center">
                  <Heart className="w-4 h-4" /> Watchlist
                </TabsTrigger>
                <TabsTrigger value="history" className="flex gap-1 items-center">
                  <History className="w-4 h-4" /> History
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex gap-1 items-center">
                  <Settings className="w-4 h-4" /> Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-bids" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Active Bids</CardTitle>
                    <CardDescription>Auctions where you have placed bids.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>You don't have any active bids</p>
                      <Button variant="outline" className="mt-4">
                        Browse Auctions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="watchlist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Watchlist</CardTitle>
                    <CardDescription>Auctions you're watching.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Your watchlist is empty</p>
                      <Button variant="outline" className="mt-4">
                        Find Auctions to Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Auction History</CardTitle>
                    <CardDescription>Your past auction activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <ClockIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>No auction history found</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Configure the emails you want to receive</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <h3 className="text-lg font-medium">Payment Methods</h3>
                      <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
