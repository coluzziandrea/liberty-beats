export const INSTRUMENT_TYPES = ["GUITAR", "BASS", "DRUMS", "PIANO"] as const;

export type InstrumentType = (typeof INSTRUMENT_TYPES)[number];
