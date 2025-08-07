const Listing = require('../models/listing.model.js');

const create = async(req, res) => {
    try{

        const {title,type, description, price, location, image, ownerId} = req.body;
        const listing = new Listing({
            title, type, description, price, location, image, ownerId
        });
        await listing.save();
        res.status(201).json({listing});

    }catch(error){
        console.error('Error creating listing:', error);
        return res.status(500).json({message: 'Server error'});
    }
}

const getListings = async(req, res) => {
    try {
        const  {type, location, minprice, maxprice} = req.query;
        const filter = {};
        console.log('Fetching listings with filters:', req.query);

        if(type){
            filter.type = type;
        }
        if(location){
            filter.location = new RegExp(location, 'i');
        }
        if(minprice || maxprice) {
            filter.price = {};
            if(minprice) {
                filter.price.$gte = minprice;
            }
            if(maxprice) {
                filter.price.$lte = maxprice;
            }
        }

        const  listing = await Listing.find(filter);
        res.status(200).json(listing);
    } catch(error) {
        console.error('Error fetching listings:', error);
        return res.status(500).json({message: 'Server error'});
    }
}


const updateListing = async(req, res) => {
    try{

        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing) {
            return res.status(404).json({message: 'Listing not found'});
        }

        if(listing.ownerId.toString() !== req.body.ownerId){
            return res.status(403).json({message: 'Forbidden'});
        }

        Object.assign(listing, req.body);
        await listing.save();
        res.status(200).json({listing});
    } catch(error){
        console.error('Error updating listing:', error);
        return res.status(500).json({message: 'Server error'});
    }
}

const deleteListing = async(req, res) => {
    try{
        const {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing) {
            return res.status(404).json({message: 'Listing not found'});
        }
        if(listing.ownerId.toString() !== req.body.ownerId){
            return res.status(403).json({message: 'Forbidden'});
        }
        await listing.deleteOne();
        res.status(200).json({message: 'Listing deleted successfully'});
    }catch(error){
        console.error('Error deleting listing:', error);
        return res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    create,
    getListings,
    updateListing,
    deleteListing
};