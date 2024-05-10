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
      icon: <BsFillCursorFill size={16} />,
    },
    {
      id: 'draw',
      icon: <RiPencilFill size={16} />,
    },
    {
      id: 'delete',
      icon: <FaTrash size={16} />,
    },
  ]

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-1">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`flex items-center justify-center text-xs ${
              editorMode === mode.id
                ? 'dark:bg-white dark:text-zinc-800 bg-zinc-800 text-white'
                : 'dark:bg-zinc-800 dark:text-white bg-white zinc-800'
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
              ? `bg-${selectedTrack?.color}-900 text-${selectedTrack?.color}-200 dark:bg-${selectedTrack?.color}-100 dark:text-${selectedTrack?.color}-800`
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
