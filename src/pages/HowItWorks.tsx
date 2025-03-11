
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Check, Search, CreditCard, PackageCheck, Shield, Users } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar />
      
      <main className="pt-20 w-full">
        {/* Hero Section */}
        <section className="responsive-section bg-muted/30">
          <div className="full-width-container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">How AuctionHub Works</h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                AuctionHub makes buying and selling through auctions simple, secure, and transparent. Learn how to get started below.
              </p>
            </div>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="responsive-section">
          <div className="full-width-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
              <ProcessStep 
                number="01" 
                title="Create an Account" 
                description="Sign up with your email or social media accounts. Verify your identity to start bidding or selling."
                icon={<Users className="w-12 h-12 text-primary" />}
              />
              <ProcessStep 
                number="02" 
                title="Browse Auctions" 
                description="Explore our extensive collection of auctions. Filter by category, price range, or auction status."
                icon={<Search className="w-12 h-12 text-primary" />}
              />
              <ProcessStep 
                number="03" 
                title="Place Bids" 
                description="Set your maximum bid amount. Our system will automatically increase your bid as needed up to your maximum."
                icon={<CreditCard className="w-12 h-12 text-primary" />}
              />
            </div>
          </div>
        </section>
        
        {/* Divider */}
        <div className="w-full max-w-6xl mx-auto border-t border-border/50"></div>
        
        {/* Additional Info */}
        <section className="responsive-section bg-muted/30">
          <div className="full-width-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">For Sellers</h2>
                <p className="text-muted-foreground mb-6">
                  List your items for auction in just a few simple steps. Set your starting price, auction duration, and watch as bids come in.
                </p>
                
                <ul className="space-y-4">
                  <SellerFeature text="Create detailed listings with high-quality photos" />
                  <SellerFeature text="Set minimum bids and reserve prices" />
                  <SellerFeature text="Automatic notifications when your items receive bids" />
                  <SellerFeature text="Secure payment processing" />
                  <SellerFeature text="Shipping and delivery management tools" />
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Selling Process</h3>
                
                <ol className="space-y-6">
                  <ProcessStepDetailed 
                    number="1" 
                    title="List Your Item" 
                    description="Fill out the listing form with details, photos, and set your starting price."
                  />
                  <ProcessStepDetailed 
                    number="2" 
                    title="Auction Goes Live" 
                    description="Once approved, your auction will be visible to thousands of potential buyers."
                  />
                  <ProcessStepDetailed 
                    number="3" 
                    title="Manage Bids" 
                    description="Monitor incoming bids and answer questions from potential buyers."
                  />
                  <ProcessStepDetailed 
                    number="4" 
                    title="Complete the Sale" 
                    description="When the auction ends, you'll be connected with the highest bidder to finalize the sale."
                  />
                </ol>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Buyers */}
        <section className="responsive-section">
          <div className="full-width-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Bidding Process</h3>
                
                <ol className="space-y-6">
                  <ProcessStepDetailed 
                    number="1" 
                    title="Find Items" 
                    description="Browse through categories or use search to find items that interest you."
                  />
                  <ProcessStepDetailed 
                    number="2" 
                    title="Research & Evaluate" 
                    description="Review item details, seller history, and current market value."
                  />
                  <ProcessStepDetailed 
                    number="3" 
                    title="Place Your Bid" 
                    description="Set your maximum bid amount and let our system automatically increase it as needed."
                  />
                  <ProcessStepDetailed 
                    number="4" 
                    title="Win & Pay" 
                    description="If you're the highest bidder when the auction ends, you'll be guided through the payment process."
                  />
                </ol>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6">For Buyers</h2>
                <p className="text-muted-foreground mb-6">
                  Find unique items at great prices. Our platform makes it easy to discover, bid, and win the items you want.
                </p>
                
                <ul className="space-y-4">
                  <SellerFeature text="Browse thousands of items across multiple categories" />
                  <SellerFeature text="Bid with confidence through our secure system" />
                  <SellerFeature text="Automatic bid increases to your maximum amount" />
                  <SellerFeature text="Notifications when you're outbid or win an auction" />
                  <SellerFeature text="Buyer protection on all purchases" />
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust & Safety */}
        <section className="responsive-section bg-muted/30">
          <div className="full-width-container">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Trust & Safety</h2>
              <p className="text-muted-foreground">
                AuctionHub prioritizes the security and satisfaction of all users. Our platform includes several features to ensure safe and successful transactions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TrustCard 
                icon={<Shield className="w-8 h-8 text-primary" />}
                title="Secure Payments"
                description="All transactions are processed through our secure payment system, protecting both buyers and sellers."
              />
              <TrustCard 
                icon={<Users className="w-8 h-8 text-primary" />}
                title="Verified Users"
                description="User verification system ensures that you're dealing with real people with established reputations."
              />
              <TrustCard 
                icon={<PackageCheck className="w-8 h-8 text-primary" />}
                title="Buyer Protection"
                description="Our buyer protection program ensures you receive exactly what was described or your money back."
              />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="responsive-section">
          <div className="full-width-container">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Have questions about how AuctionHub works? Find answers to common questions below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem 
                question="How do I start bidding?"
                answer="To start bidding, you need to create an account and verify your email. Once logged in, you can place bids on any active auction by clicking the 'Place Bid' button and entering your bid amount."
              />
              <FaqItem 
                question="What fees does AuctionHub charge?"
                answer="AuctionHub charges a small commission on successful sales, typically 5% of the final selling price. There are no fees for buyers or for listing items that don't sell."
              />
              <FaqItem 
                question="How does the bidding process work?"
                answer="You can set your maximum bid, and our system will automatically increase your bid as needed to keep you as the highest bidder, up to your maximum amount. You'll be notified if someone outbids you."
              />
              <FaqItem 
                question="What happens after I win an auction?"
                answer="After winning an auction, you'll receive instructions to complete the payment. Once payment is confirmed, the seller will be notified to ship the item to you."
              />
              <FaqItem 
                question="Can I cancel a bid once it's placed?"
                answer="In most cases, bids are binding and cannot be retracted. However, if there was a clear error in the listing, you can contact customer support for assistance."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="responsive-section bg-primary/5">
          <div className="full-width-container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who are already buying and selling on AuctionHub.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/signup" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Create an Account
                </a>
                <a href="/auctions" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors">
                  Browse Auctions
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 w-full">
        <div className="container mx-auto px-4 max-w-7xl lg:max-w-8xl xl:max-w-9xl">
          <div className="text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProcessStep = ({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) => (
  <div className="bg-card p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ProcessStepDetailed = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
      {number}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const SellerFeature = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 mt-1">
      <Check className="h-5 w-5 text-green-500" />
    </div>
    <span>{text}</span>
  </li>
);

const TrustCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-background p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-card p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <p className="text-muted-foreground">{answer}</p>
  </div>
);

export default HowItWorks;
