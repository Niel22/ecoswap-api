const { error } = require("../utils/ApiResponse");

function ImageUploadRequest(req, res, next)
{
    if(!req.file)
    {
        return error(res, "Image file required");
    }

    next();
}

module.exports = ImageUploadRequest;