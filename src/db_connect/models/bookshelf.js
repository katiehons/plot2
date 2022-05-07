const { DataTypes } = require("sequelize");

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
      unique: true,
      allowNull: false
    },
    room_id:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
  });

  return Bookshelf;
};
