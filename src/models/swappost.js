'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SwapPostImage,{
        foreignKey: 'swapPostId',
        as: "swapImage"
      });
    }
  }
  SwapPost.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    swap_preference: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SwapPost',
    timestamps: true
  });
  return SwapPost;
};