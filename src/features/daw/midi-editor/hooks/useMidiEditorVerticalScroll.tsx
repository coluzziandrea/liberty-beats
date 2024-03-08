import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { useEffect } from 'react'
import { setMidiEditorVerticalScroll } from '../store/midi-editor-slice'

export const useMidiEditorVerticalScroll = (
  elementsToControl: React.RefObject<HTMLDivElement>[]
) => {
  const verticalScroll = useSelector(
    (state: RootState) => state.midiEditor.verticalScroll
  )
  const dispatch = useDispatch()

  useEffect(() => {
    elementsToControl.forEach((element) => {
      if (element.current && element.current.scrollTop !== verticalScroll) {
        element.current.scrollTop = verticalScroll
      }
    })
  }, [verticalScroll, elementsToControl])

  const handleFlatboardScroll = (e: React.UIEvent<HTMLDivElement>) => {
    dispatch(setMidiEditorVerticalScroll(e.currentTarget.scrollTop))
  }

  return handleFlatboardScroll
}
