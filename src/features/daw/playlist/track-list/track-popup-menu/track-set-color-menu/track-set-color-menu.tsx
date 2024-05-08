import { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import {
  TRACK_COLORS,
  TrackColor,
} from '../../../../../../model/track/track-color'

export type TrackSetColorMenuProps = {
  currentColor: TrackColor
  onSetColor: (color: TrackColor) => void
}

const ColorGrid = (props: TrackSetColorMenuProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 p-2">
      {TRACK_COLORS.map((item, index) => (
        <div
          key={index}
          onClick={() => props.onSetColor(item)}
          className={`rounded-full cursor-pointer border-2 w-6 h-6 bg-${item}-500 ${
            props.currentColor === item
              ? 'border-slate-200'
              : 'border-slate-600'
          }`}
        />
      ))}
    </div>
  )
}

export const TrackSetColorMenu = ({
  currentColor,
  onSetColor,
}: TrackSetColorMenuProps) => {
  const [showColorMenu, setShowColorMenu] = useState(false)
  return (
    <div
      className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 select-none flex flex-row gap-2 items-center"
      onMouseEnter={() => setShowColorMenu(true)}
      onMouseLeave={() => setShowColorMenu(false)}
    >
      <span className={`rounded-full w-4 h-4 bg-${currentColor}-500`} />
      <p className="font-bold text-sm">Set Color</p>
      <div className="flex-grow flex justify-end">
        <div className="relative h-full">
          <IoIosArrowForward />

          <div
            hidden={!showColorMenu}
            className="fixed ml-4 -mt-4 z-50 h-fit w-fit"
          >
            <div className="w-fit flex flex-col bg-zinc-200 dark:bg-zinc-900 shadow-sm shadow-zinc-600 rounded-md overflow-hidden p-2">
              <ColorGrid currentColor={currentColor} onSetColor={onSetColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
