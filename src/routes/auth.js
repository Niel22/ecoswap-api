const express = require('express');
const router = express.Router();
const RegisterRequest = require('../request/RegisterRequest');
const LoginRequest = require('../request/LoginRequest');
const { register, login } = require('../controllers/AuthController');

router.post('/register', RegisterRequest, register);
router.post('/login', LoginRequest, login);

module.exports = router;