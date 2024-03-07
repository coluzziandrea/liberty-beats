import { Track } from '../../../../../../model/track/track'
import { MixGrid } from '../../../../common/components/mix-grid/mix-grid'

export type MidiEditorKeyGridProps = {
  selectedTrack: Track
  maxBars: number
  whiteKeySize: number
}

export const MidiEditorKeyGrid = ({
  selectedTrack,
  maxBars,
  whiteKeySize,
}: MidiEditorKeyGridProps) => {
  const rowHeight = whiteKeySize * 0.75

  return (
    <>
      {Array.from({ length: maxBars }).map((_, i) => (
        <div className="flex flex-row" style={{ height: `${rowHeight}px` }}>
          <MixGrid
            track={selectedTrack}
            maxBars={maxBars}
            onSelectTick={() => {}}
            onCreateBar={() => {}}
            isSelected={true}
            highlightType="row"
          />
        </div>
      ))}
    </>
  )
}
