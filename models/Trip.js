'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    methodOfTransport: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // The password cannot be null
    arrivalDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  Trip.associate = models => {
    // associations can be defined here
    Trip.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Trip;
}