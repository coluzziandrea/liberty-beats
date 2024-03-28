import { BsFillCursorFill } from 'react-icons/bs'
import { FaHeadphones, FaTrash } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectEditorMode,
  selectNotePreviewEnabled,
} from '../../../store/selectors'
import {
  selectNote,
  setEditorMode,
  toggleNotePreviewEnabled,
} from '../../../store/midi-editor-slice'
import { EditorMode } from '../../../store/types/types'
import { selectSelectedTrack } from '../../../../playlist/store/selectors'

export const LeftMenuHeader = () => {
  const editorMode = useSelector(selectEditorMode)
  const notePreviewEnabled = useSelector(selectNotePreviewEnabled)
  const selectedTrack = useSelector(selectSelectedTrack)
  const dispatch = useDispatch()

  const modes: {
    id: EditorMode
    icon: JSX.Element
  }[] = [
    {
      id: 'select',
      icon: <BsFillCursorFill />,
    },
    {
      id: 'draw',
      icon: <RiPencilFill />,
    },
    {
      id: 'delete',
      icon: <FaTrash />,
    },
  ]

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`w-[40px] h-[40px] text-xs ${
              editorMode === mode.id
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-white'
            }`}
            onClick={() => {
              dispatch(selectNote(null))
              dispatch(setEditorMode(mode.id))
            }}
          >
            {mode.icon}
          </button>
        ))}
      </div>

      <div>
        <button
          className={`rounded-full ${
            notePreviewEnabled
              ? `bg-${selectedTrack?.color}-900 text-${selectedTrack?.color}-400`
              : ''
          }`}
          onClick={() => {
            dispatch(toggleNotePreviewEnabled())
          }}
        >
          <FaHeadphones />
        </button>
      </div>
    </div>
  )
}
