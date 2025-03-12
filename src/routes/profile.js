const express = require('express');
const { fetchUserProfile, updateUserProfile, changePassword } = require('../controllers/ProfileController');
const UpdateProfileRequest = require('../request/UpdateProfileRequest');
const ChangePasswordRequest = require('../request/ChangePasswordRequest');
const router = express.Router();

router.get('', fetchUserProfile);
router.patch('/update', UpdateProfileRequest, updateUserProfile);
router.patch('/change-password', ChangePasswordRequest, changePassword);

module.exports = router;