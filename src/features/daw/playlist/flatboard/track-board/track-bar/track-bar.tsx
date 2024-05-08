import { PianoRollKey } from '../../../../common/components/piano-roll-key/piano-roll-key'
import { PopupMenu } from '../../../../common/components/popup-menu/popup-menu'
import {
  FLATBOARD_BAR_HEADER_HEIGHT,
  TICK_WIDTH_PIXEL,
  TRACK_HEIGHT,
} from '../../../constants'
import { TrackBarProps } from './types'
import { useTrackBarData } from './use-track-bar-data'

export const TrackBar = (props: TrackBarProps) => {
  const {
    bar,
    track,
    showedKeys,

    style: {
      barLengthPixel,
      barOffsetStyle,
      barColor,
      headerColor,
      keyHeight,
      barBorder,
    },

    onSelectBar,
    onBarDetails,
    onDragStart,
    onResizeMouseDown,
    onContextMenu,

    renameInput,
    menu,
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
          className={`absolute flex flex-col ${barColor} ${barBorder} opacity-80 rounded-md cursor-grab h-full w-full`}
          onClick={() => onSelectBar(bar)}
          onDoubleClick={() => onBarDetails(bar)}
          draggable
          onDragStart={onDragStart}
        >
          <div
            className={`flex flex-row ${headerColor} pl-2 rounded-t-md text-sm font-bold select-none`}
            style={{
              height: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
              minHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
              maxHeight: `${FLATBOARD_BAR_HEADER_HEIGHT}px`,
            }}
          >
            {
              // Show the input for renaming the track
              renameInput.isEnabled ? (
                <input
                  type="text"
                  className="w-full p-1 mt-1 bg-zinc-300 dark:bg-zinc-800"
                  value={renameInput.value}
                  autoFocus
                  onBlur={renameInput.onInputBlur}
                  onChange={renameInput.onInputChange}
                />
              ) : (
                <span className="select-none font-bold text-white text-sm">
                  {bar.title}
                </span>
              )
            }
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
          onMouseDown={onResizeMouseDown}
        />

        {menu.isOpen && (
          <div className="fixed mt-4 ml-4 z-50 h-fit w-fit">
            <PopupMenu {...menu} />
          </div>
        )}
      </div>
    </div>
  )
}
