const mongoose = require('mongoose');

const bookingSChema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Listing'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    startDate: {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'confirmed', 'cancelled'],
        default : 'pending',
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSChema);