
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Lightbulb, ArrowRightLeft, CreditCard, Truck, ShieldCheck, Clock, Users, SquareCheck } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <section className="py-12 md:py-16 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">How AuctionHub Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
              Our platform makes buying and selling through auctions simple, secure, and transparent.
              Follow these easy steps to get started.
            </p>
          </section>
          
          {/* Main Steps */}
          <section className="py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <StepCard 
                number="1" 
                title="Browse & Discover" 
                description="Explore our curated collection of unique items from trusted sellers around the world."
                icon={Lightbulb}
              />
              <StepCard 
                number="2" 
                title="Bid & Win" 
                description="Place competitive bids on your favorite items and track auctions in real-time."
                icon={ArrowRightLeft}
              />
              <StepCard 
                number="3" 
                title="Pay & Receive" 
                description="Secure payment processing and reliable shipping options for a seamless experience."
                icon={CreditCard}
              />
            </div>
          </section>
          
          {/* Detailed Process */}
          <section className="py-12 md:py-16 bg-muted/30 rounded-2xl my-8 md:my-12">
            <div className="px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">The Complete Auction Process</h2>
              
              <div className="space-y-12">
                <ProcessStep 
                  title="Finding Items" 
                  description="Use our powerful search and filtering options to discover items you're interested in. Browse by category, condition, price range, or auction status."
                  icon={SquareCheck}
                />
                
                <ProcessStep 
                  title="Placing Bids" 
                  description="Once you find an item you like, you can place a bid by entering your maximum offer. Our system will automatically bid on your behalf up to your maximum amount."
                  icon={ArrowRightLeft}
                />
                
                <ProcessStep 
                  title="Winning Auctions" 
                  description="If you're the highest bidder when an auction ends, congratulations! You'll receive a notification that you've won, and you can proceed to checkout."
                  icon={Users}
                />
                
                <ProcessStep 
                  title="Payment & Shipping" 
                  description="After winning an auction, you'll complete the payment through our secure payment system. The seller will then ship the item to your specified address."
                  icon={Truck}
                />
              </div>
            </div>
          </section>
          
          {/* Features & Benefits */}
          <section className="py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose AuctionHub?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BenefitCard 
                title="Secure Transactions" 
                description="Our platform uses bank-level security to protect your personal and payment information."
                icon={ShieldCheck}
              />
              
              <BenefitCard 
                title="Real-Time Updates" 
                description="Get instant notifications about new bids, auction endings, and more."
                icon={Clock}
              />
              
              <BenefitCard 
                title="Verified Sellers" 
                description="We verify all sellers to ensure authenticity and reliability."
                icon={Users}
              />
              
              <BenefitCard 
                title="Buyer Protection" 
                description="Our buyer protection program ensures you get what you paid for or your money back."
                icon={ShieldCheck}
              />
              
              <BenefitCard 
                title="Easy Returns" 
                description="If an item doesn't match the description, we make returns simple and hassle-free."
                icon={Truck}
              />
              
              <BenefitCard 
                title="24/7 Support" 
                description="Our customer support team is available around the clock to assist with any questions or issues."
                icon={Users}
              />
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-muted/30 rounded-2xl my-8 md:my-12">
            <div className="px-4 md:px-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                <FaqItem 
                  question="How do I create an account?" 
                  answer="Creating an account is easy! Click on the 'Register' button in the top right corner of the page, enter your email and create a password, then verify your email address."
                />
                
                <FaqItem 
                  question="How do I place a bid?" 
                  answer="To place a bid, navigate to the auction page of the item you're interested in, enter your bid amount (which must be at least the current bid plus the increment amount), and click 'Place Bid'."
                />
                
                <FaqItem 
                  question="What happens if I win an auction?" 
                  answer="If you win an auction, you'll receive a notification via email and on the platform. You'll then have a specified time period to complete the payment for the item."
                />
                
                <FaqItem 
                  question="How do I sell on AuctionHub?" 
                  answer="To sell on AuctionHub, you need to create a seller account. Once approved, you can list items by clicking on 'Create Auction' and filling out the listing form with details and images."
                />
                
                <FaqItem 
                  question="What fees does AuctionHub charge?" 
                  answer="AuctionHub charges a small percentage of the final sale price as a commission. There are no listing fees or other hidden charges."
                />
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already buying and selling on AuctionHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/signup" 
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Create an Account
              </a>
              <a 
                href="/auctions" 
                className="bg-secondary text-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors"
              >
                Browse Auctions
              </a>
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-8 w-full">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} AuctionHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Component for the main process steps
const StepCard = ({ number, title, description, icon: Icon }: { 
  number: string; 
  title: string; 
  description: string;
  icon: React.ElementType;
}) => (
  <Card className="p-6 text-left h-full flex flex-col transition-all duration-300 hover:shadow-md">
    <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-12 h-12 mb-4">
      <Icon className="h-6 w-6" />
    </div>
    <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold mb-4">
      Step {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

// Component for the detailed process steps
const ProcessStep = ({ title, description, icon: Icon }: { 
  title: string; 
  description: string;
  icon: React.ElementType;
}) => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-left">
    <div className="flex-shrink-0">
      <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-12 h-12">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Component for benefits cards
const BenefitCard = ({ title, description, icon: Icon }: { 
  title: string; 
  description: string;
  icon: React.ElementType;
}) => (
  <Card className="p-6 text-left h-full flex flex-col transition-all duration-300 hover:shadow-md">
    <div className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-12 h-12 mb-4">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </Card>
);

// Component for FAQ items
const FaqItem = ({ question, answer }: { 
  question: string; 
  answer: string;
}) => (
  <div className="border-b border-border pb-4 text-left">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <p className="text-muted-foreground">{answer}</p>
  </div>
);

export default HowItWorks;
