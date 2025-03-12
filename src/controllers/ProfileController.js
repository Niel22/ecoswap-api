const { success, error } = require("../utils/ApiResponse");
const models = require("../models");
const { ProfileResource } = require("../response/ProfileResponse");

module.exports.fetchUserProfile = async function (req, res) {
  return success(res, ProfileResource(req.AuthUser), "User Profile Data");
};

module.exports.updateUserProfile = async function (req, res) {
  const user = await models.User.findByPk(req.AuthUser.id);

  if (await user?.update(req.UserData)) {
    return success(res, {}, "User Profile Updated");
  }

  return error(res, "Cannot Update User, User not found in the database");
};

module.exports.changePassword = async function (req, res) {
    const user = await models.User.findByPk(req.AuthUser.id);

    if(await user?.comparePassword(req.UserData.old_password))
    {
        result = await user.update({
            password: req.UserData.new_password
        });

        if(result)
        {
            return success(res, {}, "Password Changed Successfully");
        }
    }

    return error(res, "Unable to change password, incorrect old password");
};

module.exports.fetchWalletBalance = async function(req, res)
{
  const wallet = await models.Wallet.findOne({where: {userId: req.AuthUser.id}});

  if(wallet)
  {
    return success(res, {balance: wallet.balance}, "User Wallet Balance");
  }

  return error(res, "This user does not have a wallet");
}
