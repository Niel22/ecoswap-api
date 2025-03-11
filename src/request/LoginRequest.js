const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');

const schema = {
    email: {
        type: 'email',
        optional: false,
        min: '1'
    },
    password: {
        type: 'string',
        optional: false,
        min: '1'
    }
}


const rules = new Validator();

async function LoginRequest(req, res, next)
{
    const data = req.body

    if(field = Object.entries(data).find(([KeyboardEvent, value]) => !value))
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

module.exports = LoginRequest;