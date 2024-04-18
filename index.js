const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const registerIPCHandlers = require('./backend/ipc.js')
const registerMenu = require('./backend/menu.js')

let win = null // main window

// START APP
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 720,
    height: 640,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  })
  // and load the index.html of the app.
  win.loadFile('ui/arduino/index.html')

  registerIPCHandlers(win, ipcMain, app)
  registerMenu(win)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // app.on('window-all-closed', () => {
  //   if (process.platform !== 'darwin') app.quit()
  // })
}


// TODO: Loading splash screen
app.whenReady().then(createWindow)
