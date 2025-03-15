const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');
const models = require('../models');

const schema = {
    postId: {
        type: "number",
        optional: false,
    },
    parentId: {
        type: "number",
        optional: true
    },
    comment: {
        type: "string",
        optional: false,
        min: "1"
    }
}

const rules = new Validator();

async function SwapCommentRequest(req, res, next)
{
    const data = req.body;
    
    if(field = Object.entries(data).find(([key, value]) => value === null || value === undefined || value === ""))
    {
        req.files?.forEach((image) => {
            imageRemover(`public/comments/${image.filename}`);
        });
        return validationError(res, `${field} cannot be empty`);
    }

    const validated = rules.validate(data, schema);
    if(validated !== true)
    {
        req.files?.forEach((image) => {
            imageRemover(`public/comments/${image.filename}`);
        });
        return validationError(res, validated);
    }

    const post = await models.SwapPost.findByPk(data.postId);
    if(!post)
    {
        req.files?.forEach((image) => {
            imageRemover(`public/comments/${image.filename}`);
        });
        return validationError(res, "This post id is invalid");
    }

    if(data.parentId)
    {
        const comment = await models.SwapComment.findByPk(data.parentId);
        if(!comment)
        {
            return validationError(res, "The selected parent comment does not exist");
        }
    }

    req.CommentData = data;
    next();
}

module.exports = SwapCommentRequest;