import * as Tone from 'tone'
import { RootStore } from '../../../store'
import { TimeUtils } from '../utils/time-utils'
import { setCurrentTick } from '../../../features/daw/playlist-header/store/playlist-header-slice'
import { setTime } from '../../../features/daw/player-bar/store/playerBarSlice'

export class Clock {
  private _bpm: number
  private _time: number

  private _store: RootStore

  constructor(store: RootStore) {
    this._store = store
    this._bpm = store.getState().playerBar.bpm
    this._time = 0

    Tone.Transport.bpm.value = this._bpm

    Tone.Transport.scheduleRepeat((time) => {
      this.handleTick(time)
    }, '16n')

    // TODO set Tone transport position when user clicks on the timeline
    // Tone.Transport.position = '0:0:0'
  }

  private handleTick(time: number) {
    this._time = time
    this._bpm = TimeUtils.toneTimeToBeat(Tone.Transport.position)
    this._store.dispatch(setTime(this._time))
    this._store.dispatch(setCurrentTick(this._bpm))
  }
}
