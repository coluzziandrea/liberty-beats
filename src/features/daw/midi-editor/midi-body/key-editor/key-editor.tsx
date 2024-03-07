import { useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS } from '../../../../../model/note/note'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { MidiEditorKeyGrid } from './midi-editor-key-grid/midi-editor-key-grid'
import { TickPlaceholder } from '../../../common/components/tick-placeholder/tick-placeholder'

export const KeyEditor = () => {
  const selectedTrack = useSelector(selectSelectedTrack)
  const maxBars = useSelector(selectMaxBars)

  if (!selectedTrack) return null

  return (
    <div className="flex w-full flex-grow  bg-zinc-800">
      <div className="min-w-20 w-20 max-w-20 overflow-auto no-scrollbar">
        <Keyboard
          selectedTrack={selectedTrack}
          showedKeys={KEYS}
          whiteKeySize={20}
          orientation="vertical"
        />
      </div>

      <div className="overflow-auto pl-2">
        <div className="relative h-max min-h-full">
          <div className="flex flex-col gap-1">
            <MidiEditorKeyGrid
              selectedTrack={selectedTrack}
              maxBars={maxBars}
            />
          </div>
          <TickPlaceholder />
        </div>
      </div>
    </div>
  )
}
