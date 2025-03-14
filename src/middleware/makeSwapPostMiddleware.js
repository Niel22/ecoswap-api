const { error } = require("../utils/ApiResponse");

function makeSwapPostMiddleware(req, res, next)
{
    if(req.AuthUser.balance < 200)
    {
        return error(res, "You dont have enough eco coin to create a swap, fund your wallet to continue");
    }

    next();
}

module.exports = makeSwapPostMiddleware;