const express = require('express');
const upload = require('../utils/uploadHelper');
const { create } = require('../controllers/SwapCommentController');
const SwapCommentRequest = require('../request/SwapCommentRequest');
const router = express.Router();

router.post('/', upload('comments').array(5), SwapCommentRequest, create);

module.exports = router;