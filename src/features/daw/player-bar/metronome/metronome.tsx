import { FaPlus, FaMinus } from 'react-icons/fa'
import { PiMetronomeBold } from 'react-icons/pi'

export const Metronome = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <button>
        <PiMetronomeBold />
      </button>

      <div className="flex flex-row justify-center items-center gap-2">
        <button>
          <FaMinus />
        </button>
        <span>{'120 bpm'}</span>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
