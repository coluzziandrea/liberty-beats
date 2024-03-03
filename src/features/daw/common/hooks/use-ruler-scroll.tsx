import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { setRulerScrollPosition } from '../../playlist-header/store/playlist-header-slice'
import { useEffect } from 'react'

export const useRulerScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const rulerScroll = useSelector(
    (state: RootState) => state.playlistHeader.rulerScrollPosition
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (ref.current && ref.current.scrollLeft !== rulerScroll) {
      ref.current.scrollLeft = rulerScroll
    }
  }, [rulerScroll, ref])

  const handleRulerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setRulerScrollPosition(e.currentTarget.scrollLeft))
  }

  return handleRulerScroll
}
