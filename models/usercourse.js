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
    get status() {
      if (this.status === true) {
        return 'Completed'
      } else {
        return 'On Going'
      }
    }
  }
  UserCourse.init({
    status: DataTypes.BOOLEAN,
    UserId: {
      type: DataTypes.INTEGER,
    },
    CourseId: {
      type: DataTypes.INTEGER,
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};