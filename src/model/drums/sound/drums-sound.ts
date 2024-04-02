import {
  InstrumentPreset,
  InstrumentPresetId,
} from '../../instrument/preset/preset'
import { DrumCategory } from '../category/drum-category'
import { DRUM_KIT_SOUNDS_01 } from './kits/drum-kit-01/drum-kit-01'

export type DrumSound = {
  id: string
  category: DrumCategory
  name: string
  presetId: InstrumentPresetId
  sampleUrl: string
}

const DRUMS_SOUNDS: DrumSound[] = [...DRUM_KIT_SOUNDS_01]

export class DrumSoundUtils {
  static getDrumsSoundSetByPreset(preset: InstrumentPreset) {
    return DRUMS_SOUNDS.filter((sound) => sound.presetId === preset.id)
  }
}
