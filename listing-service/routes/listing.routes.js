const express = require('express');
const {create, getListings, updateListing, deleteListing} = require('../controllers/listing.controller.js');
const {storage} = require('../utils/cloudinary.js');
const multer = require('multer');
const router = express.Router();
const upload = multer({ storage: storage });

router.post('/', create);
router.get('/', getListings);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send({
        message: 'File uploaded successfully.',
        image: req.file.path,
        publicId : req.file.filename,
    });
});

module.exports = router;
