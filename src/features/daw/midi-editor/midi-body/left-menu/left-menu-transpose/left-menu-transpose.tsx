import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedNoteId } from '../../../store/selectors'
import { transposeCurrentTrackNoteKey } from '../../../../playlist/store/playlist-slice'

export const LeftMenuTranspose = () => {
  const selectedNoteId = useSelector(selectSelectedNoteId)
  const dispatch = useDispatch()

  const transposeItems = [
    {
      id: 1,
      name: '+ 1',
      value: 1,
    },
    {
      id: 2,
      name: '- 1',
      value: -1,
    },
    {
      id: 3,
      name: '+ 12',
      value: 12,
    },
    {
      id: 4,
      name: '- 12',
      value: -12,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <p className="text-xs font-bold">Transpose</p>
      </div>

      <div className="flex flex-row gap-4">
        {transposeItems.map((item) => (
          <button
            key={item.id}
            className={`${
              selectedNoteId === null ? 'cursor-not-allowed' : 'cursor-pointer'
            } p-2 rounded-md font-bold text-sm`}
            onClick={() => {
              if (selectedNoteId === null) return

              dispatch(
                transposeCurrentTrackNoteKey({
                  noteId: selectedNoteId,
                  keyOffset: item.value,
                })
              )
            }}
            disabled={selectedNoteId === null}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}
