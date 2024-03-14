import { useDispatch, useSelector } from 'react-redux'
import { selectIsPlaying, selectTime } from '../store/selectors'
import { togglePlay, stop } from '../store/playerBarSlice'
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaStepBackward,
  FaStop,
  // , FaCircle
} from 'react-icons/fa'
import {
  requestBackwardTickPosition,
  requestForwardTickPosition,
  requestNewTickPosition,
} from '../../playlist-header/store/playlist-header-slice'
// import { TfiLoop } from 'react-icons/tfi'

export const Player = () => {
  const isPlaying = useSelector(selectIsPlaying)
  const time = useSelector(selectTime)
  const dispatch = useDispatch()

  const handleStop = () => {
    dispatch(stop())
    dispatch(requestNewTickPosition(0))
  }

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  const milliseconds = Math.floor((time - seconds) * 10)
  const padTimePart = (timePart: number) => {
    return String(timePart).padStart(2, '0')
  }

  const timeString = `${padTimePart(minutes)}:${padTimePart(
    seconds
  )}:${milliseconds}`

  return (
    <div className="flex flex-row gap-1 items-center justify-center">
      {isPlaying ? (
        <button onClick={handleStop}>
          <FaStop />
        </button>
      ) : (
        <button onClick={() => dispatch(requestNewTickPosition(0))}>
          <FaStepBackward />
        </button>
      )}

      <button onClick={() => dispatch(requestBackwardTickPosition())}>
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
      <button onClick={() => dispatch(requestForwardTickPosition())}>
        <FaForward />
      </button>
      {/* TODO - Record & Loop buttons */}
      {/* <button className="text-red-500">
        <FaCircle />
      </button> */}
      {/* <button>
        <TfiLoop />
      </button> */}
      <span className="select-none font-bold text-lg">{timeString}</span>
    </div>
  )
}
