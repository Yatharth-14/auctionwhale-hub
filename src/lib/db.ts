
import { MongoClient, Db } from 'mongodb';

// Connection URL - replace with your actual connection string
const url = 'mongodb://localhost:27017';
const dbName = 'auctionhub';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If we already have a connection, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Otherwise create a new connection
  const client = new MongoClient(url);
  await client.connect();
  
  const db = client.db(dbName);
  
  // Cache the client and connection
  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}

// Example function to get all auctions
export async function getAuctions() {
  const { db } = await connectToDatabase();
  return db.collection('auctions').find({}).toArray();
}

// Example function to get an auction by ID
export async function getAuctionById(id: string) {
  const { db } = await connectToDatabase();
  return db.collection('auctions').findOne({ id });
}

// Example function to create a new auction
export async function createAuction(auction: any) {
  const { db } = await connectToDatabase();
  return db.collection('auctions').insertOne(auction);
}

// Example function to update an auction
export async function updateAuction(id: string, auction: any) {
  const { db } = await connectToDatabase();
  return db.collection('auctions').updateOne({ id }, { $set: auction });
}

// Example function to delete an auction
export async function deleteAuction(id: string) {
  const { db } = await connectToDatabase();
  return db.collection('auctions').deleteOne({ id });
}

// Define a proper type for the bid object
interface Bid {
  userId: string;
  amount: number;
  timestamp: Date;
  [key: string]: any; // Allow for additional properties
}

// Example function to place a bid
export async function placeBid(auctionId: string, bid: Bid) {
  const { db } = await connectToDatabase();
  return db.collection('auctions').updateOne(
    { id: auctionId },
    { 
      $push: { bids: bid },
      $set: { currentPrice: bid.amount }
    }
  );
}

// Example function to get user profile
export async function getUserProfile(userId: string) {
  const { db } = await connectToDatabase();
  return db.collection('users').findOne({ id: userId });
}

// Example function to get user's bids
export async function getUserBids(userId: string) {
  const { db } = await connectToDatabase();
  return db.collection('auctions')
    .find({ 'bids.userId': userId })
    .toArray();
}

// Example function to get user's listings
export async function getUserListings(userId: string) {
  const { db } = await connectToDatabase();
  return db.collection('auctions')
    .find({ 'seller.id': userId })
    .toArray();
}
