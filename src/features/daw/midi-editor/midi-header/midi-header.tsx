import { useDispatch } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { closeAllBottomUpPanels } from '../../bottom-bar/store/bottom-bar-slice'
import { Ruler } from '../../common/components/ruler/ruler'
import { IoClose } from 'react-icons/io5'
import { useMidiEditorHorizontalScroll } from '../hooks/useMidiEditorHorizontalScroll'
import React from 'react'

export type MidiHeaderProps = {
  selectedTrack: Track
}

export const MidiHeader = ({ selectedTrack }: MidiHeaderProps) => {
  const dispatch = useDispatch()
  const rulerRef = React.useRef<HTMLDivElement>(null)

  const handleRulerScroll = useMidiEditorHorizontalScroll(rulerRef)

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

      {/* Just used to fill space & align with underlying keyboard */}
      <div className="w-20 min-w-20" />

      <div
        onScroll={handleRulerScroll}
        ref={rulerRef}
        className="flex flex-grow overflow-x-scroll no-scrollbar pl-2"
      >
        <Ruler />
      </div>
    </div>
  )
}
