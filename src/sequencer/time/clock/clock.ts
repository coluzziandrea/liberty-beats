import * as Tone from 'tone'
import { RootStore } from '../../../store'
import { TimeUtils } from '../utils/time-utils'
import { setCurrentTickFromSequencer } from '../../../features/daw/playlist-header/store/playlist-header-slice'
import { setTime } from '../../../features/daw/player-bar/store/playerBarSlice'
import { observeStore } from '../../../store/observers'
import { selectRequestedNewTickPosition } from '../../../features/daw/playlist-header/store/selectors'

export class Clock {
  private _bpm: number

  private _store: RootStore

  constructor(store: RootStore) {
    this._store = store
    this._bpm = store.getState().playerBar.bpm

    Tone.Transport.bpm.value = this._bpm

    Tone.Transport.scheduleRepeat(() => {
      this.handleTick()
    }, '16n')

    observeStore(store, selectRequestedNewTickPosition, (newState) => {
      if (newState !== null) {
        this.handleRequestedNewTickPosition(newState)
      }
    })
  }

  private handleTick() {
    this._bpm = TimeUtils.toneTimeToBeat(Tone.Transport.position)
    this._store.dispatch(setTime(Tone.Transport.seconds))
    this._store.dispatch(setCurrentTickFromSequencer(this._bpm))
  }

  private handleRequestedNewTickPosition(newTick: number) {
    Tone.Transport.position = TimeUtils.beatToToneTime(newTick)

    if (Tone.Transport.state !== 'started') {
      this._store.dispatch(setCurrentTickFromSequencer(newTick))
      this._store.dispatch(setTime(Tone.Transport.seconds))
    }
  }
}
