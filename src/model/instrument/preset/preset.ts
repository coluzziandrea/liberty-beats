export const INSTRUMENT_PRESETS = [
  {
    id: 'piano_grandpiano' as const,
    instrument: 'KEYBOARDS',
    name: 'Grandpiano',
  },
  {
    id: 'piano_accordion' as const,
    instrument: 'KEYBOARDS',
    name: 'Accordion',
  },
  {
    id: 'drums_kit_01' as const,
    instrument: 'DRUMS',
    name: 'Drums Kit 01',
  },
  {
    id: 'guitar_acustic' as const,
    instrument: 'GUITAR',
    name: 'Acustic Guitar',
  },
  {
    id: 'bass_electric' as const,
    instrument: 'BASS',
    name: 'Bass Standard',
  },
]

export type InstrumentPreset = (typeof INSTRUMENT_PRESETS)[number]
export type InstrumentPresetId = InstrumentPreset['id']
