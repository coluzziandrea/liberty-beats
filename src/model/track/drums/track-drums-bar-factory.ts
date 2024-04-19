import { DrumMachinePatternUtil } from '../../../features/daw/drum-machine/util/drum-machine-pattern-util'
import { Bar } from '../../bar/bar'
import { DrumSound } from '../../drums/sound/drums-sound'
import { Note } from '../../note/note'
import { TrackDrumPatternSound } from './track-drums'
import { v4 as uuidv4 } from 'uuid'

export const createTrackDrumsBar = (
  patternSounds: TrackDrumPatternSound[][],
  selectedSounds: DrumSound[],
  patternIndex: number,
  startAtTick: number = 0
): Bar => {
  console.log('recreating track drums bar')
  return {
    id: uuidv4(),
    title: DrumMachinePatternUtil.getPatternNameByIndex(patternIndex), // TODO - include track name
    startAtTick,
    durationTicks: 16,
    notes: createTrackDrumsBarNotes(patternSounds, selectedSounds),
  }
}

const createTrackDrumsBarNotes = (
  patternSounds: TrackDrumPatternSound[][],
  selectedSounds: DrumSound[]
): Note[] => {
  if (patternSounds.length === 0 || patternSounds.length === 0) return []

  const notes = []

  for (let soundIndex = 0; soundIndex < patternSounds.length; soundIndex++) {
    const patternSoundTicks = patternSounds[soundIndex]
    console.log('patternSoundTicks', patternSoundTicks.length)

    for (let tickIndex = 0; tickIndex < patternSoundTicks.length; tickIndex++) {
      if (patternSoundTicks[tickIndex] === 'on') {
        notes.push({
          id: uuidv4(),
          startsAtRelativeTick: tickIndex,
          durationTicks: 1,
          key: selectedSounds[soundIndex].key,
          velocity: 100,
        })
      }
    }
  }

  console.log('notes', notes)

  return notes
}
