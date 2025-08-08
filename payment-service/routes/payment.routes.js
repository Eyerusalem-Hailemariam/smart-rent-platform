const express = require('express');
const router = express.Router();
const { createPayment, getPayment } = require('../controllers/payment.controller');
const { handleWebhook} = require('../controller/payment.controller');



router.post('/', createPayment);
router.get('/:id', getPayment);
router.post('/webhook', express.raw({ type: 'application/json'}), handleWebhook)


module.exports = router;