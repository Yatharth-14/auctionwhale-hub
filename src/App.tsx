
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import CreateAuction from './pages/CreateAuction';
import EditAuction from './pages/EditAuction';
import MyListings from './pages/MyListings';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auctions" element={<Auctions />} />
      <Route path="/auction/:id" element={<AuctionDetail />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/create-auction" element={<CreateAuction />} />
      <Route path="/edit-auction/:id" element={<EditAuction />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
