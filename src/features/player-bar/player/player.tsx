import { useDispatch, useSelector } from 'react-redux'
import { selectIsPlaying } from '../store/selectors'
import { togglePlay } from '../store/playerBarSlice'

export const Player = () => {
  const isPlaying = useSelector(selectIsPlaying)

  const dispatch = useDispatch()

  return (
    <div>
      <button>{'|<'}</button>
      {isPlaying ? (
        <button onClick={() => dispatch(togglePlay())}>{'||'}</button>
      ) : (
        <button onClick={() => dispatch(togglePlay())}>{'>'}</button>
      )}
      <button>{'[]'}</button>
      <span>{'00:00.0'}</span>
    </div>
  )
}
