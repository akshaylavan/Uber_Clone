import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RiderDashboard from './pages/RiderDashboard';
import DriverDashboard from './pages/DriverDashboard';
import BookRide from './pages/BookRide';
import RideTracking from './pages/RideTracking';
import Profile from './pages/Profile';
import RideHistory from './pages/RideHistory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rider" element={<RiderDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/book-ride" element={<BookRide />} />
          <Route path="/ride-tracking" element={<RideTracking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<RideHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;