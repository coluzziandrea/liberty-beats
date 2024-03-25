import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedNoteId } from '../../../store/selectors'
import { selectSelectedTrack } from '../../../../playlist/store/selectors'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { Bar } from '../../../../../../model/bar/bar'
import { setCurrentTrackNoteVelocity } from '../../../../playlist/store/playlist-slice'

export const LeftMenuVelocity = () => {
  const selectedNoteId = useSelector(selectSelectedNoteId)
  const selectedTrack = useSelector(selectSelectedTrack)
  const dispatch = useDispatch()

  const [noteVelocity, setNoteVelocity] = useState(100)

  const debouncedNoteVelocity = useDebounce(noteVelocity, 100)

  useEffect(() => {
    if (selectedNoteId === null) return
    dispatch(
      setCurrentTrackNoteVelocity({
        noteId: selectedNoteId,
        velocity: noteVelocity,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNoteVelocity, dispatch])

  useEffect(() => {
    if (selectedNoteId === null) {
      setNoteVelocity(100)
      return
    }
    const bar = selectedTrack?.bars.find((bar: Bar) =>
      bar.notes.find((note) => note.id === selectedNoteId)
    )

    const note = bar?.notes.find((n) => n.id === selectedNoteId)
    setNoteVelocity(note ? note.velocity : 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNoteId])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center justify-start">
          <p className="font-light text-sm">Velocity</p>
          <p className="font-bold">{noteVelocity}</p>
        </div>

        <input
          disabled={selectedNoteId === null}
          id="minmax-range"
          type="range"
          min="0"
          max="100"
          value={noteVelocity}
          onChange={(e) => {
            setNoteVelocity(parseInt(e.target.value))
          }}
          className={`h-1 w-full cursor-ew-resize rounded-lg accent-${selectedTrack?.color}-600`}
        ></input>
      </div>
    </div>
  )
}
