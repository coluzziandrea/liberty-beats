import { useDispatch, useSelector } from 'react-redux'
import { FaPlay, FaPause, FaPlus, FaTrash } from 'react-icons/fa'
import { selectMaxTrackPatterns } from '../../store/selectors/drum-machine-selectors'
import { DrumMachinePatternUtil } from '../../util/drum-machine-pattern-util'
import { selectPattern } from '../../store/drum-machine-slice'
import {
  EMPTY_DRUM_PATTERN,
  TrackDrumPatternSound,
} from '../../../../../model/track/drums/track-drums'
import { setTrackIdInPlayingPreviewLoop } from '../../../instrument/store/instrument-slice'
import { Track } from '../../../../../model/track/track'

export type DrumMachinePadCommandsProps = {
  selectedTrack: Track

  selectedPatternIndex: number
  previewLoopPlayingTrackId: string | null

  onUpdateCurrentPattern: (newPattern: TrackDrumPatternSound[][]) => void
}

export const DrumMachinePadCommands = ({
  selectedTrack,
  selectedPatternIndex,
  onUpdateCurrentPattern,
  previewLoopPlayingTrackId,
}: DrumMachinePadCommandsProps) => {
  const maxTrackPatterns = useSelector(selectMaxTrackPatterns)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row items-center py-2 gap-2">
      <div className="flex flex-col gap-2 items-center">
        <p className="uppercase font-bold">Patterns</p>

        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: maxTrackPatterns }).map((_, index) => (
            <div
              key={index}
              className={`${
                index === selectedPatternIndex ? 'bg-slate-700' : 'bg-slate-900'
              } text-center py-2 px-4 rounded-lg cursor-pointer hover:bg-slate-700`}
              onClick={() => {
                dispatch(setTrackIdInPlayingPreviewLoop(null))
                dispatch(selectPattern(index))
              }}
            >
              {DrumMachinePatternUtil.getPatternNameByIndex(index)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        {previewLoopPlayingTrackId ? (
          <button
            className="btn btn-primary flex flex-row gap-2 items-center"
            onClick={() => {
              dispatch(setTrackIdInPlayingPreviewLoop(null))
            }}
          >
            <FaPause />
            <p className="text-sm">Stop Pattern</p>
          </button>
        ) : (
          <button
            className="btn btn-primary flex flex-row gap-2 items-center"
            onClick={() => {
              dispatch(setTrackIdInPlayingPreviewLoop(selectedTrack.id))
            }}
          >
            <FaPlay />
            <p className="text-sm">Play Pattern</p>
          </button>
        )}

        <button
          className="btn btn-primary flex flex-row gap-2 items-center"
          onClick={() => {
            onUpdateCurrentPattern(EMPTY_DRUM_PATTERN)
          }}
        >
          <FaTrash />
          <p className="text-sm">Clear Pattern</p>
        </button>

        <button className="btn btn-primary flex flex-row gap-2 items-center">
          <FaPlus />
          <p className="text-sm">Add Pattern</p>
        </button>
      </div>
    </div>
  )
}
