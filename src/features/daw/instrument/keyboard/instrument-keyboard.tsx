import { KEYS, Octave } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { Keyboard } from '../../common/components/keyboard/keyboard'
import React from 'react'

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
  const showedKeys = getShowedKeys(props.selectedOctave)

  const [keySize, setKeySize] = React.useState(0)

  const handleResize = (keyboardSize: number) => {
    setKeySize(keyboardSize / SHOWED_WHITE_KEYS)
  }

  return (
    <>
      <Keyboard
        selectedTrack={props.selectedTrack}
        showedKeys={showedKeys}
        keySize={keySize}
        onResize={handleResize}
      />
    </>
  )
}
