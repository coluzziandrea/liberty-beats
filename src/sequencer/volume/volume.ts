import * as Tone from 'tone'
import { RootStore } from '../../store'
import { observeStore } from '../../store/observers'
import { selectVolume } from '../../features/daw/player-bar/store/selectors'

export class Volume {
  private _store: RootStore

  constructor(store: RootStore) {
    this._store = store

    this.registerStoreListeners()
  }

  registerStoreListeners() {
    observeStore(this._store, selectVolume, this.setVolume.bind(this))
  }

  setVolume(volume: number) {
    Tone.Destination.volume.value = Volume.transformVolumeToToneVolume(volume)
  }

  static transformVolumeToToneVolume(volume: number) {
    return Tone.gainToDb(volume / 100)
  }
}
