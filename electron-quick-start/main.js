const { app, BrowserWindow, ipcMain } = require('electron');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('./renderer/index.html')
})
