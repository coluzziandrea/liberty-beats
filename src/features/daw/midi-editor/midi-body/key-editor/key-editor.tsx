import { useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS } from '../../../../../model/note/note'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { MidiEditorKeyGrid } from './midi-editor-key-grid/midi-editor-key-grid'
import { TickPlaceholder } from '../../../common/components/tick-placeholder/tick-placeholder'
import { selectPlayingKeys } from '../../../instrument/store/selectors'

export const KeyEditor = () => {
  const selectedTrack = useSelector(selectSelectedTrack)
  const maxBars = useSelector(selectMaxBars)
  const playingKeys = useSelector(selectPlayingKeys)

  if (!selectedTrack) return null

  const whiteKeySize = 20

  return (
    <div className="flex w-full flex-grow  bg-zinc-800">
      <div className="min-w-20 w-20 max-w-20 overflow-auto no-scrollbar">
        <Keyboard
          selectedTrack={selectedTrack}
          showedKeys={KEYS}
          playingKeys={playingKeys}
          whiteKeySize={whiteKeySize}
          orientation="vertical"
        />
      </div>

      <div className="overflow-auto pl-2">
        <div className="relative h-max min-h-full">
          <div className="flex flex-col">
            <MidiEditorKeyGrid
              selectedTrack={selectedTrack}
              maxBars={maxBars}
              showedKeys={KEYS}
              playingKeys={playingKeys}
              whiteKeySize={whiteKeySize}
            />
          </div>
          <TickPlaceholder />
        </div>
      </div>
    </div>
  )
}
