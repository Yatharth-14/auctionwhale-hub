
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign In to AuctionHub</h1>
          <p className="text-muted-foreground mt-2">
            Continue your bidding journey
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8">
          <ClerkSignIn 
            signUpUrl="/signup"
            redirectUrl="/auctions"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none p-0 mx-auto w-full",
                headerTitle: "text-center text-xl font-semibold",
                headerSubtitle: "text-center text-muted-foreground mb-6",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 text-sm",
                formFieldLabel: "text-sm font-medium",
                formFieldInput: "mt-1 block w-full rounded-md border-gray-300 shadow-sm",
                footer: "text-center text-sm text-gray-500",
                footerActionText: "text-primary font-medium hover:underline",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
