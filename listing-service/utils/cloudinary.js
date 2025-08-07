const {v2: cloudinary} = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dgr325jcg',
  api_key: '463334626256935',
  api_secret: 'Yl9xliClUpZuo38J4pIya9EiGnk'
});



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'smart-rent-platform',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

module.exports = { cloudinary, storage };