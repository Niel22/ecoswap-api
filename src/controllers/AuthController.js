const models = require('../models');
const { success, error } = require('../utils/ApiResponse');
const generateWebToken = require('../utils/jwt');

module.exports.register = async function(req, res){
    const user = await models.User.create(req.UserData);

    if(user){
        return success(res, {}, 'User registered');
    }

    return error(res, 'Cannot register user');
}

module.exports.login = async function(req, res){
    const {email, password} = req.UserData;
    const user = await models.User.findOne({where: {email: email}});

    if(await user?.comparePassword(password))
    {
        const token = await generateWebToken(user);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.is_admin ? 'admin' : 'user',
            status: user.active ? 'enabled' : 'disabled',
            token: token
        };

        return success(res, userData);
    }

    return error(res, 'Invalid email or password');
}