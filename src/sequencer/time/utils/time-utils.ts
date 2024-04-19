import * as Tone from 'tone'

export class TimeUtils {
  static tickToToneTime(tick: number) {
    const measure = Math.floor(tick / 16)
    const quarters = Math.floor((tick % 16) / 4)
    const sixteenths = tick % 4
    return `${measure}:${quarters}:${sixteenths}`
  }

  static toneTimeToTicks(time: Tone.Unit.Time) {
    const [measures, quarters, sixteenths] = time
      .toString()
      .split(':')
      .map(Number)
    return measures * 16 + quarters * 4 + sixteenths
  }
}
