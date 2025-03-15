const models = require('../models');
const { success } = require('../utils/ApiResponse');

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
                    commentId: swap.id,
                    image: `public/comments/${image.filename}`,
                })
                )
            );
        }

        return success(res, {}, "Comment Created");
    }

    return error(res, "Problem creating comment");
}