'use strict';
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    hooks: {
      beforeCreate: function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Trip, {
      onDelete: "cascade"
    });
  }
  return User;
};