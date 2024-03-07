import { useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS } from '../../../../../model/note/note'
import { EditorGrid } from './editor-grid/editor-grid'

export const KeyEditor = () => {
  const selectedTrack = useSelector(selectSelectedTrack)

  if (!selectedTrack) return null

  return (
    <div className="flex w-full flex-grow  bg-zinc-800">
      <div className="w-20 max-w-20 overflow-auto no-scrollbar">
        <Keyboard
          selectedTrack={selectedTrack}
          showedKeys={KEYS}
          whiteKeySize={20}
          orientation="vertical"
        />
      </div>

      <div className="flex-grow overflow-auto">
        <EditorGrid />
      </div>
    </div>
  )
}
