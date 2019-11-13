const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const axios = require('axios');
const path = require('path');
const isDev = require('electron-is-dev');

require('dotenv').config();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true, 
    autoHideMenuBar: true, 
    alwaysOnTop: true,  
    webPreferences: {
      nodeIntegration: true
  }});

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('weather-request', (event, arg) => {
  axios.get(
    `https://api.darksky.net/forecast/${process.env.ELECTRON_DARKSKY_API}/${process.env.ELECTRON_DARKSKY_LOCATION}?units=auto`
  )
  .then(resp => {
      event.reply('weather-response', resp.data)
  })
  .catch(err => {
      event.reply('weather-response', {'error': err});
  });
})
