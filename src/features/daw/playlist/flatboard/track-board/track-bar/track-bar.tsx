import { PianoRollKey } from '../../../../common/components/piano-roll-key/piano-roll-key'
import {
  FLATBOARD_BAR_HEADER_HEIGHT,
  TICK_WIDTH_PIXEL,
  TRACK_HEIGHT,
} from '../../../constants'
import { TrackBarPopupMenu } from './track-bar-popup-menu/track-bar-popup-menu'
import { TrackBarProps } from './types'
import { useTrackBarData } from './use-track-bar-data'

export const TrackBar = (props: TrackBarProps) => {
  const {
    bar,
    track,
    barLengthPixel,
    barOffsetStyle,
    barColor,
    onSelectBar,
    onBarDetails,
    handleDragStart,
    headerColor,
    showedKeys,
    keyHeight,
    handleResizeMouseDown,
    onContextMenu,
    menuIsOpen,
    menuProps,
  } = useTrackBarData(props)
  return (
    <div
      key={bar.id}
      className="absolute"
      style={{
        width: barLengthPixel,
        left: barOffsetStyle,
        height: `${TRACK_HEIGHT}px`,
      }}
      onContextMenu={onContextMenu}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute flex flex-col ${barColor} opacity-80 rounded-md cursor-grab h-full w-full`}
          onClick={() => onSelectBar(bar)}
          onDoubleClick={() => onBarDetails(bar)}
          draggable
          onDragStart={handleDragStart}
        >
          <div
            className={`flex flex-row ${headerColor} pl-2 rounded-t-md text-white text-sm font-bold select-none`}
            style={{
              height: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
              minHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
              maxHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
            }}
          >
            {bar.title}
          </div>
          <div className="flex-grow w-full h-full relative">
            {bar.notes.map((note) => (
              <PianoRollKey
                key={note.id}
                bar={bar}
                track={track}
                note={note}
                showedKeys={showedKeys}
                beatWidth={TICK_WIDTH_PIXEL}
                keyHeight={keyHeight}
                nonMutedColorTailwindClass="bg-white"
              />
            ))}
          </div>
        </div>
        <div
          className="absolute z-20 right-0 h-full w-2 cursor-ew-resize"
          onMouseDown={handleResizeMouseDown}
        />

        {menuIsOpen && (
          <div className="fixed mt-4 ml-4 z-50 h-fit w-fit">
            <TrackBarPopupMenu {...menuProps} />
          </div>
        )}
      </div>
    </div>
  )
}
