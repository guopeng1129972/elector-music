const { app, BrowserWindow, ipcMain } = require('electron');

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation, dev) {
    // if (dev) { this.webContents.openDevTools() }
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      }
    }
    // const finalConfig = Object.assign(basicConfig, config)
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
  }

}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html', true)

  ipcMain.on('add-music-window', () => {
    const addWindow = new AppWindow({
      width: 400,
      height: 300,
      parent: mainWindow
    }, './renderer/add.html')
  })
})

