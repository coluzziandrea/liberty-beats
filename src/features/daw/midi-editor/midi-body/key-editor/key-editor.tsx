import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { KEYS, Key } from '../../../../../model/note/note'
import { selectMaxBars } from '../../../playlist-header/store/selectors'
import { MidiEditorKeyGrid } from './midi-editor-key-grid/midi-editor-key-grid'
import { TickPlaceholder } from '../../../common/components/tick-placeholder/tick-placeholder'
import { selectPlayingKeys } from '../../../instrument/store/selectors'
import { useMidiEditorHorizontalScroll } from '../../hooks/useMidiEditorHorizontalScroll'
import React from 'react'
import { useMidiEditorVerticalScroll } from '../../hooks/useMidiEditorVerticalScroll'
import { addKeyToCurrentTrack } from '../../../playlist/store/playlist-slice'
import { selectLastKeyDuration } from '../../store/selectors'
import { Bar } from '../../../../../model/bar/bar'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../constants'
import { PianoRollBar } from './piano-roll-bar/piano-roll-bar'

export const KeyEditor = () => {
  const dispatch = useDispatch()
  const selectedTrack = useSelector(selectSelectedTrack)
  const maxBars = useSelector(selectMaxBars)
  const playingKeys = useSelector(selectPlayingKeys)
  const lastKeyDuration = useSelector(selectLastKeyDuration)

  const midiRollRef = React.useRef<HTMLDivElement>(null)
  const keyboardRef = React.useRef<HTMLDivElement>(null)

  const handleMidiHorizontalScroll = useMidiEditorHorizontalScroll(midiRollRef)
  const handleMidiVerticalScroll = useMidiEditorVerticalScroll([
    midiRollRef,
    keyboardRef,
  ])

  if (!selectedTrack) return null

  const whiteKeySize = 20

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
          whiteKeySize={whiteKeySize}
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
              maxBars={maxBars}
              showedKeys={KEYS}
              whiteKeySize={whiteKeySize}
              onKeyDoubleClick={(key: Key, beat: number) => {
                console.log(
                  'key double clicked from MidiEditorKeyGrid',
                  key,
                  beat
                )
                dispatch(
                  addKeyToCurrentTrack({
                    key,
                    startAtTick: beat,
                    duration: lastKeyDuration,
                  })
                )
              }}
            />

            {selectedTrack.bars.map((bar: Bar) => (
              <PianoRollBar
                key={bar.id}
                track={selectedTrack}
                bar={bar}
                onSelectBar={() => {}}
                onBarDetails={() => {}}
              />
            ))}
          </div>

          <TickPlaceholder />
        </div>
      </div>
    </div>
  )
}
