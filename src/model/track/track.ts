import type { InstrumentType } from "../instrument/instrument";

export interface Track {
  id: string;
  title: string;
  instrumentType: InstrumentType;
}
