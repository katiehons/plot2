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

  database.all(sql, params, (err, rows) => {
    event.reply('asynchronous-reply', (err && err.message) || rows);
  });
});
