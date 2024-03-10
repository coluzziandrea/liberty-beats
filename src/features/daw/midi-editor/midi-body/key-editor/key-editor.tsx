import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS, Key } from '../../../../../model/note/note'
import { MidiEditorKeyGrid } from './midi-editor-key-grid/midi-editor-key-grid'
import { TickPlaceholder } from '../../../common/components/tick-placeholder/tick-placeholder'
import { selectPlayingKeys } from '../../../instrument/store/selectors'
import { useMidiEditorHorizontalScroll } from '../../hooks/useMidiEditorHorizontalScroll'
import React from 'react'
import { useMidiEditorVerticalScroll } from '../../hooks/useMidiEditorVerticalScroll'
import { addNoteToCurrentTrack } from '../../../playlist/store/playlist-slice'
import { selectLastKeyDuration } from '../../store/selectors'
import { Bar } from '../../../../../model/bar/bar'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../constants'
import { PianoRollBar } from './piano-roll-bar/piano-roll-bar'
import { useMidiEditorDimensions } from './hooks/useMidiEditorDimensions'

export const KeyEditor = () => {
  const dispatch = useDispatch()
  const selectedTrack = useSelector(selectSelectedTrack)
  const playingKeys = useSelector(selectPlayingKeys)
  const lastKeyDuration = useSelector(selectLastKeyDuration)

  const midiRollRef = React.useRef<HTMLDivElement>(null)
  const keyboardRef = React.useRef<HTMLDivElement>(null)

  const handleMidiHorizontalScroll = useMidiEditorHorizontalScroll(midiRollRef)
  const handleMidiVerticalScroll = useMidiEditorVerticalScroll([
    midiRollRef,
    keyboardRef,
  ])

  const midiEditorDimensions = useMidiEditorDimensions()

  if (!selectedTrack) return null

  const handleAddKeyFromBar = (
    bar: Bar,
    key: Key,
    startAtRelativeTick: number
  ) => {
    console.log('handleAddKeyFromBar', key, startAtRelativeTick)
  }

  const handleAddKeyFromGrid = (key: Key, beat: number) => {
    console.log('key double clicked from MidiEditorKeyGrid', key, beat)
    dispatch(
      addNoteToCurrentTrack({
        key,
        startAtTick: beat,
        duration: lastKeyDuration,
      })
    )
  }

  return (
    <div className="flex w-full flex-grow  bg-zinc-800">
      <div
        ref={keyboardRef}
        onScroll={handleMidiVerticalScroll}
        className="min-w-20 w-20 max-w-20 overflow-auto no-scrollbar"
      >
        <Keyboard
          selectedTrack={selectedTrack}
          showedKeys={KEYS}
          paddingTop={PIANO_ROLL_BAR_HEADER_HEIGHT}
          playingKeys={playingKeys}
          whiteKeySize={midiEditorDimensions.whiteKeySize}
          orientation="vertical"
        />
      </div>

      <div
        onScroll={(e) => {
          handleMidiHorizontalScroll(e)
          handleMidiVerticalScroll(e)
        }}
        ref={midiRollRef}
        className="overflow-auto pl-2"
      >
        <div className="relative h-max min-h-full">
          <div className="flex flex-col">
            <MidiEditorKeyGrid
              showedKeys={KEYS}
              onKeyDoubleClick={handleAddKeyFromGrid}
            />

            {selectedTrack.bars.map((bar: Bar) => (
              <PianoRollBar
                key={bar.id}
                track={selectedTrack}
                showedKeys={KEYS}
                bar={bar}
                onAddKey={handleAddKeyFromBar}
              />
            ))}
          </div>

          <TickPlaceholder />
        </div>
      </div>
    </div>
  )
}
