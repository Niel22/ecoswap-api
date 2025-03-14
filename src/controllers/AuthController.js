const models = require('../models');
const { success, error } = require('../utils/ApiResponse');
const { url } = require('../utils/helpers');
const generateWebToken = require('../utils/jwt');

module.exports.register = async function(req, res){
    const user = await models.User.create(req.UserData);

    if(user){
        await models.Wallet.create({
            userId: user.id
        });
        return success(res, {}, 'User registered');
    }

    return error(res, 'Cannot register user');
}

module.exports.login = async function(req, res){
    const {email, password} = req.UserData;
    const user = await models.User.findOne({where: {email: email}, include: [
        {
            model: models.Wallet,
            as: "wallet"
        }
    ]});

    if(await user?.comparePassword(password))
    {
        const token = await generateWebToken(user);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: url(user.image),
            role: user.is_admin ? 'admin' : 'user',
            status: user.active ? 'enabled' : 'disabled',
            balance: user.wallet.balance,
            token: token
        };

        return success(res, userData);
    }

    return error(res, 'Invalid email or password');
}