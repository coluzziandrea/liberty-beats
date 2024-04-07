import { Key } from '../../../../model/note/key/key'
import { Volume } from '../../../volume/volume'
import { ChannelInstrument } from '../channel-instrument'
import * as Tone from 'tone'

export type SamplerInstrumentSound = {
  key: Key
  sampleUrl: string
}

export default class SamplerInstrument implements ChannelInstrument {
  _sampler: Tone.Sampler

  constructor(sounds: SamplerInstrumentSound[]) {
    this._sampler = new Tone.Sampler()
    this._setup(sounds)
  }

  connect(): void {
    this._sampler.toDestination()
  }
  disconnect(): void {
    this._sampler.disconnect()
  }
  setVolume(volume: number): void {
    this._sampler.volume.value = Volume.transformVolumeToToneVolume(volume)
  }

  play(note: Key, duration: string, time?: number, velocity?: number) {
    this._sampler.triggerAttackRelease(note, duration, time, velocity)
  }

  _setup(sounds: SamplerInstrumentSound[]) {
    sounds.forEach((sound) => {
      this._sampler.add(sound.key, sound.sampleUrl)
    })
  }
}
