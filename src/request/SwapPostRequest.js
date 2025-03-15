const Validator = require('fastest-validator');
const { validationError } = require('../utils/ApiResponse');
const imageRemover = require('../utils/imageRemover');

const schema = {
    title: {
        type: "string",
        optional: false,
        min: "1"
    },
    description: {
        type: "string",
        optional: false,
        min: "1"
    },
    swap_preference: {
        type: "string",
        optional: false,
        min: "1"
    },
    city: {
        type: "string",
        optional: false,
        min: "1"
    },
    state: {
        type: "string",
        optional: false,
        min: "1"
    },
    country: {
        type: "string",
        optional: false,
        min: "1"
    },
}

const rules = new Validator();

async function SwapPostRequest(req, res, next)
{
    const data = req.body;

    if(field = Object.entries(data).find(([key, value]) => value === null || value === undefined || value === ""))
    {
        return validationError(res, `${field} cannot be empty`);
    }

    const validated = rules.validate(data, schema);


    if (!req.files || !req.files) 
    {
        return validationError(res, "Images are required.");
    }

    if (req.files.length < 3 || req.files.length > 5) 
    {
        req.files?.forEach((image) => {
            imageRemover(`public/swaps/${image.filename}`);
        })
        return validationError(res, "Images required is Min of 3 and max of 5");
    }

    if(validated !== true)
    {
        req.files?.forEach((image) => {
            imageRemover(`public/swaps/${image.filename}`);
        })
        return validationError(res, validated);
    }

    data.userId = req.AuthUser.id;
    req.SwapData = data;
    req.SwapData.userId = req.AuthUser.id;
    next();

}

module.exports = SwapPostRequest;