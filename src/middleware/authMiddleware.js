const { error } = require("../utils/ApiResponse");
const models = require("../models");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      if (!decoded.userId) {
        return error(res, "invalid token. Authentication failed.");
      }

      const user = await models.User.findByPk(decoded?.userId, {include: [
        {
          model: models.Wallet,
          as: "wallet"
        }
      ]});

      if(user)
      {
        req.AuthUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.is_admin ? 'admin' : 'user',
            status: user.active ? 'enabled' : 'disabled',
            balance: user.wallet.balance,
            token: token
        };
        
        next();
        return;
      }
    } catch (err) {
      return error(res, err.message);
    }
  }

  return error(res, "invalid token. Authentication failed.");
}

module.exports = authMiddleware;
