
import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // You can add more authentication logic here as needed
  
  return <>{children}</>;
};

export default AuthProvider;
