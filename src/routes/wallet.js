const express = require('express');
const FundWalletRequest = require('../request/FundWalletRequest');
const { initPayment } = require('../controllers/WalletController');
const router = express.Router();

router.post('/fund', FundWalletRequest, initPayment);

module.exports = router;