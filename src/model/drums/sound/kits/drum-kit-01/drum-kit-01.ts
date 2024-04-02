import { DrumSound } from '../../drums-sound'

import closedHat from './samples/KIT_01_CLOSED_HAT.wav'
import openHat1 from './samples/KIT_01_OPEN_HAT_01.wav'
import crash1 from './samples/KIT_01_CRASH_01.wav'
import kick1 from './samples/KIT_01_KICK_01.wav'
import ride1 from './samples/KIT_01_RIDE_01.wav'
import snare1 from './samples/KIT_01_SNARE_01.wav'
import tom1 from './samples/KIT_01_TOM_01.wav'

export const DRUM_KIT_SOUNDS_01: DrumSound[] = [
  {
    id: 'drums_kit_01_closedhat',
    category: 'CLOSED_HI_HAT',
    name: 'Closed Hi Hat',
    presetId: 'drums_kit_01',
    sampleUrl: closedHat,
  },
  {
    id: 'drums_kit_01_snare1',
    category: 'SNARE',
    name: 'Snare 1',
    presetId: 'drums_kit_01',
    sampleUrl: snare1,
  },
  {
    id: 'drums_kit_01_tom1',
    category: 'TOM',
    name: 'Tom 1',
    presetId: 'drums_kit_01',
    sampleUrl: tom1,
  },
  {
    id: 'drums_kit_01_openHat1',
    category: 'OPEN_HI_HAT',
    name: 'Open Hi Hat 1',
    presetId: 'drums_kit_01',
    sampleUrl: openHat1,
  },
  {
    id: 'drums_kit_01_crash',
    category: 'CRASH',
    name: 'Crash 1',
    presetId: 'drums_kit_01',
    sampleUrl: crash1,
  },
  {
    id: 'drums_kit_01_kick1',
    category: 'KICK',
    name: 'Kick 1',
    presetId: 'drums_kit_01',
    sampleUrl: kick1,
  },
  {
    id: 'drums_kit_01_ride1',
    category: 'RIDE',
    name: 'Ride 1',
    presetId: 'drums_kit_01',
    sampleUrl: ride1,
  },
]
