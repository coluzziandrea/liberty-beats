import * as Tone from 'tone'

export class TimeUtils {
  static beatToToneTime(beat: number) {
    const bars = Math.floor(beat / 4)
    const quarters = Math.floor((beat % 4) / 1)
    const sixteenths = 0
    return `${bars}:${quarters}:${sixteenths}`
  }

  static toneTimeToBeat(time: Tone.Unit.Time) {
    const [bars, quarters, sixteenths] = time.toString().split(':').map(Number)
    return bars * 4 + quarters + sixteenths / 4
  }
}
