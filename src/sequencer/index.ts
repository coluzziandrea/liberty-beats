import { RootStore } from '../store'
import { observeStore } from '../store/observers'
// import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'

import * as Tone from 'tone'
import { selectPlayingKeys } from '../features/daw/instrument/store/selectors'
import { Key } from '../model/note/note'
import { selectTracks } from '../features/daw/playlist/store/selectors'
import { selectIsPlaying } from '../features/daw/player-bar/store/selectors'
import { Track } from '../model/track/track'

export default class Sequencer {
  store: RootStore

  constructor(store: RootStore) {
    this.store = store

    observeStore(store, selectIsPlaying, async (newState) => {
      if (newState) {
        await this.startTracks()
      } else {
        this.stop()
      }
    })

    observeStore(store, selectPlayingKeys, (newState) => {
      console.log('playing keys', newState)
      newState.forEach((key: Key) => {
        this.playKey(key)
      })
    })

    observeStore(store, selectTracks, (_, newState) => {
      console.log('tracks', newState)
      this.generateTracks(newState)
    })

    Tone.Transport.bpm.value = 120

    // setInterval(() => {
    //   console.log(Tone.immediate())
    // }, 100)
  }

  async startTracks() {
    await Tone.start()
    Tone.Transport.start()
  }

  generateTracks(_: Readonly<Track[]>) {
    const synth = new Tone.PolySynth(Tone.FMSynth).toDestination()

    const part = new Tone.Part(
      (time, note) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        synth.triggerAttackRelease(note, '8n', time)
      },
      [
        [0, 'C2'],
        ['0:1', 'C3'],
        ['0:2', 'C3'],
        ['0:3', 'G2'],
        ['1:0', 'A2'],
        ['1:0:1', 'A#2'],
        ['1:0:2', 'G#2'],
        /**
         * TransportTime, ("4:3:2") will also provide tempo and time signature relative times in the form BARS:QUARTERS:SIXTEENTHS.
         * https://tonejs.github.io/docs/14.7.77/type/Time
         */
      ]
    )

    part.start(0)
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
}
