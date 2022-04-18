// NOTE: the analogous file is src/main.js in the original
const path = require('path');

const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const Store = require('electron-store');
const isDev = require('electron-is-dev');
const DEBUG = true;

require('../src/db_connect/main');
// require('../src/db_connect/sequelize_index');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
//TODO don't use the conditional operator. please.
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// user data management
const schema = {
	current_user: {
		type: 'string',
		default: 'guest'
	},
  library_setup: {
    type: 'boolean',
    default: false
  },
  library_name: {
    type: 'string',
    default: ""
  }
};

var userDataPath = app.getPath('userData');

const library_state = new Store({ schema });

// Retrieves data of current profile
ipcMain.handle('getStoreValue', (event, key) => {
    if (DEBUG === true){
      console.log("Library state for " + key + " requested: " + library_state.get(key));
      console.log("PATH: " + app.getPath('userData'));
    }
    return library_state.get(key);
});

// Sets data for current profile
ipcMain.handle('setStoreValue', (event, key, value) => {
  if (DEBUG === true) {
    console.log("Library state for " + key + " is now " + value);
    console.log("PATH: " + app.getPath('userData'));
  }
    return library_state.set(key, value);
});
