const express = require('express');
const {createListing, getListings, updateListing, deleteListing} = require('../controllers/listing.controller.js');

const router = express.Router();

router.post('/', createListing);
router.get('/', getListings);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

module.exports = router;
