'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCourse.init({
    status: DataTypes.BOOLEAN,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', 
        key: 'id'
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Course', 
        key: 'id'
      }
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};