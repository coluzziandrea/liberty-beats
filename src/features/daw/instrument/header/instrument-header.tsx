import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'
import { Octave } from '../../../../model/note/note'
import {
  selectNextOctave,
  selectPreviousOctave,
} from '../store/instrument-slice'

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
      <div
        className="flex cursor-pointer w-[3%] items-center justify-center"
        onClick={() => dispatch(closeAllBottomUpPanels())}
      >
        <p>X</p>
      </div>
      <div className="flex w-[12%] items-center justify-center">
        <p className="font-semibold text-md">{selectedTrack.title}</p>
      </div>
      <div className="flex w-[85%] items-center justify-end">
        <button
          disabled={selectedOctave === 1}
          onClick={() => dispatch(selectPreviousOctave())}
        >
          {'-'}
        </button>
        <span>{'Octave ' + selectedOctave}</span>
        <button onClick={() => dispatch(selectNextOctave())}>{'+'}</button>
      </div>
    </div>
  )
}
