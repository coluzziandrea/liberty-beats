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
    <div className="flex flex-row justify-between">
      <div
        className="cursor-pointer"
        onClick={() => dispatch(closeAllBottomUpPanels())}
      >
        <p>X</p>
      </div>
      <div className="flex">
        <p className="font-semibold text-md">{selectedTrack.title}</p>
      </div>
      <div>
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
