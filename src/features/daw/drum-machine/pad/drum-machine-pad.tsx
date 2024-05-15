import { useDispatch, useSelector } from 'react-redux'
import {
  EMPTY_DRUM_PATTERN,
  TRACK_DRUM_PATTERN_SIZE,
  TrackDrumPatternSound,
} from '../../../../model/track/drums/track-drums'
import { Track } from '../../../../model/track/track'
import { setCurrentTrackDrumsPattern } from '../../playlist/store/playlist-slice'
import { DrumMachinePadCommands } from './commands/drum-machine-pad-commands'
import { DrumMachinePadGrid } from './grid/drum-machine-pad-grid'
import { DrumMachinePadSoundSelector } from './sound-selector/drum-machine-pad-sound-selector'
import { DrumSoundUtils } from '../../../../model/drums/sound/drums-sound'
import { useEffect } from 'react'
import { setTrackPreviewLoop } from '../../instrument/store/instrument-slice'
import { createTrackDrumsBar } from '../../../../model/track/drums/track-drums-bar-factory'
import { selectSelectedPatternIndex } from '../store/selectors/drum-machine-selectors'
import { selectTrackIdInPlayingPreviewloop } from '../../instrument/store/selectors'

export type DrumMachinePadProps = {
  selectedTrack: Track
}

export const DrumMachinePad = ({ selectedTrack }: DrumMachinePadProps) => {
  const dispatch = useDispatch()

  const selectedPatternIndex = useSelector(selectSelectedPatternIndex)
  const previewLoopPlayingTrackId = useSelector(
    selectTrackIdInPlayingPreviewloop
  )

  const availableSoundsForPreset = DrumSoundUtils.getDrumsSoundSetByPreset(
    selectedTrack.instrumentPreset
  )

  let selectedSounds = selectedTrack.trackDrums?.selectedSounds
  let selectedPatternBeats =
    selectedTrack.trackDrums?.patterns[selectedPatternIndex]?.patternSounds

  if (!selectedSounds || selectedSounds.length === 0) {
    selectedSounds = availableSoundsForPreset.slice(0, TRACK_DRUM_PATTERN_SIZE)
  }

  if (!selectedPatternBeats || selectedPatternBeats.length === 0) {
    selectedPatternBeats = EMPTY_DRUM_PATTERN
  }

  useEffect(() => {
    if (
      !selectedPatternBeats ||
      !selectedSounds ||
      selectedPatternBeats.length === 0 ||
      selectedSounds.length === 0
    )
      return

    // Update also the preview loop in the instrument slice when the pattern changes
    dispatch(
      setTrackPreviewLoop({
        trackId: selectedTrack.id,
        loopBar: createTrackDrumsBar(
          selectedPatternBeats,
          selectedSounds,
          selectedPatternIndex
        ),
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatternBeats, selectedSounds])

  const handleUpdateCurrentPattern = (
    newPattern: TrackDrumPatternSound[][]
  ) => {
    dispatch(
      setCurrentTrackDrumsPattern({
        patternIndex: selectedPatternIndex,
        pattern: {
          patternSounds: newPattern,
        },
      })
    )
  }

  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <div className="border-[1px] border-slate-400 rounded-lg flex flex-row px-2 py-1 gap-4">
        <DrumMachinePadSoundSelector
          selectedSounds={selectedSounds}
          selectedTrack={selectedTrack}
        />
        <DrumMachinePadGrid
          selectedPatternBeats={selectedPatternBeats}
          selectedSounds={selectedSounds}
          onUpdateCurrentPattern={handleUpdateCurrentPattern}
          previewLoopPlayingTrackId={previewLoopPlayingTrackId}
        />
        <DrumMachinePadCommands
          selectedTrack={selectedTrack}
          selectedPatternBeats={selectedPatternBeats}
          selectedSounds={selectedSounds}
          selectedPatternIndex={selectedPatternIndex}
          previewLoopPlayingTrackId={previewLoopPlayingTrackId}
          onUpdateCurrentPattern={handleUpdateCurrentPattern}
        />
      </div>
    </div>
  )
}
