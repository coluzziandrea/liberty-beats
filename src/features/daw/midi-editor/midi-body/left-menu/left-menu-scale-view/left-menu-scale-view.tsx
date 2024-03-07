import { MdViewTimeline } from 'react-icons/md'
import { SCALE_KEYS, SCALE_TYPES } from '../../../../../../model/scale/scale'

export const LeftMenuScaleView = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <MdViewTimeline className="text-orange-500" />
        <p className="text-sm font-bold">Scale View</p>
      </div>

      <div className="flex flex-row gap-2">
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex flex-row gap-1">
          <select className="text-sm">
            {SCALE_KEYS.map((scaleKey) => (
              <option key={scaleKey} value={scaleKey}>
                {scaleKey}
              </option>
            ))}
          </select>

          <select className="text-sm">
            {SCALE_TYPES.map((scaleType) => (
              <option key={scaleType} value={scaleType}>
                {scaleType}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
