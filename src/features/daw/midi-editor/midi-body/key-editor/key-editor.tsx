import { useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS } from '../../../../../model/note/note'
import { MixGrid } from '../../../common/components/mix-grid/mix-grid'
import { selectMaxBars } from '../../../playlist-header/store/selectors'

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

      <div className="relative overflow-x-auto pl-2">
        <div className="flex flex-row h-20 min-h-20 max-h-20">
          <MixGrid
            track={selectedTrack}
            maxBars={maxBars}
            onSelectTick={() => {}}
            onCreateBar={() => {}}
            isSelected={true}
          />
        </div>
      </div>
    </div>
  )
}
