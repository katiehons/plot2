const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define("rooms", {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.TEXT,
      unique: true
    }
  },
  {
    timestamps: false,
  });

  const Bookshelf = require('./bookshelf')(sequelize)
  // Room.belongsToMany( Bookshelf, { through: "rooms_bookshelves", foreignKey: "room_id", otherKey: "bookshelf_id" });
  associate() = function()
  {
    Room.hasMany(Bookshelf, { foreignKey: "room_id" })
    Bookshelf.belongsTo(Room, { foreignKey: "room_id" })
  }
  return Room;
};
