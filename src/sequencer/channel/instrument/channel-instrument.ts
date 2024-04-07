import { Key } from '../../../model/note/key/key'

export interface ChannelInstrument {
  setVolume(volume: number): void

  connect(): void

  disconnect(): void

  play(note: Key, duration: string, time?: number, velocity?: number): void
}
//
