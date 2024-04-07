import { Bar } from '../../model/bar/bar'
import { InstrumentPreset } from '../../model/instrument/preset/preset'
import { Note } from '../../model/note/note'
import { Track } from '../../model/track/track'
import * as Tone from 'tone'
import { TimeUtils } from '../time/utils/time-utils'
import { ChannelInstrument } from './instrument/channel-instrument'
import { createChannelInstrument } from './instrument/channel-instrument-factory'
import { Key } from '../../model/note/key/key'

export class Channel {
  trackId: string

  private _parts: Tone.Part[] = []
  private _previewLoopPart: Tone.Part | null = null
  private _instrument: ChannelInstrument | null = null
  private _muted: boolean

  private _otherTrackIsPreviewing: boolean = false
  private _isPreviewingLoop: boolean = false

  constructor(track: Track) {
    this.trackId = track.id
    this._muted = false
    this.updateFromTrack(track)
  }

  updateFromTrack(track: Track) {
    if (!this.hasChanged(track)) {
      console.log('track not changed')
      return
    }
    this.clear()
    this.setMuted(
      track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)
    )
    this.setInstrument(track.instrumentPreset)
    this.generatePartsFromBars(track.bars)
    this.setVolume(track.volume)
    this.connect()
  }

  setVolume(volume: number) {
    this._instrument?.setVolume(volume)
  }

  setMuted(muted: boolean) {
    this._muted = muted
  }

  setOtherTrackIsPreviewing(otherTrackIsPreviewing: boolean) {
    this._otherTrackIsPreviewing = otherTrackIsPreviewing
  }

  clear() {
    this._parts.forEach((part) => part.dispose())
    this._parts = []

    this._instrument?.disconnect()
  }

  generatePartsFromBars(trackBars: Readonly<Bar[]>) {
    // TODO merge the bars on the same time, taking into consideration start and duration for each bar
    this._parts = trackBars.map((bar) => {
      const sequencerNotes = bar.notes.map(this.noteToTone.bind(this))
      const part = new Tone.Part(
        (time, value: ReturnType<typeof this.noteToTone>) => {
          if (this._otherTrackIsPreviewing || this._muted) return
          this._instrument?.play(
            value.note,
            value.duration,
            time,
            value.velocity
          )
        },
        sequencerNotes
      )
      part.start(TimeUtils.beatToToneTime(bar.startAtTick))
      return part
    })
  }

  setInstrument(instrumentPreset: InstrumentPreset) {
    console.log('setting instrument', instrumentPreset)
    this._instrument = createChannelInstrument(instrumentPreset)
  }

  connect() {
    this._instrument?.connect()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasChanged(_newTrack: Track) {
    // TODO compare new track with the current settings (maybe trying with an hash of the track?)
    return true
  }

  noteToTone(note: Note) {
    return {
      time: TimeUtils.beatToToneTime(note.startsAtRelativeTick),
      duration: TimeUtils.beatToToneTime(note.durationTicks),
      note: note.key,
      velocity: note.velocity / 100,
    }
  }

  playKeys(keys: Key[]) {
    keys.forEach((key) => {
      this._instrument?.play(key, '8n')
    })
  }

  setPreviewLoopBar(loopBar: Bar) {
    this._previewLoopPart = new Tone.Part(
      (time, value: ReturnType<typeof this.noteToTone>) => {
        if (!this._isPreviewingLoop) return
        this._instrument?.play(value.note, value.duration, time, value.velocity)
      },
      loopBar.notes.map(this.noteToTone.bind(this))
    )
    this._previewLoopPart.start()
  }

  stopPreviewLoop() {
    this._isPreviewingLoop = false
  }

  startPreviewLoop() {
    this._isPreviewingLoop = true
  }
}
