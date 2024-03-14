import { RootStore } from '../store'
import { observeStore } from '../store/observers'
// import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'

import * as Tone from 'tone'
import { selectPlayingKeys } from '../features/daw/instrument/store/selectors'
import { Key } from '../model/note/note'
import { selectTracks } from '../features/daw/playlist/store/selectors'
import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'
import { Track } from '../model/track/track'
import { Channel } from './channel/channel'
import { Clock } from './time/clock/clock'
import { Metronome } from './metronome/metronome'

export default class Sequencer {
  private _store: RootStore
  private _channelsByTrackID: Map<string, Channel> = new Map()
  private _clock: Clock
  private _metronome: Metronome

  constructor(store: RootStore) {
    this._store = store

    this._clock = new Clock(this._store)
    this._metronome = new Metronome(this._store)

    observeStore(store, selectIsPlaying, async (newState) => {
      if (newState) {
        await this.startTracks()
      } else {
        this.pause()
      }
    })

    observeStore(store, selectPlayingKeys, (newState) => {
      newState.forEach((key: Key) => {
        this.playKey(key)
      })
    })

    observeStore(store, selectTracks, (newState, oldState) => {
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

  play() {
    // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination()
    const synthB = new Tone.AMSynth().toDestination()
    //play a note every quarter-note
    new Tone.Loop((time) => {
      synthA.triggerAttackRelease('C2', '8n', time)
    }, '4n').start(0)
    //play another note every off quarter-note, by starting it "8n"
    new Tone.Loop((time) => {
      synthB.triggerAttackRelease('C4', '8n', time)
    }, '4n').start('8n')
    // the loops start when the Transport is started
    Tone.Transport.start()
    // ramp up to 800 bpm over 10 seconds
    Tone.Transport.bpm.rampTo(800, 10)
  }

  stop() {
    Tone.Transport.stop()
  }

  pause() {
    Tone.Transport.pause()
  }
}
