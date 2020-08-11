const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

let musicAudio = new Audio()
let allTracks
let currentTrack
$('add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
  const tracksList = $('trackList')
  console.log(tracks)
  const tracksListHtml = tracks.reduce((html, track) => {
    html += `<li class="row music-track list-group-item d-flex  justify-content-between align-items-center">
    <div class="col-10">
      <i class="fa fa-music mr-2 text-secondary"></i>
      <b>${track.fileName}</b>
    </div>
    <div class="control-element">
      <i class="fa fa-play mr-2 col-1" data-id="${track.id}"></i>
      <i class="fa fa-window-close col-1" data-id="${track.id}"></i>
    </div>
    </li>`

    return html
  }, '')
  const emptpTrackHTML = `<div class="alert alert-primary">还没有选择音乐</div>`
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHtml}</ul>` : emptpTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => {
  // console.log('receive tracks', tracks)
  allTracks = tracks
  renderListHTML(tracks)
})

$('trackList').addEventListener('click', (event) => {
  event.preventDefault()
  let { dataset, classList } = event.target
  const id = dataset && dataset.id
  if (id && classList.contains('fa-play')) {
    //播放音乐
    currentTrack = allTracks.find(track => track.id === id)
    musicAudio.src = currentTrack.path
    musicAudio.play()
    classList.replace('fa-play', 'fa-pause')
  }
})