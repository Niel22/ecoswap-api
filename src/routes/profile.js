const express = require('express');
const { fetchUserProfile, updateUserProfile, changePassword, fetchWalletBalance } = require('../controllers/ProfileController');
const UpdateProfileRequest = require('../request/UpdateProfileRequest');
const ChangePasswordRequest = require('../request/ChangePasswordRequest');
const router = express.Router();

router.get('', fetchUserProfile);
router.patch('/update', UpdateProfileRequest, updateUserProfile);
router.patch('/change-password', ChangePasswordRequest, changePassword);
router.get('/wallet-balance', fetchWalletBalance);

module.exports = router;