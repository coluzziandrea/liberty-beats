import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useEffect } from 'react'
import { setFlatboardScroll } from '../store/playlist-slice'

export const useFlatboardScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const flatboardScroll = useSelector(
    (state: RootState) => state.playlist.flatboardScroll
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (ref.current && ref.current.scrollTop !== flatboardScroll) {
      ref.current.scrollTop = flatboardScroll
    }
  }, [flatboardScroll, ref])

  const handleFlatboardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setFlatboardScroll(e.currentTarget.scrollTop))
  }

  return handleFlatboardScroll
}
