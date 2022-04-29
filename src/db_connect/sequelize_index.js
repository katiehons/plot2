const { Sequelize, DataTypes } = require('sequelize');
const querystring = require('querystring');

let query = querystring.parse(global.location.search);
let user_data_path = query['?user_data_path']
let path_ext = "/library_data/library.db"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: user_data_path + path_ext,
  define: {
    timestamps: false
  }
});

sequelize.authenticate().then(()=>{
  console.log('sync sequelize Connection has been established successfully.');
}).catch((error)=>{
  console.error('Unable to connect to the sync sequelize database:', error);
});

const library_db = {}
library_db.Sequelize = Sequelize;
library_db.sequelize = sequelize;
library_db.book = require("./models/book")(sequelize);
library_db.bookshelf = require("./models/bookshelf")(sequelize);
library_db.room = require("./models/room")(sequelize);
library_db.user = require("./models/user")(sequelize);

library_db.book.belongsTo( library_db.bookshelf, { foreignKey: "bookshelf_id" })
library_db.bookshelf.hasMany( library_db.book, { foreignKey: "bookshelf_id", onDelete: "SET NULL" })

library_db.bookshelf.belongsTo( library_db.room, { foreignKey: "room_id" })
library_db.room.hasMany( library_db.bookshelf, { foreignKey: "room_id" })

library_db.sequelize.sync();

module.exports = library_db;
