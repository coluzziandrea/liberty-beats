import { FaItunesNote } from 'react-icons/fa6'

export const LeftMenuNotes = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <FaItunesNote className="text-orange-500" />
        <p className="text-sm font-bold">MIDI Notes</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center justify-start">
          <p className="font-light text-sm">Velocity</p>
          <p className="font-bold">100</p>
        </div>

        <input
          id="minmax-range"
          type="range"
          min="0"
          max="10"
          value="5"
          onChange={() => {}}
          className="h-2 w-full cursor-ew-resize appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
        ></input>
      </div>
    </div>
  )
}
