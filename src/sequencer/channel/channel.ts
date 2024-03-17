import { Bar } from '../../model/bar/bar'
import { InstrumentPreset } from '../../model/instrument/preset/preset'
import { Note } from '../../model/note/note'
import { Track } from '../../model/track/track'
import * as Tone from 'tone'
import { TimeUtils } from '../time/utils/time-utils'
import { Volume } from '../volume/volume'

export class Channel {
  synth: Tone.PolySynth = new Tone.PolySynth(Tone.FMSynth)
  parts: Tone.Part[] = []
  _muted: boolean

  constructor(track: Track) {
    this._muted = false
    this.updateFromTrack(track)
  }

  updateFromTrack(track: Track) {
    if (!this.hasChanged(track)) {
      console.log('track not changed')
      return
    }
    this.clear()
    this._muted =
      track.muted || (track.areThereAnyOtherTrackSoloed && !track.soloed)
    this.setInstrument(track.instrumentPreset)
    this.generatePartsFromBars(track.bars)
    this.setVolume(track.volume)
    this.connect()
  }

  setVolume(volume: number) {
    this.synth.volume.value = Volume.transformVolumeToToneVolume(volume)
  }

  clear() {
    this.parts.forEach((part) => part.dispose())
    this.parts = []
    this.synth.disconnect()
  }

  generatePartsFromBars(trackBars: Readonly<Bar[]>) {
    // TODO merge the bars on the same time, taking into consideration start and duration for each bar
    this.parts = trackBars.map((bar) => {
      const sequencerNotes = bar.notes.map(this.noteToTone.bind(this))
      console.log('sequencerNotes', sequencerNotes)
      const part = new Tone.Part(
        (time, value: ReturnType<typeof this.noteToTone>) => {
          if (this._muted) return
          this.synth.triggerAttackRelease(
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
  }

  connect() {
    this.synth.toDestination()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasChanged(_newTrack: Track) {
    // TODO compare new track with the current settings (maybe trying with an hash of the track?)
    return true
  }

  noteToTone(note: Note) {
    return {
      time: TimeUtils.beatToToneTime(note.startsAtRelativeTick),
      duration: TimeUtils.beatDurationToToneTime(note.durationTicks),
      note: note.key,
      velocity: 1, // TODO: handle velocity
    }
  }
}
