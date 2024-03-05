import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useEffect } from 'react'
import { setFlatboardScroll } from '../store/playlist-slice'

export const useFlatboardScroll = (
  elementsToControl: React.RefObject<HTMLDivElement>[]
) => {
  const flatboardScroll = useSelector(
    (state: RootState) => state.playlist.flatboardScroll
  )
  const dispatch = useDispatch()

  useEffect(() => {
    elementsToControl.forEach((element) => {
      if (element.current && element.current.scrollTop !== flatboardScroll) {
        element.current.scrollTop = flatboardScroll
      }
    })
  }, [flatboardScroll, elementsToControl])

  const handleFlatboardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setFlatboardScroll(e.currentTarget.scrollTop))
  }

  return handleFlatboardScroll
}
