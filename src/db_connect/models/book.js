const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.define("books", {
    isbn: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cover: {
      type: DataTypes.BLOB
    },
    bookshelf_id:
    {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
  });

  return Book;
};
