const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');
const models = require('../models');

const schema = {
    name: {
        type: 'string',
        optional: false,
        min: '1',
    },
    email: {
        type: 'email',
        optional: false,
        min: '1'
    },
    password: {
        type: 'string',
        optional: false,
        min: '1'
    },
    address: {
        type: 'string',
        optional: false,
        max: '255',
        min: '1',
    },
    city: {
        type: 'string',
        optional: false,
        max: '100',
        min: '1',
    },
    state: {
        type: 'string',
        optional: false,
        max: '100',
        min: '1',
    },
    country: {
        type: 'string',
        optional: false,
        max: '100',
        min: '1',
    },
}

const rules = new Validator();

async function RegisterRequest(req, res, next)
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

    const email = await models.User.findOne({ where: { email: data.email}});

    if(email)
    {
        return validationError(res, 'Email Already exist');
    }


    req.UserData = data;
    next();

}

module.exports = RegisterRequest;