const Validator = require('fastest-validator');
const { Op } = require('sequelize');
const models = require('../models');
const { validationError } = require('../utils/ApiResponse');

const schema = {
    name: {
        type: 'string',
        optional: true,
    },
    address: {
        type: 'string',
        optional: true,
        max: '255',
    },
    city: {
        type: 'string',
        optional: true,
        max: '100',
    },
    state: {
        type: 'string',
        optional: true,
        max: '100',
    },
    country: {
        type: 'string',
        optional: true,
        max: '100',
    },
}

const rules = new Validator();

async function UpdateProfileRequest(req, res, next)
{
    const data = req.body;

    if (data.email) {
        delete data.email;
    }

    const validated = rules.validate(data, schema);

    if(validated !== true)
    {
        return validationError(res, validated);
    }

    req.UserData = data;
    next();

}

module.exports = UpdateProfileRequest;