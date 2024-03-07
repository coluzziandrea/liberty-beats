import { Track } from '../../../../../../model/track/track'
import { MixGrid } from '../../../../common/components/mix-grid/mix-grid'

export type MidiEditorKeyGridProps = {
  selectedTrack: Track
  maxBars: number
}

export const MidiEditorKeyGrid = ({
  selectedTrack,
  maxBars,
}: MidiEditorKeyGridProps) => {
  return (
    <>
      {Array.from({ length: maxBars }).map((_, i) => (
        <div className="flex flex-row h-8 min-h-8 max-h-8">
          <MixGrid
            track={selectedTrack}
            maxBars={maxBars}
            onSelectTick={() => {}}
            onCreateBar={() => {}}
            isSelected={true}
          />
        </div>
      ))}
    </>
  )
}
