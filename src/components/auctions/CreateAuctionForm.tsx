
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, ImageIcon, Timer } from 'lucide-react';
import { Auction } from '@/types/auction';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

const conditionOptions = [
  { value: 'New', label: 'New' },
  { value: 'Like New', label: 'Like New' },
  { value: 'Good', label: 'Good' },
  { value: 'Fair', label: 'Fair' },
  { value: 'Poor', label: 'Poor' },
];

const categoryOptions = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Watches', label: 'Watches' },
  { value: 'Books', label: 'Books' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Art', label: 'Art' },
  { value: 'Collectibles', label: 'Collectibles' },
];

const durationOptions = [
  { value: '6', label: '6 hours' },
  { value: '12', label: '12 hours' },
  { value: '24', label: '1 day' },
  { value: '48', label: '2 days' },
  { value: '72', label: '3 days' },
  { value: '168', label: '7 days' },
];

// Mock function to save an auction
const saveAuction = (auction: Auction, isDraft: boolean = false): Promise<Auction> => {
  return new Promise((resolve) => {
    // In a real app, this would be an API call
    console.log('Saving auction:', auction, 'isDraft:', isDraft);
    
    // Simulate API delay
    setTimeout(() => {
      resolve(auction);
    }, 1000);
  });
};

interface CreateAuctionFormProps {
  existingAuction?: Auction; // For editing mode
  mode?: 'create' | 'edit';
}

const CreateAuctionForm: React.FC<CreateAuctionFormProps> = ({ 
  existingAuction, 
  mode = 'create' 
}) => {
  const { userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Calculate default end date based on start date and duration
  const calculateEndDate = (startDate: Date, durationHours: number): Date => {
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + durationHours);
    return endDate;
  };

  const [formData, setFormData] = useState<Partial<Auction>>(
    existingAuction || {
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
      startingPrice: 10,
      currentPrice: 0,
      incrementAmount: 5,
      category: 'Electronics',
      condition: 'New',
      status: 'draft',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 168, // Default to 7 days (168 hours)
      bids: [],
      watchCount: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // If duration changes, update the end date based on start date
    if (name === 'duration') {
      const durationHours = parseInt(value);
      const endDate = calculateEndDate(formData.startDate as Date, durationHours);
      setFormData(prev => ({ ...prev, endDate }));
    }
  };

  const handleDateChange = (name: string, value: string) => {
    if (name === 'startDate') {
      const newStartDate = new Date(value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: newStartDate,
        // Also update end date based on duration when start date changes
        endDate: calculateEndDate(newStartDate, prev.duration as number || 168)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: new Date(value) }));
    }
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.imageUrl &&
      formData.startingPrice &&
      formData.incrementAmount &&
      formData.category &&
      formData.condition &&
      formData.startDate &&
      formData.endDate
    );
  };

  const handleSave = async (publishNow: boolean = false) => {
    if (!userId || !user) {
      toast.error("You must be logged in to create an auction");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const finalAuction: Auction = {
        ...(formData as Auction),
        id: existingAuction?.id || generateId(),
        currentPrice: formData.startingPrice as number,
        seller: {
          id: userId,
          name: user?.fullName || 'Anonymous',
          avatarUrl: user?.imageUrl,
        },
        status: publishNow ? 'published' : 'draft',
      };

      await saveAuction(finalAuction, !publishNow);
      
      toast.success(
        publishNow 
          ? "Auction published successfully!" 
          : "Auction saved as draft!"
      );
      
      navigate('/my-listings');
    } catch (error) {
      console.error('Error saving auction:', error);
      toast.error("Failed to save auction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{mode === 'create' ? 'Create New Auction' : 'Edit Auction'}</CardTitle>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Item Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Dates</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          
          <CardContent className="p-6">
            <TabsContent value="details" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter item title"
                  maxLength={100}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item in detail"
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select
                    value={formData.category as string}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">Condition</label>
                  <Select
                    value={formData.condition as string}
                    onValueChange={(value) => handleSelectChange('condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Starting Price ($)</label>
                  <Input
                    type="number"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleNumberChange}
                    min={1}
                    step={0.01}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bid Increment ($)</label>
                  <Input
                    type="number"
                    name="incrementAmount"
                    value={formData.incrementAmount}
                    onChange={handleNumberChange}
                    min={0.01}
                    step={0.01}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      value={formData.startDate ? new Date(formData.startDate.getTime() - formData.startDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                      onChange={(e) => handleDateChange('startDate', e.target.value)}
                      className="pr-10"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <div className="relative">
                    <Select
                      value={formData.duration?.toString() || "168"}
                      onValueChange={(value) => handleSelectChange('duration', value)}
                    >
                      <SelectTrigger className="pr-10">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Timer className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    End date: {formData.endDate?.toLocaleString()}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Item Image URL</label>
                <Input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                <div className="border rounded-md p-2 bg-muted/30">
                  {formData.imageUrl ? (
                    <img
                      src={formData.imageUrl}
                      alt="Item preview"
                      className="w-full h-48 object-contain"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-muted/50 rounded-md">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* In a real app, you would add file upload functionality here */}
              <p className="text-xs text-muted-foreground mt-2">
                For now, please provide an external image URL. File upload functionality coming soon.
              </p>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isLoading || !isFormValid()}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? "Saving..." : "Publish Auction"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateAuctionForm;
