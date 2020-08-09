const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const DateStore = require('./renderer/MusicDateStore');
const myStore = new DateStore({ 'name': 'Music Data' })

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
    this.once('ready-to-show', () => {
      this.show()
    })
  }

}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html', true)
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('page did finish load')
    mainWindow.send('getTracks', myStore.getTracks())
  })
  ipcMain.on('add-music-window', () => {
    const addWindow = new AppWindow({
      width: 400,
      height: 300,
      parent: mainWindow
    }, './renderer/add.html')
  })
  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3', 'flv'] }]
    }).then(files => { if (files) { event.sender.send('selected-file', files) } })
  })
  ipcMain.on('add-tracks', (event, tracks) => {
    let updatedTracks = myStore.addTracks(tracks).getTracks()
    mainWindow.send('get-tracks', updatedTracks)
  })
})

