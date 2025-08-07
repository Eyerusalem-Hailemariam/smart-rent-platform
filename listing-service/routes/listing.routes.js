const express = require('express');
const multer = require('multer');
const { create, getListings, updateListing, deleteListing } = require('../controllers/listing.controller');
const { storage } = require('../utils/cloudinary');

const router = express.Router();

router.post('/', create);
router.get('/', getListings);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {

    try {
         if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.status(200).json({
        message: 'File uploaded successfully.',
        image: req.file.path,
        publicId: req.file.filename
    });
    }catch(error){
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

});

module.exports = router;
