const express = require('express');
const Booking = require('../models/Booking');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { rideType, description, capacity, price, pickupAddress, destinationAddress } = req.body;
    if (!rideType || !price || !pickupAddress || !destinationAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const booking = await Booking.create({
      user: req.user._id,
      rideType,
      description,
      capacity,
      price,
      pickupAddress,
      destinationAddress,
    });
    return res.status(201).json(booking);
  } catch (err) {
    console.error('Create booking error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (err) {
    console.error('List bookings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific booking (must belong to requesting user)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return res.json(booking);
  } catch (err) {
    console.error('Get booking error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// List available bookings for drivers
router.get('/available/list', authenticateToken, async (req, res) => {
  try {
    // Only drivers should see available requests
    if (req.user.userType !== 'driver') {
      return res.status(403).json({ message: 'Drivers only' });
    }
    const bookings = await Booking.find({ status: 'requested' })
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json(bookings);
  } catch (err) {
    console.error('Available bookings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Driver accepts a booking
router.put('/:id/accept', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'driver') {
      return res.status(403).json({ message: 'Drivers only' });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'requested') {
      return res.status(409).json({ message: 'Booking already claimed' });
    }
    booking.status = 'accepted';
    booking.driver = req.user._id;
    await booking.save();
    return res.json(booking);
  } catch (err) {
    console.error('Accept booking error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Cancel a booking (rider can cancel own; driver can cancel when requested or accepted)
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const isRider = req.user.userType === 'rider' && booking.user.toString() === req.user._id.toString();
    const isDriver = req.user.userType === 'driver' && (!booking.driver || booking.driver.toString() === req.user._id.toString());

    if (!isRider && !isDriver) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(409).json({ message: `Cannot cancel a ${booking.status} booking` });
    }

    booking.status = 'cancelled';
    await booking.save();
    return res.json(booking);
  } catch (err) {
    console.error('Cancel booking error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;



