import { TrackColor } from '../../../../../model/track/track-color'

export type SwitchProps = {
  checked: boolean
  mainColor?: TrackColor

  onChange: (checked: boolean) => void
}

export const Switch = ({ checked, onChange, mainColor }: SwitchProps) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          value=""
          className="sr-only peer"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`relative w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${mainColor}-800 rounded-full peer peer-checked:after:translate-x-full border-gray-900 dark:border-gray-600 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black dark:after:bg-white after:border-gray-900 dark:after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-${mainColor}-600`}
        ></div>
      </label>
    </div>
  )
}
