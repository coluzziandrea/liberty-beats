import { FaPlus, FaMinus } from 'react-icons/fa'
import { PiMetronomeBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { selectBpm } from '../store/selectors'

export const Metronome = () => {
  const bpm = useSelector(selectBpm)
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <button>
        <PiMetronomeBold />
      </button>

      <div className="flex flex-row justify-center items-center gap-2">
        <button>
          <FaMinus />
        </button>
        <span>{`${bpm} bpm`}</span>
        <button>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
