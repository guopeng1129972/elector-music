const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const Store = require('electron-store')
const store = new Store()
console.log(app.getPath('userData'));
// /Users/mac/Library/Application Support/electron-quick-start
store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

// store.delete('unicorn');
// console.log(store.get('unicorn'));
//=> undefined

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
      filters: [{ name: 'Music', extensions: ['mp3', 'flv', 'mp4'] }]
    }).then(files => { if (files) { console.log('main', files); event.sender.send('selected-file', files) } })
  })
})

