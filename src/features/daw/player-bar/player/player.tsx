import { useDispatch, useSelector } from 'react-redux'
import { selectIsPlaying, selectTime } from '../store/selectors'
import { togglePlay } from '../store/playerBarSlice'
import {
  FaPlay,
  FaPause,
  FaBackward,
  // , FaCircle
} from 'react-icons/fa'
// import { TfiLoop } from 'react-icons/tfi'

export const Player = () => {
  const isPlaying = useSelector(selectIsPlaying)
  const time = useSelector(selectTime)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row gap-1 items-center justify-center">
      <button>
        <FaBackward />
      </button>
      {isPlaying ? (
        <button onClick={() => dispatch(togglePlay())}>
          <FaPause />
        </button>
      ) : (
        <button onClick={() => dispatch(togglePlay())}>
          <FaPlay />
        </button>
      )}
      {/* TODO - Record & Loop buttons */}
      {/* <button className="text-red-500">
        <FaCircle />
      </button> */}
      {/* <button>
        <TfiLoop />
      </button> */}
      <span>{time}</span>
    </div>
  )
}
