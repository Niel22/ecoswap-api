const express = require('express');
const { fetchUserProfile, updateUserProfile, changePassword, fetchWalletBalance, uploadImage } = require('../controllers/ProfileController');
const UpdateProfileRequest = require('../request/UpdateProfileRequest');
const ChangePasswordRequest = require('../request/ChangePasswordRequest');
const upload = require('../utils/uploadHelper');
const ImageUploadRequest = require('../request/ImageUploadRequest');
const router = express.Router();

router.get('', fetchUserProfile);
router.patch('/update', UpdateProfileRequest, updateUserProfile);
router.patch('/change-password', ChangePasswordRequest, changePassword);
router.get('/wallet-balance', fetchWalletBalance);
router.post('/image-upload', upload('users').single('image'), ImageUploadRequest, uploadImage);

module.exports = router;