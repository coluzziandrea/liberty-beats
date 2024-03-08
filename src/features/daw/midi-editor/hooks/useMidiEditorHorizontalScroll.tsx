import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useEffect } from 'react'
import { setMidiEditorHorizontalScroll } from '../store/midi-editor-slice'

export const useMidiEditorHorizontalScroll = (
  ref: React.RefObject<HTMLDivElement>
) => {
  const horizontalScroll = useSelector(
    (state: RootState) => state.midiEditor.horizontalScroll
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (ref.current && ref.current.scrollLeft !== horizontalScroll) {
      ref.current.scrollLeft = horizontalScroll
    }
  }, [horizontalScroll, ref])

  const handleRulerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setMidiEditorHorizontalScroll(e.currentTarget.scrollLeft))
  }

  return handleRulerScroll
}
