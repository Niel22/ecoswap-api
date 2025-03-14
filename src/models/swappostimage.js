'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapPostImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SwapPostImage,{
        foreignKey: 'swapPostId',
        as: "swap"
      });
    }
  }
  SwapPostImage.init({
    swapPostId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SwapPostImage',
    timestamps: true
  });
  return SwapPostImage;
};