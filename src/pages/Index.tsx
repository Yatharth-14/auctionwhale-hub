import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedAuctions from '@/components/home/FeaturedAuctions';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      
      <main className="w-full">
        <Hero />
        <FeaturedAuctions />
        
        {/* Statistics Section */}
        <section className="py-16 md:py-20 lg:py-24 w-full bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              <Stat value="100K+" label="Active Users" />
              <Stat value="25K+" label="Auctions Completed" />
              <Stat value="$10M+" label="Trading Volume" />
              <Stat value="99.8%" label="Satisfaction Rate" />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 w-full">
          <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes buying and selling through auctions simple, secure, and transparent.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Step 
                number="01" 
                title="Browse & Discover" 
                description="Explore our curated collection of unique items from trusted sellers around the world."
              />
              <Step 
                number="02" 
                title="Bid & Win" 
                description="Place competitive bids on your favorite items and track auctions in real-time."
              />
              <Step 
                number="03" 
                title="Pay & Receive" 
                description="Secure payment processing and reliable shipping options for a seamless experience."
              />
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 md:py-24 w-full bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Popular Categories</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <CategoryCard title="Watches" imageUrl="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3" />
              <CategoryCard title="Jewelry" imageUrl="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3" />
              <CategoryCard title="Electronics" imageUrl="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3" />
              <CategoryCard title="Art" imageUrl="https://images.unsplash.com/photo-1578926288207-32356ad1d8b1?ixlib=rb-4.0.3" />
              <CategoryCard title="Collectibles" imageUrl="https://images.unsplash.com/photo-1529246479227-a89c3ff68836?ixlib=rb-4.0.3" />
              <CategoryCard title="Furniture" imageUrl="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3" />
              <CategoryCard title="Fashion" imageUrl="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3" />
              <CategoryCard title="Books" imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3" />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 w-full">
          <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Bidding?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join our community today and discover unique items from trusted sellers. 
                Start bidding on your favorite items and experience the thrill of auctions.
              </p>
              
              {isLoaded && !isSignedIn && (
                <Link to="/signup" className="inline-block">
                  <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Create Account
                  </button>
                </Link>
              )}
              
              {isLoaded && isSignedIn && (
                <Link to="/auctions" className="inline-block">
                  <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Explore Auctions
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 w-full">
        <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AuctionHub</h3>
              <p className="text-muted-foreground">
                The premier platform for online auctions, connecting buyers and sellers worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Auctions</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Categories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to receive updates on new auctions and exclusive offers.
              </p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="px-3 py-2 bg-background border border-border rounded-md flex-grow"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div className="transform transition-transform hover:scale-105 duration-300">
    <p className="text-3xl md:text-4xl font-bold mb-2">{value}</p>
    <p className="text-muted-foreground">{label}</p>
  </div>
);

const Step = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="bg-muted/30 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
    <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const CategoryCard = ({ title, imageUrl }: { title: string; imageUrl: string }) => (
  <a 
    href="#" 
    className="group relative rounded-lg overflow-hidden aspect-square hover-scale"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <h3 className="absolute bottom-4 left-4 right-4 text-white font-medium z-20">
      {title}
    </h3>
  </a>
);

export default Index;
