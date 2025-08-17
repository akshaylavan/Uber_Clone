import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Car, Navigation, Star, CreditCard } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';

const RiderDashboard = () => {
  const [destination, setDestination] = useState('');
  const { address: currentLocation, isLoading: isLoadingLocation, error: locationError, refetch } = useGeolocation();
  const [manualLocation, setManualLocation] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  const recentTrips = [
    {
      id: 1,
      destination: 'Downtown Mall',
      date: '2 hours ago',
      rating: 5,
      fare: '₹950'
    },
    {
      id: 2,
      destination: 'Airport Terminal 1',
      date: 'Yesterday',
      rating: 4,
      fare: '₹3,415'
    },
    {
      id: 3,
      destination: 'Central Park',
      date: '3 days ago',
      rating: 5,
      fare: '₹1,420'
    }
  ];

  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
    if (!useCurrentLocation && !currentLocation) {
      refetch();
    }
  };

  const displayLocation = useCurrentLocation ? currentLocation : manualLocation;
  const locationPlaceholder = useCurrentLocation ? 
    (isLoadingLocation ? 'Getting your location...' : 'Current location') : 
    'Enter pickup location';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, {localStorage.getItem('userName') || 'Rider'}!
          </h1>
          <p className="text-gray-600">Where would you like to go today?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Book a ride</h2>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Navigation className="h-5 w-5 text-green-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    placeholder={locationPlaceholder}
                    value={displayLocation}
                    onChange={(e) => {
                      if (!useCurrentLocation) {
                        setManualLocation(e.target.value);
                      }
                    }}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    disabled={isLoadingLocation || (useCurrentLocation && currentLocation)}
                    readOnly={useCurrentLocation && currentLocation}
                  />
                  {isLoadingLocation && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleLocationToggle}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    disabled={isLoadingLocation}
                  >
                    {useCurrentLocation ? 'Enter location manually' : 'Use current location'}
                  </button>
                  
                  {useCurrentLocation && locationError && (
                    <button
                      onClick={refetch}
                      className="text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                      disabled={isLoadingLocation}
                    >
                      Retry location
                    </button>
                  )}
                </div>
                
                {locationError && (
                  <p className="text-sm text-red-600 mt-1">{locationError}</p>
                )}
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>
                
                <Link
                  to="/book-ride"
                  className="w-full bg-black text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 text-center block"
                >
                  Find rides
                </Link>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Map will be displayed here</p>
                  <p className="text-sm text-gray-400">Showing nearby drivers and routes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick actions</h3>
              <div className="space-y-3">
                <Link
                  to="/book-ride"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Car className="h-5 w-5 text-gray-600" />
                  <span>Book a ride now</span>
                </Link>
                
                <Link
                  to="/history"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Ride history</span>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>Payment methods</span>
                </Link>
              </div>
            </div>

            {/* Recent Trips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent trips</h3>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{trip.destination}</p>
                        <p className="text-sm text-gray-500">{trip.date}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < trip.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">{trip.fare}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;