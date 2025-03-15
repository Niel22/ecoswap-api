const express = require('express');
const upload = require('../utils/uploadHelper');
const { create, fetchComments } = require('../controllers/SwapCommentController');
const SwapCommentRequest = require('../request/SwapCommentRequest');
const router = express.Router();

router.post('/', upload('comments').array("images", 5), SwapCommentRequest, create);
router.get('/:postId', fetchComments);

module.exports = router;