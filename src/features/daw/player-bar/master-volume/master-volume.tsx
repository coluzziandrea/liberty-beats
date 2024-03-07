import { FaVolumeHigh } from 'react-icons/fa6'

export const MasterVolume = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <FaVolumeHigh />
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
  )
}
