'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'UserId'
      }),
      User.belongsToMany(models.Course, { through: 'UserCourse' });
    }
  }
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: { msg: `email cannot be empty`},
        len: {args : [1,50], msg: `Maximum length is 50 characters`},
        isEmail: { msg: `input must be an email`}
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: { msg: `email cannot be empty`},
        len: {args : [8,20], msg: `minimum length is 8, and maximum length is 20`},
        isAlphanumeric: { msg: `must be letter or number`}
      }
    },
    role: DataTypes.STRING,
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        user.role = `admin`
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    }
  });
  return User;
};