const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

$('add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
  const tracksList = $('trackList')
  const tracksListHtml = tracks.reduce((html, track) => {
    html += `<li class="row music-track list-group-item d-flex  justify-content-between align-items-center">
    <div class="col-10">
      <i class="fa fa-music mr-2 text-secondary"></i>
      <b>${track.fileName}</b>
    </div>
    <div>
      <i class="fa fa-play mr-2 col-1"></i>
      <i class="fa fa-window-close col-1"></i>
    </div>
    </li>`

    return html
  }, '')
  const emptpTrackHTML = `<div class="alert alert-primary">还没有选择音乐</div>`
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHtml}</ul>` : emptpTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => {
  console.log('receive tracks', tracks)
  renderListHTML(tracks)



})