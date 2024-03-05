import { useRulerScroll } from '../common/hooks/use-ruler-scroll'
import { PlaylistCommands } from './playlist-commands/playlist-commands'
import { Ruler } from './ruler/ruler'
import React from 'react'

export const PlaylistHeader = () => {
  const rulerDivRef = React.useRef<HTMLDivElement>(null)
  const handleRulerScroll = useRulerScroll(rulerDivRef)

  return (
    <div className="flex flex-row justify-between gap-1 divide-x divide-slate-600 w-full">
      <div className="flex my-2 max-w-72 min-w-72">
        <PlaylistCommands />
      </div>

      <div
        className="flex flex-grow px-2 no-scrollbar overflow-x-scroll"
        onScroll={handleRulerScroll}
        ref={rulerDivRef}
      >
        <Ruler />
      </div>
    </div>
  )
}
