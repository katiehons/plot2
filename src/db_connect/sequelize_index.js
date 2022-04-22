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

// let models = {}

// async function catch_err(){
  // try {
sequelize.authenticate().then(()=>{
  // const Book = require("./models/book")(sequelize);
  // const Bookshelf = require("./models/bookshelf")(sequelize);
  // const Room = require("./models/room")(sequelize);
  // const User = require("./models/user")(sequelize);
  // Room.associate();
  // models = {Book, Bookshelf, Room, User}
  console.log('sequelize Connection has been established successfully.');
})
.catch((error)=>{
  console.error('Unable to connect to the sequelize database:', error);
});

const library_db = {}
// library_db.Sequelize = Sequelize;
library_db.sequelize = sequelize;
library_db.book = require("./models/book")(sequelize);
library_db.bookshelf = require("./models/bookshelf")(sequelize);
library_db.room = require("./models/room")(sequelize);
library_db.user = require("./models/user")(sequelize);

library_db.book.belongsTo( library_db.bookshelf, { foreignKey: "bookshelf_id" })
library_db.bookshelf.hasMany( library_db.book, { foreignKey: "bookshelf_id" })
// library_db.book.hasOne( library_db.bookshelf, { foreignKey: "bookshelf_id" })
// library_db.bookshelf.belongsToMany( library_db.book, { foreignKey: "bookshelf_id" })

library_db.bookshelf.belongsTo( library_db.room, { foreignKey: "room_id" })
library_db.room.hasMany( library_db.bookshelf, { foreignKey: "room_id" })

module.exports = library_db;
// Bookshelf.hasMany( Book, { foreignKey: "bookshelf_id" });
//   Book.belongsTo( Bookshelf, { foreignKey: "bookshelf_id" })
// Room.hasMany(Bookshelf, { foreignKey: "room_id" })
// Bookshelf.belongsTo(Room, { foreignKey: "room_id" })
//
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
// db.tag = require("./tag.model.js")(sequelize, Sequelize);
// db.tag.belongsToMany(db.tutorial, {
//   through: "tutorial_tag",
//   as: "tutorials",
//   foreignKey: "tag_id",
// });
// db.tutorial.belongsToMany(db.tag, {
//   through: "tutorial_tag",
//   as: "tags",
//   foreignKey: "tutorial_id",
// });
// module.exports = db;

// catch_err();

// const User = require('./models/user')(sequelize)

//index.js
// const UserModel = require('./models/user');
// const RoleModel = require('./models/role');
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT
// }); //initialize connection as needed

// let models = {}
// sequelize.authenticate().then(function(){
//   const User = UserModel(sequelize, Sequelize);
//   const Role = RoleModel(sequelize, Sequelize);
//   User.associate(); //make sure you are calling this
//   Role.associate();
//   models = {User, Role}
// })
// module.exports = {models, sequelize}
