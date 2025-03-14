const models = require('../models');
const { success, error } = require('../utils/ApiResponse');
const { url } = require('../utils/helpers');

module.exports.create = async function(req, res)
{
    const comment = await models.SwapComment.create(req.CommentData);
    if(comment)
    {
        if(req.files)
        {
            await Promise.all(
                req.files.map((image) =>
                models.SwapCommentImage.create({
                    commentId: comment.id,
                    image: `public/comments/${image.filename}`,
                })
                )
            );
        }

        return success(res, {}, "Comment Created");
    }

    return error(res, "Problem creating comment");
}

module.exports.fetchComments = async function(req, res)
{
    const comments = await models.SwapComment.findAll({where: {postId: req.params.postId, parentId: null}, order: [["createdAt", "DESC"]], include: [
        {
            model: models.SwapCommentImage,
            as: "swapCommentImage"
        },
        {
            model: models.User,
            as: "user"
        }
    ]});

    if(comments.length > 0)
    {
        const commentDetails = comments.map((comment) => ({
            id: comment.id,
            comment: comment.comment,
            user_name: comment.user.name,
            user_picture: url(comment.user.image),
            createdAt: comment.createdAt,
            swapImages: comment.swapCommentImage
            ? comment.swapCommentImage.map((image) => url(image.image))
            : [],
        }));

        return success(res, commentDetails, "All Comment for this post");
    }

    return error(res, "No comment found");
}

module.exports.fetchReplies = async function(req, res)
{
    const comments = await models.SwapComment.findAll({where: {postId: req.params.postId, parentId: req.params.parentId}, order: [["createdAt", "DESC"]], include: [
        {
            model: models.SwapCommentImage,
            as: "swapCommentImage"
        },
        {
            model: models.User,
            as: "user"
        }
    ]});

    if(comments.length > 0)
        {
            const commentDetails = comments.map((comment) => ({
                id: comment.id,
                comment: comment.comment,
                user_name: comment.user.name,
                user_picture: url(comment.user.image),
                createdAt: comment.createdAt,
                swapImages: comment.swapCommentImage
                ? comment.swapCommentImage.map((image) => url(image.image))
                : [],
            }));
    
            return success(res, commentDetails, "All Replies for this comment");
        }
    
        return error(res, "No replies found");
}