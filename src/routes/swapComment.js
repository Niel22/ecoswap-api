const express = require('express');
const upload = require('../utils/uploadHelper');
const { create, fetchComments, fetchReplies } = require('../controllers/SwapCommentController');
const SwapCommentRequest = require('../request/SwapCommentRequest');
const router = express.Router();

router.post('/', upload('comments').array("images", 5), SwapCommentRequest, create);
router.get('/:postId/comments', fetchComments);
router.get('/:postId/comments/:parentId', fetchReplies);

module.exports = router;