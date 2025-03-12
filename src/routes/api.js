const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const profileRoute = require('./profile');
const walletRoute = require('./wallet');
const authMiddleware = require('../middleware/authMiddleware');
const { redirect, webhook } = require('../controllers/WalletController');

router.get('/test', (req, res) => {
    res.send('API working');
    res.status(200).json('Testing testing')
});

router.get('/wallet-verify', redirect);

router.use('/auth', authRoute);

router.use(authMiddleware)
router.use('/profile', profileRoute);
router.use('/wallet', walletRoute);

module.exports = router;