import * as Tone from 'tone'
import metronomeDown from '../../assets/metronome_down.wav'
import metronomeUp from '../../assets/metronome_up.wav'
import { RootStore } from '../../store'
import { TimeUtils } from '../time/utils/time-utils'
import { observeStore } from '../../store/observers'
import { selectMetronomeActive } from '../../features/daw/player-bar/store/selectors'

export class Metronome {
  private _playerUp: Tone.Player
  private _playerDown: Tone.Player
  private _store: RootStore
  private _loop!: Tone.Loop

  constructor(store: RootStore) {
    this._playerUp = new Tone.Player(metronomeUp).toDestination()
    this._playerDown = new Tone.Player(metronomeDown).toDestination()
    this._store = store

    this.setup()
    this.registerStoreListeners()
  }

  setup() {
    this._loop = new Tone.Loop(() => {
      const tick = TimeUtils.toneTimeToTicks(Tone.Transport.position)
      if (Math.floor(tick) % 16 === 0) {
        this._playerUp.start()
      } else {
        this._playerDown.start()
      }
    }, '4n')
    this._loop.start(0)
  }

  registerStoreListeners() {
    observeStore(
      this._store,
      selectMetronomeActive,
      this.changeMetronomeState.bind(this)
    )
  }

  changeMetronomeState(isActive: boolean) {
    this._loop.mute = !isActive
  }
}
