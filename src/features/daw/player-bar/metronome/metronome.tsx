import { FaPlus, FaMinus } from 'react-icons/fa'
import { PiMetronomeBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { selectBpm, selectMetronomeActive } from '../store/selectors'
import {
  decreaseBpm,
  increaseBpm,
  toggleMetronome,
} from '../store/playerBarSlice'
// import { MdKeyboardArrowDown } from 'react-icons/md'

export const Metronome = () => {
  const bpm = useSelector(selectBpm)
  const metronomeActive = useSelector(selectMetronomeActive)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <button
        className={metronomeActive ? 'text-blue-600 dark:text-blue-400' : ''}
        onClick={() => dispatch(toggleMetronome())}
      >
        <PiMetronomeBold />
      </button>

      {/* <button>
        <MdKeyboardArrowDown />
      </button> */}

      <div className="flex flex-row justify-center items-center gap-2">
        <button
          onClick={() => {
            dispatch(decreaseBpm())
          }}
        >
          <FaMinus />
        </button>
        <div className="flex items-baseline gap-1 select-none">
          <span className="font-bold text-lg">{bpm}</span>
          <span className="font-light text-xs">bpm</span>
        </div>

        <button
          onClick={() => {
            dispatch(increaseBpm())
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
