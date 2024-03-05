import { TrackList } from './track-list/track-list'
import { Flatboard } from './flatboard/flatboard'
import React from 'react'
import { useRulerScroll } from '../common/hooks/use-ruler-scroll'
import { useFlatboardScroll } from './hooks/use-flatboard-scroll'

export const Playlist = () => {
  const flatboardRef = React.useRef<HTMLDivElement>(null)
  const trackListDivRef = React.useRef<HTMLDivElement>(null)

  const handleRulerScroll = useRulerScroll(flatboardRef)
  const handleTracklistScroll = useFlatboardScroll(trackListDivRef)

  return (
    <div className="flex flex-row justify-between gap-1 divide-x divide-slate-600 w-full ">
      <div
        className="flex max-w-72 min-w-72 no-scrollbar overflow-y-scroll"
        onScroll={handleTracklistScroll}
        ref={trackListDivRef}
      >
        <TrackList />
      </div>

      <div
        className="flex flex-grow px-2 overflow-auto"
        onScroll={(e) => {
          handleRulerScroll(e)
          handleTracklistScroll(e)
        }}
        ref={flatboardRef}
      >
        <Flatboard />
      </div>
    </div>
  )
}
