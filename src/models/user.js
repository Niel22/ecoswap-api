'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Wallet, {
        foreignKey: 'userId',
        as: 'wallet'
      });

      this.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transaction'
      });

      this.hasMany(models.SwapPost, {
        foreignKey: 'userId',
        as: 'swapPost'
      });

      this.hasMany(models.SwapComment, {
        foreignKey: 'userId',
        as: 'swapComment'
      });
    }

    async comparePassword(password)
    {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      beforeCreate: async(user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async(user) => {
        if(user.changed('password'))
        {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  return User;
};