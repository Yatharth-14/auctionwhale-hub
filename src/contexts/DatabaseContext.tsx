
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MongoClient, Db } from 'mongodb';
import { connectToDatabase } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

interface DatabaseContextType {
  db: Db | null;
  isConnected: boolean;
  isLoading: boolean;
  error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isConnected: false,
  isLoading: true,
  error: null
});

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const [db, setDb] = useState<Db | null>(null);
  const [client, setClient] = useState<MongoClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const connect = async () => {
      try {
        setIsLoading(true);
        // In browser environments, MongoDB won't connect directly
        // We'll simulate a successful connection for frontend development
        if (typeof window !== 'undefined') {
          console.log('Browser environment detected, simulating MongoDB connection');
          // Simulate connection after a short delay
          setTimeout(() => {
            setIsConnected(true);
            setIsLoading(false);
          }, 500);
          return;
        }

        // This will only run in Node.js environment
        const { client, db } = await connectToDatabase();
        setClient(client);
        setDb(db);
        setIsConnected(true);
        console.log('Connected to MongoDB');
      } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        // Show user-friendly error toast
        toast({
          title: "Database Connection Error",
          description: "Unable to connect to the database. Some features may be limited.",
          variant: "destructive"
        });
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    connect();

    // Cleanup function to close connection when component unmounts
    return () => {
      if (client) {
        client.close().catch(console.error);
      }
    };
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isConnected, isLoading, error }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
