const { Sequelize, DataTypes } = require('sequelize');
// const fs = require("fs")
// const { ipcRenderer } = require('electron');

// const { remote } = ('electron');
// // console.log( app.getPath('userData') )
// const { app } = remote;
// let app_path = require("path").dirname(require('electron').remote.app.getPath("userData"))
// let app_data_path = app.getPath('userData');
// let path = ""
// ipcRenderer.invoke('getPath').then((returned_path) => {
//   path = returned_path;
// });
// let library_db_path = "./data/library_db"


let app_data_path = "/Users/katiebug/Library/Application Support/plot"
let library_db_path = app_data_path+"/library_data/library.db";

// may also store cover images in library_data someday


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: library_db_path,
  define: {
    timestamps: false
  }
});

sequelize.authenticate().then(()=>{
  console.log('sequelize Connection has been established successfully.');
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
library_db.bookshelf.hasMany( library_db.book, { foreignKey: "bookshelf_id", onDelete: "SET NULL" })

library_db.bookshelf.belongsTo( library_db.room, { foreignKey: "room_id" })
library_db.room.hasMany( library_db.bookshelf, { foreignKey: "room_id" })

library_db.sequelize.sync();


module.exports = library_db;
