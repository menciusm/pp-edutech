'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User);
    }
    helo(){
      return `Selamat datang ${this.name}` 
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Name cannot be empty`},
        len: {args : [1,50], msg: `Maximum length is 50 characters`}
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Age cannot be empty`},
        min:{args : 18, msg: `Minimum age is 18`},
        max:{args : 30, msg: `Maximum age is 30`}
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};