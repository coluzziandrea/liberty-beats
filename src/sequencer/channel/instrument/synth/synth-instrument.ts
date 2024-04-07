import { Key } from '../../../../model/note/key/key'
import { Volume } from '../../../volume/volume'
import { ChannelInstrument } from '../channel-instrument'

import * as Tone from 'tone'

export default class SynthInstrument implements ChannelInstrument {
  _synth: Tone.PolySynth = new Tone.PolySynth(Tone.FMSynth)

  constructor() {}

  play(note: Key, duration: string, time?: number, velocity?: number) {
    this._synth.triggerAttackRelease(note, duration, time, velocity)
  }
  connect(): void {
    this._synth.toDestination()
  }
  disconnect(): void {
    this._synth.disconnect()
  }
  setVolume(volume: number): void {
    this._synth.volume.value = Volume.transformVolumeToToneVolume(volume)
  }
}
