const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Bookshelf = sequelize.define("bookshelves", {
    bookshelf_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bookshelf_name:
    {
      type: DataTypes.TEXT,
      unique: true
    },
    room_id:
    {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
  });

  // const Room = require('./room')(sequelize)
  // // Room.belongsToMany( Bookshelf, { through: "rooms_bookshelves", foreignKey: "room_id", otherKey: "bookshelf_id" });
  // Bookshelf.belongsTo(Room)
  return Bookshelf;
};
