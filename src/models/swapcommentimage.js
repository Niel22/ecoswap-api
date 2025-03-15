'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapCommentImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.SwapComment, {
        foreignKey: "commentId",
        as: "swapComment"
      });
    }
  }
  SwapCommentImage.init({
    commentId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SwapCommentImage',
    timestamps: true
  });
  return SwapCommentImage;
};