const {
  DataTypes
} = require('sequelize');

const sequelize = require('../connect');

const UserTableModel = sequelize.define('user-info', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  timestamps: true
});

module.exports = UserTableModel;