'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwapComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.SwapPost, {
        foreignKey: "postId",
        as: "swapPost"
      });

      this.hasMany(models.SwapCommentImage, {
        foreignKey: "commentId",
        as: "swapCommentImage"
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: 'user'
      });
    }
  }
  SwapComment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SwapComment',
    timestamps: true
  });
  return SwapComment;
};