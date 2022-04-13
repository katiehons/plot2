const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Book = sequelize.define("books", {
    isbn: {
      type: DataTypes.INTEGER,
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
    }
  },
  {
    timestamps: false,
  });

  // todo, why isn't this happening?
  const Bookshelf = require('./bookshelf')(sequelize)
  Book.hasOne( Bookshelf );
  return Book;
};
