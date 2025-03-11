const express = require('express');
const router = express.Router();
const authRoute = require('./auth');

router.get('/test', (req, res) => {
    res.send('API working');
    res.status(200).json('Testing testing')
});

router.use('/auth', authRoute);

module.exports = router;