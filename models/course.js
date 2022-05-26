'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsToMany(models.User, { through: 'UserCourse' });
    }

    static deleteCourse(id) {
      let option = {
        where: { id: id }
      }

      return this.destroy(option)
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    category: DataTypes.STRING,
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};