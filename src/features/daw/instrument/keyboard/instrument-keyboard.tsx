import { useSelector } from 'react-redux'
import { Track } from '../../../../model/track/track'
import { Keyboard } from '../../common/components/keyboard/keyboard'
import React from 'react'
import { selectPlayingKeys } from '../store/selectors'
import { Octave } from '../../../../model/note/key/octave/octave'
import { KEYS } from '../../../../model/note/key/key'
import {
  selectScaleViewEnabled,
  selectSelectedScale,
} from '../../midi-editor/store/selectors'
import { ScaleUtils } from '../../../../model/scale/scale'

export type InstrumentKeyboardProps = {
  selectedTrack: Track
  selectedOctave: Octave
}

const SHOWED_KEYS_NUMBER = 32
const SHOWED_WHITE_KEYS = 19

const getShowedKeys = (selectedOctave: Octave) => {
  const startingKey = KEYS.find((k) =>
    k.endsWith(Number(selectedOctave).toString())
  )
  if (!startingKey) return []
  const startingKeyIndex = KEYS.indexOf(startingKey)
  return KEYS.slice(startingKeyIndex, startingKeyIndex + SHOWED_KEYS_NUMBER)
}

export const InstrumentKeyboard = (props: InstrumentKeyboardProps) => {
  const scaleViewEnabled = useSelector(selectScaleViewEnabled)
  const selectedScale = useSelector(selectSelectedScale)
  const showedKeys = getShowedKeys(props.selectedOctave)
  const playingKeys = useSelector(selectPlayingKeys)

  const selectedScaleKeys = ScaleUtils.getScaleKeys(selectedScale)
  const [keySize, setKeySize] = React.useState(0)

  const handleResize = (keyboardSize: number) => {
    setKeySize(keyboardSize / SHOWED_WHITE_KEYS)
  }

  return (
    <>
      <Keyboard
        selectedTrack={props.selectedTrack}
        showedKeys={showedKeys}
        playingKeys={playingKeys}
        whiteKeySize={keySize}
        minWhiteKeySize={50}
        onResize={handleResize}
        highlightedKeys={scaleViewEnabled ? selectedScaleKeys : []}
      />
    </>
  )
}
