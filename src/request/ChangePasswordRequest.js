const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');

const schema = {
    old_password: {
        type: "string",
        optional: false,
        min: 8
    },
    new_password: {
        type: "string",
        optional: false,
        min: 8
    }
}

const rules = new Validator();

async function ChangePasswordRequest(req, res, next)
{
    const data = req.body;
    
    if(field = Object.entries(data).find(([key, value]) => value === null || value === undefined || value === ""))
    {
        return validationError(res, `${field} cannot be empty`);
    }


    const validated = rules.validate(data, schema);

    if(validated !== true)
    {
        return validationError(res, validated);
    }

    req.UserData = data;
    next();

}

module.exports = ChangePasswordRequest;