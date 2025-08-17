import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Clock, MapPin, ToggleLeft, ToggleRight, Star, User } from 'lucide-react';

const DriverDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  const rideRequests = [
    {
      id: 1,
      rider: 'Sarah Johnson',
      pickup: '123 Main St',
      destination: 'Downtown Mall',
      distance: '2.3 miles',
      fare: '₹950',
      rating: 4.8,
      estimatedTime: '8 min'
    },
    {
      id: 2,
      rider: 'Mike Chen',
      pickup: '456 Oak Ave',
      destination: 'Airport Terminal 1',
      distance: '15.2 miles',
      fare: '₹3,415',
      rating: 4.9,
      estimatedTime: '5 min'
    },
    {
      id: 3,
      rider: 'Emily Davis',
      pickup: '789 Pine Rd',
      destination: 'Central Park',
      distance: '5.1 miles',
      fare: '₹1,420',
      rating: 4.7,
      estimatedTime: '12 min'
    }
  ];

  const todayStats = {
    earnings: 11025,
    trips: 12,
    hours: 6.5,
    rating: 4.92
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Driver Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {localStorage.getItem('userName') || 'Driver'}!
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className="focus:outline-none"
              >
                {isOnline ? (
                  <ToggleRight className="h-8 w-8 text-green-500" />
                ) : (
                  <ToggleLeft className="h-8 w-8 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Earnings</p>
                    <p className="text-2xl font-bold text-green-600">₹{todayStats.earnings.toLocaleString('en-IN')}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Trips Completed</p>
                    <p className="text-2xl font-bold text-blue-600">{todayStats.trips}</p>
                  </div>
                  <Car className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hours Online</p>
                    <p className="text-2xl font-bold text-purple-600">{todayStats.hours}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">{todayStats.rating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Ride Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">
                {isOnline ? 'Available Ride Requests' : 'Go online to see ride requests'}
              </h2>
              
              {isOnline ? (
                <div className="space-y-4">
                  {rideRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{request.rider}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{request.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{request.fare}</p>
                          <p className="text-sm text-gray-500">{request.distance}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{request.pickup}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{request.destination}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">
                          Accept
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
                          Decline
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Estimated pickup in {request.estimatedTime}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">You're currently offline</p>
                  <button
                    onClick={() => setIsOnline(true)}
                    className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Go Online
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Map and Quick Actions */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Your Location</h3>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Live location tracking</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/history"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Trip History</span>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span>Profile Settings</span>
                </Link>
                
                <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <span>Earnings Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;