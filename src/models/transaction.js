'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
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
  Transaction.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    transactionRef: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true
  });
  return Transaction;
};