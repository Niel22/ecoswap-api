const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const profileRoute = require('./profile');
const walletRoute = require('./wallet');
const transactionRoute = require('./transaction');
const swapPostRoute = require('./swapPost');
const userRoute = require('./user');
const authMiddleware = require('../middleware/authMiddleware');
const { redirect, webhook } = require('../controllers/WalletController');

router.get('/test', (req, res) => {
    res.send('API working');
    res.status(200).json('Testing testing')
});

router.get('/wallet-verify', redirect);
router.post('/wallet-payment-verification', webhook);

router.use('/auth', authRoute);

router.use(authMiddleware)
router.use('/profile', profileRoute);
router.use('/wallet', walletRoute);
router.use('/transactions', transactionRoute);
router.use('/swapPosts', swapPostRoute);
router.use('/users', userRoute);

module.exports = router;