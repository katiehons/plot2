const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
  },
  {
    timestamps: false,
  });
  return User;
};
