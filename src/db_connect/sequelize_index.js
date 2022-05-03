const { Sequelize, DataTypes } = require('sequelize');

// const BookModel = require("./models/book");
// const BookshelfModel = require("./models/bookshelf");
// const RoomModel = require("./models/room");
// const UserModel = require("./models/user");

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/library.db',
  define: {
    timestamps: false
  }
});

// let library_db = {}

sequelize.authenticate().then(()=>{
  console.log('sequelize Connection has been established successfully.');

  // library_db.sequelize = sequelize;
  // library_db.book = require("./models/book")(sequelize);
  // library_db.bookshelf = require("./models/bookshelf")(sequelize);
  // library_db.room = require("./models/room")(sequelize);
  // library_db.user = require("./models/user")(sequelize);
  //
  // library_db.book.belongsTo( library_db.bookshelf, { foreignKey: "bookshelf_id" })
  // library_db.bookshelf.hasMany( library_db.book, { foreignKey: "bookshelf_id" })
  //
  // library_db.bookshelf.belongsTo( library_db.room, { foreignKey: "room_id" })
  // library_db.room.hasMany( library_db.bookshelf, { foreignKey: "room_id" })
  //
  // library_db.sequelize.sync();
})
.catch((error)=>{
  console.error('Unable to connect to the sequelize database:', error);
});

const library_db = {}
library_db.Sequelize = Sequelize;
library_db.sequelize = sequelize;
library_db.book = require("./models/book")(sequelize);
library_db.bookshelf = require("./models/bookshelf")(sequelize);
library_db.room = require("./models/room")(sequelize);
library_db.user = require("./models/user")(sequelize);

library_db.book.belongsTo( library_db.bookshelf, { foreignKey: "bookshelf_id" })
library_db.bookshelf.hasMany( library_db.book, { foreignKey: "bookshelf_id" })

library_db.bookshelf.belongsTo( library_db.room, { foreignKey: "room_id" })
library_db.room.hasMany( library_db.bookshelf, { foreignKey: "room_id" })

library_db.sequelize.sync();


module.exports = library_db;
