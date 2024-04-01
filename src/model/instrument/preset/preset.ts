import { InstrumentType } from '../instrument'

export interface InstrumentPreset {
  id: string
  instrument: InstrumentType
  name: string
}

export const INSTRUMENT_PRESETS: InstrumentPreset[] = [
  {
    id: 'piano_grandpiano',
    instrument: 'KEYBOARDS',
    name: 'Grandpiano',
  },
  {
    id: 'piano_accordion',
    instrument: 'KEYBOARDS',
    name: 'Accordion',
  },
  {
    id: 'drums_standard',
    instrument: 'DRUMS',
    name: 'Drums',
  },
  {
    id: 'guitar_acustic',
    instrument: 'GUITAR',
    name: 'Acustic Guitar',
  },
  {
    id: 'bass_electric',
    instrument: 'BASS',
    name: 'Bass Standard',
  },
]
