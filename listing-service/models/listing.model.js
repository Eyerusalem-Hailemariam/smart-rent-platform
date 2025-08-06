const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        enum : ['home', 'car', 'truck'], 
        required: [true, "Title is required"],
        minlength: 2,
        maxlength: 100,
    },
    description : {
        type: String,
        required: [true, "Description is required"],
        minlength: 10,
        maxlength: 500,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: 2,
        maxlength: 100,
    },
    image: {
        type : String,
        required: [true, "Image URL is required"],
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Owner ID is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

module.exports = mongoose.model('Listing', listingSchema);