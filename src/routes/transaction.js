const express = require('express');
const { fetchAllTransaction } = require('../controllers/TransactionController');
const router = express.Router();

router.get('', fetchAllTransaction);

module.exports = router;