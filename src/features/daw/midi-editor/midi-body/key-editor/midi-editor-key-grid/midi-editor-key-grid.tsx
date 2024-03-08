import { Key, isKeyBlack } from '../../../../../../model/note/note'
import { Track } from '../../../../../../model/track/track'
import { MixGrid } from '../../../../common/components/mix-grid/mix-grid'

export type MidiEditorKeyGridProps = {
  selectedTrack: Track
  showedKeys: Readonly<Key[]>
  playingKeys: Readonly<Key[]>
  maxBars: number
  whiteKeySize: number
}

export const MidiEditorKeyGrid = ({
  selectedTrack,
  maxBars,
  showedKeys,
  playingKeys,
  whiteKeySize,
}: MidiEditorKeyGridProps) => {
  const rowHeight = whiteKeySize * 0.57

  const getKeyRowColor = (rowIndex: number) => {
    if (playingKeys.includes(showedKeys[rowIndex])) {
      return `bg-${selectedTrack.color}-800`
    } else {
      return isKeyBlack(showedKeys[rowIndex]) ? 'bg-zinc-900' : 'bg-zinc-800'
    }
  }

  return (
    <>
      {Array.from({ length: maxBars }).map((_, i) => (
        <div className="flex flex-row" style={{ height: `${rowHeight}px` }}>
          <MixGrid
            maxBars={maxBars}
            onSelectTick={() => {}}
            onCreateBar={() => {}}
            evenColumnsColor={getKeyRowColor(i)}
            oddColumnsColor={getKeyRowColor(i)}
          />
        </div>
      ))}
    </>
  )
}
