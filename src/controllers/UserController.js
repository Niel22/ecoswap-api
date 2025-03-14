const models = require('../models');
const { success } = require('../utils/ApiResponse');

module.exports.index = async function(req, res)
{
    const users = models.Users.findAll();

    if(users.length > 0)
    {
        return success(res, users, "All Users");
    }

    return success(res, {}, "No User found");
}