const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');

const schema = {
    amount: {
        type: "number",
        optional: false,
    }
}

const rules = new Validator();

async function FundWalletRequest(req, res, next)
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

    req.FundData = data;
    next();
}

module.exports = FundWalletRequest;