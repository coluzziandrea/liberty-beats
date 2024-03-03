export const MasterVolume = () => {
  return (
    <>
      <label
        htmlFor="minmax-range"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Volume
      </label>
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="10"
        value="5"
        onChange={() => {}}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      ></input>
    </>
  )
}
