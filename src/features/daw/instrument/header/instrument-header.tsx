import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'
import { OCTAVES, Octave } from '../../../../model/note/note'
import {
  selectNextOctave,
  selectPreviousOctave,
} from '../store/instrument-slice'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export type InstrumentHeaderProps = {
  selectedTrack: Track
  selectedOctave: Octave
}

export const InstrumentHeader = ({
  selectedTrack,
  selectedOctave,
}: InstrumentHeaderProps) => {
  const dispatch = useDispatch()
  return (
    <div className="flex h-full w-full flex-row justify-between divide-x divide-slate-600">
      <div className="flex flex-row h-full justify-between divide-x divide-slate-600 max-w-72 min-w-72">
        <div
          className="flex flex-grow cursor-pointer items-center justify-center"
          onClick={() => dispatch(closeAllBottomUpPanels())}
        >
          <IoClose />
        </div>
        <div className="flex w-[85%] items-center justify-center">
          <p className="font-semibold text-md">{selectedTrack.title}</p>
        </div>
      </div>

      <div className="flex flex-grow items-center justify-end pl-2 gap-2">
        <button
          disabled={selectedOctave === OCTAVES[0]}
          className="disabled:cursor-not-allowed"
          onClick={() => dispatch(selectPreviousOctave())}
        >
          <FaMinus />
        </button>
        <span>{'Octave ' + selectedOctave}</span>
        <button
          disabled={selectedOctave === OCTAVES[OCTAVES.length - 1]}
          className="disabled:cursor-not-allowed"
          onClick={() => dispatch(selectNextOctave())}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
