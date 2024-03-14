import * as Tone from 'tone'
import { RootStore } from '../../../store'
import { TimeUtils } from '../utils/time-utils'
import { setCurrentTickFromSequencer } from '../../../features/daw/playlist-header/store/playlist-header-slice'
import { setTime } from '../../../features/daw/player-bar/store/playerBarSlice'
import { observeStore } from '../../../store/observers'
import { selectRequestedNewTickPosition } from '../../../features/daw/playlist-header/store/selectors'
import { selectBpm } from '../../../features/daw/player-bar/store/selectors'

export class Clock {
  private _bpm: number
  private _tick: number
  private _time: number

  private _store: RootStore

  constructor(store: RootStore) {
    this._store = store
    this._bpm = store.getState().playerBar.bpm
    this._time = 0
    this._tick = 0

    Tone.Transport.bpm.value = this._bpm

    Tone.Transport.scheduleRepeat(() => {
      this.handleTick()
    }, '16n')

    this.registerStoreListeners()
  }

  private registerStoreListeners() {
    observeStore(
      this._store,
      selectRequestedNewTickPosition,
      this.handleRequestedNewTickPosition.bind(this)
    )

    observeStore(this._store, selectBpm, this.handleRequestedNewBpm.bind(this))
  }

  private handleRequestedNewBpm(newBpm: number) {
    this._bpm = newBpm
    Tone.Transport.bpm.value = this._bpm
  }

  private handleTick() {
    this.getTickAndTimeFromToneTransport()
    this.notifyStore()
  }

  private handleRequestedNewTickPosition(newTick: number | null) {
    if (newTick === null) return
    Tone.Transport.position = TimeUtils.beatToToneTime(newTick)
    this.getTickAndTimeFromToneTransport()

    if (Tone.Transport.state !== 'started') {
      // will trigger store update ONLY if transport is not playing so to not collide with the handleTick method
      this.notifyStore()
    }
  }

  private getTickAndTimeFromToneTransport() {
    this._tick = TimeUtils.toneTimeToBeat(Tone.Transport.position)
    // sometimes the transport position is negative, so we need to clamp it to 0
    this._time = Math.max(Tone.Transport.seconds, 0)
  }

  private notifyStore() {
    this._store.dispatch(setTime(this._time))
    this._store.dispatch(setCurrentTickFromSequencer(this._tick))
  }
}
