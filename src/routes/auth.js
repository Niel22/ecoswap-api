const express = require('express');
const RegisterRequest = require('../request/RegisterRequest');
const LoginRequest = require('../request/LoginRequest');
const { register, login } = require('../controllers/AuthController');
const router = express.Router();


router.post('/register', RegisterRequest, register);
router.post('/login', LoginRequest, login);

module.exports = router;