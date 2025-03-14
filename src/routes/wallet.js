const express = require('express');
const FundWalletRequest = require('../request/FundWalletRequest');
const { initPayment, transferFund } = require('../controllers/WalletController');
const TransferFundRequest = require('../request/TransferFundsRequest');
const router = express.Router();

router.post('/fund', FundWalletRequest, initPayment);
router.post('/transfer-funds', TransferFundRequest, transferFund);


module.exports = router;