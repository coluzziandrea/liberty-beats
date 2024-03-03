import { TrackList } from './track-list/track-list'
import { Flatboard } from './flatboard/flatboard'
import React from 'react'
import { useRulerScroll } from '../common/hooks/use-ruler-scroll'

export const Playlist = () => {
  const rulerDivRef = React.useRef<HTMLDivElement>(null)
  const handleRulerScroll = useRulerScroll(rulerDivRef)

  return (
    <div className="flex flex-row justify-between gap-2 divide-x divide-slate-600 w-full ">
      <div className="flex max-w-56 min-w-56">
        <TrackList />
      </div>

      <div
        className="flex flex-grow px-2 overflow-x-scroll"
        onScroll={handleRulerScroll}
        ref={rulerDivRef}
      >
        <Flatboard />
      </div>
    </div>
  )
}
