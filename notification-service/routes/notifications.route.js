const express = require('express');
const { sendNotification } = require('../controllers/notifications.controller')
const router = express.Router();


router.post('/', sendNotification);

module.exports = router;
