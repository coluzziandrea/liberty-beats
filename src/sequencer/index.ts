import { RootStore } from '../store'
import { observeStore } from '../store/observers'
// import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'

import * as Tone from 'tone'
import { selectPlayingKeys } from '../features/daw/instrument/store/selectors'
import { selectTracks } from '../features/daw/playlist/store/selectors'
import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'
import { Track } from '../model/track/track'
import { Channel } from './channel/channel'
import { Clock } from './time/clock/clock'
import { Metronome } from './metronome/metronome'
import { Volume } from './volume/volume'
import { Key } from '../model/note/key/key'

export default class Sequencer {
  private _store: RootStore
  private _channelsByTrackID: Map<string, Channel> = new Map()

  constructor(store: RootStore) {
    this._store = store

    new Clock(this._store)
    new Metronome(this._store)
    new Volume(this._store)

    this.registerStoreListeners()
  }

  registerStoreListeners() {
    observeStore(this._store, selectIsPlaying, async (newState) => {
      if (newState) {
        await this.startTracks()
      } else {
        this.pause()
      }
    })

    observeStore(this._store, selectPlayingKeys, (newState) => {
      newState.forEach((key: Key) => {
        this.playKey(key)
      })
    })

    observeStore(this._store, selectTracks, (newState, oldState) => {
      if (oldState === newState) return
      this.generateTracks(newState)
    })
  }

  async startTracks() {
    console.log('startTracks')
    await Tone.start()
    Tone.Transport.start()
  }

  generateTracks(newTracks: Readonly<Track[]>) {
    newTracks.forEach((track) => {
      if (this._channelsByTrackID.has(track.id)) {
        console.log('updating track', track.id)
        this._channelsByTrackID.get(track.id)?.updateFromTrack(track)
      } else {
        console.log('creating channel from track', track.id)
        const channel = new Channel(track)
        this._channelsByTrackID.set(track.id, channel)
      }
    })
  }

  playKey(key: Key) {
    const synthA = new Tone.FMSynth().toDestination()
    synthA.triggerAttackRelease(key, '8n')
  }

  stop() {
    Tone.Transport.stop()
  }

  pause() {
    Tone.Transport.pause()
  }
}
