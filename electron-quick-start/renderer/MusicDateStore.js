// const { app } = require('electron');
const Store = require('electron-store');
const uuidv4 = require('uuid/dist/v4');
const path = require('path');

class DateStore extends Store {
  constructor(settings) {
    super(settings)
    this.tracks = this.getTracks('tracks') || []
  }
  saveTracks() { this.set('tracks', this.tracks); return this }
  getTracks() { return this.get('tracks') || [] }
  addTracks(tracks) {
    const tracksWithProps = tracks.map(track => {
      return {
        id: uuidv4(),
        path: track,
        fileName: path.basename(track)
      }
    }).filter(track => {
      const currentTracksPath = this.getTracks().map(track => track.path)
      return currentTracksPath.indexOf(track.path) < 0
    })
    this.tracks = [...this.tracks, ...tracksWithProps]
  }
}
module.exports = DateStore