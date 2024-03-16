import { MouseEvent } from 'react'
import { Bar } from '../../../../../../model/bar/bar'
import { Track, TrackUtils } from '../../../../../../model/track/track'
import { TICK_WIDTH_PIXEL } from '../../../../playlist/constants'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'
import { PianoRollNote } from './piano-roll-key/piano-roll-key'
import { Key } from '../../../../../../model/note/note'
import { useMidiEditorDimensions } from '../hooks/useMidiEditorDimensions'

export type PianoRollBarProps = {
  track: Track
  bar: Bar
  showedKeys: Readonly<Key[]>
  onAddKey: (bar: Bar, key: Key, startAtRelativeTick: number) => void
}

export const PianoRollBar = ({
  track,
  bar,
  showedKeys,
  onAddKey,
}: PianoRollBarProps) => {
  const midiEditorDimensions = useMidiEditorDimensions()

  const barLengthPixel = (bar.endAtTick - bar.startAtTick) * TICK_WIDTH_PIXEL
  const barWidthStyle = `${barLengthPixel}px`

  const barOffsetPixel = bar.startAtTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`

  const barHeaderColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-600'
    : `bg-${track.color}-700`

  const barColor = TrackUtils.isTrackEffectivelyMuted(track)
    ? 'bg-gray-200'
    : `bg-${track.color}-200`

  const onBarEmptyDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    const barDoubleClickX = e.clientX - rect.left
    const barDoubleClickY = e.clientY - rect.top

    const keyIndex = Math.floor(
      barDoubleClickY / midiEditorDimensions.keyHeight
    )

    const relativeBeat = Math.floor(
      barDoubleClickX / midiEditorDimensions.beatWidth
    )
    console.log(showedKeys[keyIndex])
    onAddKey(bar, showedKeys[keyIndex], relativeBeat)
  }

  return (
    <div
      key={bar.id}
      className="absolute"
      style={{
        width: barWidthStyle,
        left: barOffsetStyle,
        height: '100%',
        top: 0,
      }}
    >
      <div
        className={`flex flex-col h-full w-full`}
        style={{ width: barLengthPixel, height: '100%' }}
      >
        <div
          className={`sticky z-30 ${barHeaderColor} rounded-t-md cursor-grab z-20 pl-2`}
          style={{
            top: 0,
            height: PIANO_ROLL_BAR_HEADER_HEIGHT,
          }}
        >
          <p className="text-white text-sm font-bold select-none">
            {bar.title}
          </p>
        </div>

        <div className="flex-grow relative">
          <div
            className={`absolute left-0 top-0 h-full w-full opacity-30 ${barColor}`}
            onDoubleClick={onBarEmptyDoubleClick}
          />
          {bar.notes.map((note) => (
            <PianoRollNote
              key={note.id}
              track={track}
              note={note}
              showedKeys={showedKeys}
              midiEditorDimensions={midiEditorDimensions}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
