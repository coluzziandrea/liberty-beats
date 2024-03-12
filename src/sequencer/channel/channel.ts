import { Bar } from '../../model/bar/bar'
import { InstrumentPreset } from '../../model/instrument/preset/preset'
import { Note } from '../../model/note/note'
import { Track } from '../../model/track/track'
import * as Tone from 'tone'

export class Channel {
  synth: Tone.PolySynth = new Tone.PolySynth(Tone.FMSynth)
  parts: Tone.Part[] = []

  constructor(track: Track) {
    this.updateFromTrack(track)
  }

  updateFromTrack(track: Track) {
    if (!this.hasChanged(track)) {
      console.log('track not changed')
      return
    }
    this.clear()
    this.setInstrument(track.instrumentPreset)

    // const part = new Tone.Part(
    //   (time, note) => {
    //     // the notes given as the second element in the array
    //     // will be passed in as the second argument
    //     synth.triggerAttackRelease(note, '8n', time)
    //   },
    //   [
    //     [0, 'C2'],
    //     ['0:1', 'C3'],
    //     ['0:2', 'C3'],
    //     ['0:3', 'G2'],
    //     ['1:0', 'A2'],
    //     ['1:0:1', 'A#2'],
    //     ['1:0:2', 'G#2'],
    //     /**
    //      * TransportTime, ("4:3:2") will also provide tempo and time signature relative times in the form BARS:QUARTERS:SIXTEENTHS.
    //      * https://tonejs.github.io/docs/14.7.77/type/Time
    //      */
    //   ]
    // )

    // part.start(0)
    this.generatePartsFromBars(track.bars)

    this.connect()
  }

  clear() {
    this.parts.forEach((part) => part.dispose())
    this.parts = []
    this.synth.disconnect()
  }

  generatePartsFromBars(trackBars: Readonly<Bar[]>) {
    this.parts = trackBars.map((bar) => {
      console.log(
        'creating part from bar',
        bar.id,
        bar.startAtTick,
        bar.endAtTick,
        bar.notes.length
      )
      const sequencerNotes = bar.notes.map(this.noteToTone.bind(this))
      console.log('sequencerNotes', sequencerNotes)
      const part = new Tone.Part(
        (time, value: ReturnType<typeof this.noteToTone>) => {
          console.log(time)
          this.synth.triggerAttackRelease(
            value.note,
            value.duration,
            time,
            value.velocity
          )
        },
        sequencerNotes
      )
      part.start(0)
      return part
    })
  }

  setInstrument(instrumentPreset: InstrumentPreset) {
    console.log('setting instrument', instrumentPreset)
  }

  connect() {
    this.synth.toDestination()
  }

  hasChanged(newTrack: Track) {
    return true
  }

  noteToTone(note: Note) {
    console.log(
      'noteToTone',
      note.startsAtRelativeTick,
      note.key,
      note.durationTicks
    )
    const time = this.beatToToneTime(note.startsAtRelativeTick)
    return {
      time,
      duration: '2n',
      note: note.key,
      velocity: 1,
    }
  }

  beatToToneTime(beat: number) {
    const bars = Math.floor(beat / 4)
    const quarters = Math.floor((beat % 4) / 1)
    const sixteenths = 0
    return `${bars}:${quarters}:${sixteenths}`
  }

  beatDurationToToneTime(beatDuration: number) {
    return `${beatDuration / 4}n`
  }
}
