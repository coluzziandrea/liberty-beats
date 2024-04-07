import { DrumSoundUtils } from '../../../model/drums/sound/drums-sound'
import { InstrumentPreset } from '../../../model/instrument/preset/preset'
import { ChannelInstrument } from './channel-instrument'
import SamplerInstrument from './sampler/sampler-instrument'
import SynthInstrument from './synth/synth-instrument'

export const createChannelInstrument = (
  preset: InstrumentPreset
): ChannelInstrument => {
  switch (preset.instrument) {
    case 'DRUMS':
      return new SamplerInstrument(getDrumsSamples(preset))
    case 'KEYBOARDS':
      return new SynthInstrument()
    default:
      return new SynthInstrument()
  }
}

const getDrumsSamples = (preset: InstrumentPreset) => {
  const sounds = DrumSoundUtils.getDrumsSoundSetByPreset(preset)
  return sounds.map((sound) => ({
    key: sound.key,
    sampleUrl: sound.sampleUrl,
  }))
}
