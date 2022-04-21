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
    },
    bookshelf_id:
    {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
  });

  // todo, why isn't this happening?
  // const Bookshelf = require('./bookshelf')(sequelize)
  // Book.hasOne( Bookshelf, { foreignKey: "bookshelf_id" });
  // Bookshelf.belongsToMany( Book, { foreignKey: "bookshelf_id" })
  return Book;
};
