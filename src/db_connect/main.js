const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

console.log("in main.js building db")
// ../../data/library.db
const database = new sqlite3.Database('././data/library.db', (err) => {
  if (err) console.error('Database opening error: ', err);
});

var times_triggered = 0;
ipcMain.on('asynchronous-message', (event, arg, params) => {
  const sql = arg;
  console.log("got message: event: " + event + "\n\t arg(sql): " + sql + "\n\t params: " + params)

  database.all(sql, params, (err, rows) => {
    // console.log("sending reply for [[[" + sql + "]]], main.js\nReturns: " + ( (err && err.message) || rows) );
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});

const { Sequelize } = require('sequelize');
const library = new Sequelize({
  dialect: 'sqlite',
  storage: '././data/library.db'
});async function catch_err(){
  try {
    await library.authenticate();
    console.log('sequelize Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the sequelize database:', error);
  }
}

catch_err();
