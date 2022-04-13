const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.define("Books", {
    isbn: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false
    },
    cover: {
      type: Sequelize.DataTypes.BLOB
    }
  },
  {
    timestamps: false,
  });

  // todo, finish after making bookshelves model
  // Book.hasOne( )
  return Book;
};
