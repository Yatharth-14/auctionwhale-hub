
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Heart, User, Menu, X, BellRing, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  
  // Dynamically adjust nav links based on authentication status
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', path: '/' },
      { name: 'Auctions', path: '/auctions' },
      { name: 'Categories', path: '/categories' },
    ];
    
    // Add "My Listings" for signed-in users, or "How It Works" for non-signed-in users
    if (isLoaded) {
      if (isSignedIn) {
        baseLinks.push({ name: 'My Listings', path: '/my-listings' });
      } else {
        baseLinks.push({ name: 'How It Works', path: '/how-it-works' });
      }
    }
    
    return baseLinks;
  };
  
  const navLinks = getNavLinks();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-8 py-4',
        {
          'bg-white/80 backdrop-blur-lg shadow-sm': isScrolled,
          'bg-transparent': !isScrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          AuctionHub
        </Link>
        
        {!isMobile && (
          <nav className="flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-foreground/80">
            <Search className="h-5 w-5" />
          </Button>
          
          {isLoaded && isSignedIn && (
            <>
              <Button variant="ghost" size="icon" className="text-foreground/80">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-foreground/80">
                <BellRing className="h-5 w-5" />
              </Button>
              
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              />
            </>
          )}
          
          {isLoaded && !isSignedIn && !isMobile && (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <Button size="sm">Register</Button>
              </SignUpButton>
            </>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground/80 ml-1"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            'absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden',
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block py-3 text-base font-medium transition-colors border-b border-border/50',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex justify-center space-x-4">
              {isLoaded && !isSignedIn && (
                <>
                  <SignInButton mode="modal">
                    <Button size="sm" variant="outline">Sign In</Button>
                  </SignInButton>
                  
                  <SignUpButton mode="modal">
                    <Button size="sm">Register</Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
