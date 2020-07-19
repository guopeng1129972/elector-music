const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')
const { log } = require('util')
$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})

const renderListHTML = (paths) => {
  const musiclist = $('musicList')
  const musicItemsHTML = paths.reduce((html, music) => {
    html += `<li class="list-group-item">${path.basename(music)}</li>`
    return html
  }, '')
  musiclist.innerHTML = `<ul class="list-group">${musicItemsHTML}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
  console.log(path.filePaths);
  if (Array.isArray(path.filePaths)) {
    renderListHTML(path.filePaths)
  }
})
//elector dialog api
//https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener