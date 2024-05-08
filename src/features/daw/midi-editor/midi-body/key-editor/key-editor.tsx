import { useDispatch, useSelector } from 'react-redux'
import { Keyboard } from '../../../common/components/keyboard/keyboard'
import { selectSelectedTrack } from '../../../playlist/store/selectors'
import { MidiEditorKeyGrid } from './midi-editor-key-grid/midi-editor-key-grid'
import { TickPlaceholder } from '../../../common/components/tick-placeholder/tick-placeholder'
import { selectPlayingTrackKeys } from '../../../instrument/store/selectors'
import { useMidiEditorHorizontalScroll } from '../../hooks/useMidiEditorHorizontalScroll'
import React from 'react'
import { useMidiEditorVerticalScroll } from '../../hooks/useMidiEditorVerticalScroll'
import {
  addNoteToCurrentBar,
  addNoteToCurrentTrack,
} from '../../../playlist/store/playlist-slice'
import {
  selectEditorMode,
  selectLastKeyDuration,
  selectNotePreviewEnabled,
  selectScaleViewEnabled,
  selectSelectedScale,
} from '../../store/selectors'
import { Bar } from '../../../../../model/bar/bar'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../constants'
import { PianoRollBar } from './piano-roll-bar/piano-roll-bar'
import { useMidiEditorDimensions } from './hooks/useMidiEditorDimensions'
import { KEYS, Key } from '../../../../../model/note/key/key'
import { selectNote } from '../../store/midi-editor-slice'
import {
  addPlayingKey,
  removePlayingKey,
} from '../../../instrument/store/instrument-slice'
import { ScaleUtils } from '../../../../../model/scale/scale'

export const KeyEditor = () => {
  const dispatch = useDispatch()
  const selectedTrack = useSelector(selectSelectedTrack)
  const playingKeys = useSelector(selectPlayingTrackKeys)
  const lastKeyDuration = useSelector(selectLastKeyDuration)
  const editorMode = useSelector(selectEditorMode)
  const notePreviewEnabled = useSelector(selectNotePreviewEnabled)
  const scaleViewEnabled = useSelector(selectScaleViewEnabled)
  const selectedScale = useSelector(selectSelectedScale)
  const selectedScaleKeys = ScaleUtils.getScaleKeys(selectedScale)

  const currentTrackPlayingKeys =
    playingKeys.find((item) => item.trackId === selectedTrack?.id)?.keys || []

  const midiRollRef = React.useRef<HTMLDivElement>(null)
  const keyboardRef = React.useRef<HTMLDivElement>(null)

  const handleMidiHorizontalScroll = useMidiEditorHorizontalScroll(midiRollRef)
  const handleMidiVerticalScroll = useMidiEditorVerticalScroll([
    midiRollRef,
    keyboardRef,
  ])

  const midiEditorDimensions = useMidiEditorDimensions()

  if (!selectedTrack) return null

  const showedKeys = KEYS.slice().reverse()

  const handleAddKeyFromBar = (
    bar: Bar,
    key: Key,
    startAtRelativeTick: number
  ) => {
    dispatch(
      addNoteToCurrentBar({
        key,
        barId: bar.id,
        startAtRelativeTick,
        duration: lastKeyDuration,
      })
    )
  }

  const handleAddKeyFromGrid = (key: Key, beat: number) => {
    dispatch(
      addNoteToCurrentTrack({
        key,
        startAtTick: beat,
        duration: lastKeyDuration,
      })
    )
  }

  const previewKey = (key: Key) => {
    if (notePreviewEnabled) {
      dispatch(
        addPlayingKey({
          trackId: selectedTrack.id,
          key,
        })
      )

      setTimeout(() => {
        dispatch(
          removePlayingKey({
            trackId: selectedTrack.id,
            key,
          })
        )
      }, 100)
    }
  }

  return (
    <div className="flex w-full flex-grow bg-zinc-300 dark:bg-zinc-800">
      <div
        ref={keyboardRef}
        onScroll={handleMidiVerticalScroll}
        className="h-full min-w-20 w-20 max-w-20 overflow-auto no-scrollbar"
        style={{ paddingTop: PIANO_ROLL_BAR_HEADER_HEIGHT }}
      >
        <Keyboard
          selectedTrack={selectedTrack}
          showedKeys={showedKeys}
          paddingTop={PIANO_ROLL_BAR_HEADER_HEIGHT}
          playingKeys={currentTrackPlayingKeys}
          whiteKeySize={midiEditorDimensions.whiteKeySize}
          orientation="vertical"
          highlightedKeys={scaleViewEnabled ? selectedScaleKeys : []}
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
            <>
              <MidiEditorKeyGrid
                showedKeys={showedKeys}
                onKeyClick={(key: Key, beat: number) => {
                  if (editorMode === 'draw') {
                    handleAddKeyFromGrid(key, beat)
                    previewKey(key)
                  } else {
                    dispatch(selectNote(null))
                  }
                }}
                cursorStyle={editorMode === 'draw' ? 'add' : 'default'}
                onKeyDoubleClick={(key: Key, beat: number) => {
                  handleAddKeyFromGrid(key, beat)
                  previewKey(key)
                }}
              />
            </>

            {selectedTrack.bars.map((bar: Bar) => (
              <PianoRollBar
                key={bar.id}
                track={selectedTrack}
                showedKeys={showedKeys}
                bar={bar}
                onKeyDoubleClick={(
                  bar: Bar,
                  key: Key,
                  startAtRelativeTick: number
                ) => {
                  handleAddKeyFromBar(bar, key, startAtRelativeTick)
                  previewKey(key)
                  dispatch(selectNote(null))
                }}
                onKeyClick={(
                  bar: Bar,
                  key: Key,
                  startAtRelativeTick: number
                ) => {
                  if (editorMode === 'draw') {
                    handleAddKeyFromBar(bar, key, startAtRelativeTick)
                    previewKey(key)
                  }
                  dispatch(selectNote(null))
                }}
              />
            ))}
          </div>

          <TickPlaceholder />
        </div>
      </div>
    </div>
  )
}
