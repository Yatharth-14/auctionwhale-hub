
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="animate-slide-down">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              Premium Auctions Platform
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Discover and Bid on Exclusive Items
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground mt-6 animate-slide-down" style={{ animationDelay: '100ms' }}>
            Join our community of collectors and enthusiasts. 
            Find unique items and place competitive bids in a seamless experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-slide-down" style={{ animationDelay: '200ms' }}>
            <Button size="lg" asChild className="hover-scale">
              <Link to="/auctions">
                Explore Auctions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild className="hover-scale">
              <Link to="/create-auction">
                List Your Item
                <Plus className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default Hero;
