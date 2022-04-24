const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Bookshelf = require('./bookshelf')(sequelize)

  const Room = sequelize.define("rooms", {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    }
  },
  {
    timestamps: false,
  });
  return Room;
};
