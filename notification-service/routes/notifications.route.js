const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notifications.controller')
const router = express.Router();


router.post('/', sendNotification);
router.get('/:userId', getNotifications);

module.exports = router;
