const express = require('express');
const { index } = require('../controllers/UserController');
const router = express.Router();

router.get('/', index);

module.exports = router;