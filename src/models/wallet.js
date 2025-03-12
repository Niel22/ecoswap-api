'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Wallet.init({
    userId: DataTypes.NUMBER,
    balance: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Wallet',
    timestamps: true
  });
  return Wallet;
};