const models = require('../models');
const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');

const schema = {
    email: {
        type: "email",
        optional: false,
        min: "1"
    },
    amount: {
        type: "number",
        optional: false,
    }
}

const rules = new Validator();

async function TransferFundRequest(req, res, next)
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

    const existingEmail = await models.Users.findOne({where: {email: data.email}});

    if(!existingEmail)
    {
        return validationError(res, "User with this email does not exist, check the email and try again");
    }

    req.TransferData = data;
    next();
}

module.exports = TransferFundRequest;