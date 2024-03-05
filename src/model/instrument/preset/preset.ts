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
]
