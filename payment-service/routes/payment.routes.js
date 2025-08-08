const express = require('express');
const router = express.Router();
const { createPayment, getPayment } = require('../controllers/payment.controller');


router.post('/', createPayment);
router.get('/:id', getPayment);

module.exports = router;