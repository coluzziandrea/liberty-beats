import { RootStore } from '../store'
import { observeStore } from '../store/observers'
import { selectIsPlaying } from '../features/player-bar/store/selectors'

import * as Tone from 'tone'

export default class Sequencer {
  store: RootStore

  constructor(store: RootStore) {
    this.store = store

    observeStore(store, selectIsPlaying, (newState, oldState) => {
      console.log('Counter changed from', oldState, 'to', newState)

      if (newState) {
        this.play()
      } else {
        this.stop()
      }
    })
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
