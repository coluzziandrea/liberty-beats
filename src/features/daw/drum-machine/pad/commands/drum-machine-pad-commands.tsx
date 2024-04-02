import { useDispatch, useSelector } from 'react-redux'
import { DrumMachinePadProps } from '../drum-machine-pad'
import { FaPlay, FaPlus, FaTrash } from 'react-icons/fa'
import {
  selectMaxTrackPatterns,
  selectSelectedPatternIndex,
} from '../../store/selectors/drum-machine-selectors'
import { DrumMachinePatternUtil } from '../../util/drum-machine-pattern-util'
import { selectPattern } from '../../store/drum-machine-slice'

export const DrumMachinePadCommands = ({
  selectedTrack,
}: DrumMachinePadProps) => {
  const maxTrackPatterns = useSelector(selectMaxTrackPatterns)
  const selectedPatternIndex = useSelector(selectSelectedPatternIndex)

  const selectedPattern =
    DrumMachinePatternUtil.getPatternNameByIndex(selectedPatternIndex)

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
              onClick={() => dispatch(selectPattern(index))}
            >
              {DrumMachinePatternUtil.getPatternNameByIndex(index)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <button className="btn btn-primary flex flex-row gap-2 items-center">
          <FaPlay />
          <p className="text-sm">Play Pattern</p>
        </button>
        <button className="btn btn-primary flex flex-row gap-2 items-center">
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
