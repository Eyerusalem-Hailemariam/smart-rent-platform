const Booking = require('../models/booking.model');

const createBooking = async(req, res) => {
    try {
        const {listingId, startDate, endDate} = req.body;
        const userId = req.headers['x-user-id'];

        const overlapping = await Booking.findOne({
            listingId,
            status : { $in : ['pending', 'confirmed'] },
            $or: [
                {startDate : {$lte: endDate},
                endDate : {$gte: startDate}}
            ]
        })

        if(overlapping){
            return res.status(400).json({message : 'Listing is already booked'})
        }

        const booking = await Booking.create({
            listingId,
            userId,
            startDate,
            endDate
        });
        return res.status(201).json({message: 'Booking created successfully', booking});
    }catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBookings = async(req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ bookings });
    }catch(error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    createBooking,
    getBookings
};