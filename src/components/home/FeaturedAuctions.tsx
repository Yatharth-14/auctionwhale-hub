
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuctionCard from '@/components/auctions/AuctionCard';
import { Auction } from '@/types/auction';
import { ArrowRight } from 'lucide-react';

// Sample data (in a real app, this would come from an API)
const generateMockAuctions = (): Auction[] => {
  return [
    {
      id: "auction-1",
      title: "Vintage Mechanical Watch",
      description: "Rare vintage mechanical watch in excellent condition. Features a leather strap and gold-plated case. Perfect for collectors.",
      imageUrl: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      startingPrice: 1200,
      currentPrice: 1500,
      incrementAmount: 50,
      startDate: new Date(Date.now() - 86400000), // 1 day ago
      endDate: new Date(Date.now() + 172800000),  // 2 days from now
      seller: {
        id: "seller-1",
        name: "Vintage Collections",
        avatarUrl: "https://i.pravatar.cc/150?img=1"
      },
      bids: [
        {
          id: "bid-1",
          auctionId: "auction-1",
          userId: "user-2",
          userName: "Emma Wilson",
          amount: 1500,
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: "bid-2",
          auctionId: "auction-1",
          userId: "user-3",
          userName: "Michael Brown",
          amount: 1450,
          timestamp: new Date(Date.now() - 7200000)
        }
      ],
      watchCount: 42,
      category: "Watches",
      condition: "Good",
      featured: true
    },
    {
      id: "auction-2",
      title: "Professional DSLR Camera Kit",
      description: "Complete professional DSLR camera kit including lenses, tripod, and carrying case. Perfect for photography enthusiasts.",
      imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      startingPrice: 2000,
      currentPrice: 2300,
      incrementAmount: 100,
      startDate: new Date(Date.now() - 172800000), // 2 days ago
      endDate: new Date(Date.now() + 259200000),   // 3 days from now
      seller: {
        id: "seller-2",
        name: "Pro Camera Shop",
        avatarUrl: "https://i.pravatar.cc/150?img=2"
      },
      bids: [
        {
          id: "bid-3",
          auctionId: "auction-2",
          userId: "user-4",
          userName: "Sophia Martinez",
          amount: 2300,
          timestamp: new Date(Date.now() - 10800000)
        }
      ],
      watchCount: 27,
      category: "Electronics",
      condition: "Like New",
      featured: true
    },
    {
      id: "auction-3",
      title: "Mid-Century Modern Desk Chair",
      description: "Authentic mid-century modern desk chair with original upholstery. Excellent condition with minor wear consistent with age.",
      imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      startingPrice: 800,
      currentPrice: 950,
      incrementAmount: 25,
      startDate: new Date(Date.now() - 259200000), // 3 days ago
      endDate: new Date(Date.now() + 345600000),   // 4 days from now
      seller: {
        id: "seller-3",
        name: "Vintage Furniture Co.",
        avatarUrl: "https://i.pravatar.cc/150?img=3"
      },
      bids: [
        {
          id: "bid-4",
          auctionId: "auction-3",
          userId: "user-5",
          userName: "David Johnson",
          amount: 950,
          timestamp: new Date(Date.now() - 14400000)
        },
        {
          id: "bid-5",
          auctionId: "auction-3",
          userId: "user-6",
          userName: "Olivia Garcia",
          amount: 900,
          timestamp: new Date(Date.now() - 18000000)
        },
        {
          id: "bid-6",
          auctionId: "auction-3",
          userId: "user-7",
          userName: "William Davis",
          amount: 875,
          timestamp: new Date(Date.now() - 21600000)
        }
      ],
      watchCount: 19,
      category: "Furniture",
      condition: "Good",
      featured: false
    },
    {
      id: "auction-4",
      title: "Rare First Edition Book",
      description: "First edition of a classic novel in excellent condition. Includes original dust jacket and matching slipcase.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      startingPrice: 1500,
      currentPrice: 1500,
      incrementAmount: 100,
      startDate: new Date(Date.now() + 86400000),  // 1 day from now
      endDate: new Date(Date.now() + 604800000),   // 7 days from now
      seller: {
        id: "seller-4",
        name: "Rare Books Collector",
        avatarUrl: "https://i.pravatar.cc/150?img=4"
      },
      bids: [],
      watchCount: 35,
      category: "Books",
      condition: "Good",
      featured: false
    },
    {
      id: "auction-5",
      title: "Handcrafted Gold Necklace",
      description: "Exquisite handcrafted 18k gold necklace with diamond pendant. Comes with certificate of authenticity and original box.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",
      startingPrice: 3000,
      currentPrice: 3250,
      incrementAmount: 250,
      startDate: new Date(Date.now() - 432000000), // 5 days ago
      endDate: new Date(Date.now() + 86400000),    // 1 day from now
      seller: {
        id: "seller-5",
        name: "Luxury Jewelry House",
        avatarUrl: "https://i.pravatar.cc/150?img=5"
      },
      bids: [
        {
          id: "bid-7",
          auctionId: "auction-5",
          userId: "user-8",
          userName: "Emily Wilson",
          amount: 3250,
          timestamp: new Date(Date.now() - 28800000)
        },
        {
          id: "bid-8",
          auctionId: "auction-5",
          userId: "user-9",
          userName: "James Miller",
          amount: 3000,
          timestamp: new Date(Date.now() - 36000000)
        }
      ],
      watchCount: 52,
      category: "Jewelry",
      condition: "New",
      featured: true
    }
  ];
};

interface FeaturedAuctionsProps {
  title?: string;
  viewAllLink?: string;
  limit?: number;
}

const FeaturedAuctions: React.FC<FeaturedAuctionsProps> = ({
  title = "Featured Auctions",
  viewAllLink = "/auctions",
  limit = 5
}) => {
  const auctions = generateMockAuctions().slice(0, limit);

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          
          <Button variant="ghost" asChild>
            <Link to={viewAllLink} className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction, index) => (
            <AuctionCard 
              key={auction.id} 
              auction={auction} 
              featured={index === 0}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuctions;
